import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const filePath = path.join(process.cwd(), 'src', 'data', 'myProfile.ts');

    const fileContent = `import { ProfileData } from '@/types/profile';

export const myProfile: ProfileData = ${JSON.stringify(data, null, 2)};
`;

    fs.writeFileSync(filePath, fileContent, 'utf-8');
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Save error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
