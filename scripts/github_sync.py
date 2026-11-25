import urllib.request
import urllib.error
import json
import subprocess
import sys

def get_git_token():
    # Use git credential fill to retrieve token for github.com
    try:
        proc = subprocess.Popen(
            ['git', 'credential', 'fill'],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        out, _ = proc.communicate(input="protocol=https\nhost=github.com\n\n")
        creds = {}
        for line in out.splitlines():
            if '=' in line:
                k, v = line.split('=', 1)
                creds[k] = v
        return creds.get('password')
    except Exception as e:
        print("Error getting token:", e)
        return None

def main():
    token = get_git_token()
    if not token:
        print("ERROR: Could not retrieve GitHub token from git credentials")
        sys.exit(1)
    
    headers = {
        "Authorization": f"Bearer {token}",
        "User-Agent": "Kirtsoy-Agent",
        "Accept": "application/vnd.github.v3+json"
    }

    # Verify user
    req = urllib.request.Request("https://api.github.com/user", headers=headers)
    try:
        with urllib.request.urlopen(req) as resp:
            user = json.loads(resp.read().decode())
            print(f"Authenticated as: {user.get('login')} ({user.get('html_url')})")
    except Exception as e:
        print(f"Failed to authenticate: {e}")
        sys.exit(1)

    repo_name = "hoobe-app"
    repo_url = f"https://api.github.com/repos/{user['login']}/{repo_name}"

    # Check if repo exists
    exists = False
    req = urllib.request.Request(repo_url, headers=headers)
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode())
            print(f"Repository already exists: {data.get('html_url')}")
            exists = True
    except urllib.error.HTTPError as e:
        if e.code == 404:
            print("Repository does not exist yet. Creating...")
        else:
            print(f"Error checking repo: {e}")
            sys.exit(1)

    if not exists:
        create_url = "https://api.github.com/user/repos"
        payload = json.dumps({
            "name": repo_name,
            "description": "Hoo.be Luxury Link-in-Bio Clone with 3D WebGL Backgrounds & Admin Panel",
            "private": False,
            "has_issues": True,
            "has_projects": True,
            "has_wiki": False
        }).encode("utf-8")

        req = urllib.request.Request(create_url, data=payload, headers=headers, method="POST")
        try:
            with urllib.request.urlopen(req) as resp:
                created = json.loads(resp.read().decode())
                print(f"Successfully created GitHub repo: {created.get('html_url')}")
        except Exception as e:
            print(f"Failed to create repo: {e}")
            sys.exit(1)

    print("SUCCESS")

if __name__ == "__main__":
    main()
