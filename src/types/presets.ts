import { ProfileData } from './profile';

export interface ProfilePreset {
  id: string;
  name: string;
  description: string;
  badge?: string;
  isSystem?: boolean;
  createdAt: string;
  profile: ProfileData;
}
