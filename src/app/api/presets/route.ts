import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { ProfilePreset } from '@/types/presets';

const presetsFilePath = path.join(process.cwd(), 'src', 'data', 'presets.json');

function readPresets(): ProfilePreset[] {
  try {
    if (!fs.existsSync(presetsFilePath)) {
      return [];
    }
    const raw = fs.readFileSync(presetsFilePath, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    console.error('Error reading presets:', error);
    return [];
  }
}

function writePresets(presets: ProfilePreset[]) {
  fs.writeFileSync(presetsFilePath, JSON.stringify(presets, null, 2), 'utf-8');
}

export async function GET() {
  try {
    const presets = readPresets();
    return NextResponse.json({ success: true, presets });
  } catch (error: any) {
    console.error('GET /api/presets error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body;
    let presets = readPresets();

    if (action === 'save') {
      const { id, name, description, profile, badge } = body;
      if (!name || !profile) {
        return NextResponse.json({ error: 'Name and profile are required' }, { status: 400 });
      }

      const presetId = id || `preset_${Date.now()}`;
      const existingIdx = presets.findIndex(p => p.id === presetId);

      const newPreset: ProfilePreset = {
        id: presetId,
        name: name.trim(),
        description: description?.trim() || `Пользовательский пресет от ${new Date().toLocaleDateString('ru-RU')}`,
        badge: badge || 'CUSTOM',
        isSystem: false,
        createdAt: new Date().toISOString(),
        profile,
      };

      if (existingIdx >= 0) {
        presets[existingIdx] = {
          ...presets[existingIdx],
          ...newPreset,
          isSystem: presets[existingIdx].isSystem ?? false,
        };
      } else {
        presets.push(newPreset);
      }

      writePresets(presets);
      return NextResponse.json({ success: true, preset: newPreset, presets });
    }

    if (action === 'delete') {
      const { id } = body;
      if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
      }

      const target = presets.find(p => p.id === id);
      if (target?.isSystem) {
        return NextResponse.json({ error: 'Нельзя удалить системный базовый пресет' }, { status: 400 });
      }

      presets = presets.filter(p => p.id !== id);
      writePresets(presets);
      return NextResponse.json({ success: true, presets });
    }

    if (action === 'import') {
      const incoming = body.presets;
      if (!Array.isArray(incoming)) {
        return NextResponse.json({ error: 'Invalid presets array' }, { status: 400 });
      }

      // Merge incoming presets avoiding ID collisions
      const existingIds = new Set(presets.map(p => p.id));
      for (const p of incoming) {
        if (!p.id || existingIds.has(p.id)) {
          p.id = `preset_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
        }
        presets.push(p);
        existingIds.add(p.id);
      }

      writePresets(presets);
      return NextResponse.json({ success: true, presets });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error: any) {
    console.error('POST /api/presets error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
