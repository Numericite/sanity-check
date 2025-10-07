import * as migration_20250710_075020 from './20250710_075020';
import * as migration_20250710_093913 from './20250710_093913';
import * as migration_20251007_075524 from './20251007_075524';
import * as migration_20251007_081227 from './20251007_081227';
import * as migration_20251007_083623 from './20251007_083623';

export const migrations = [
  {
    up: migration_20250710_075020.up,
    down: migration_20250710_075020.down,
    name: '20250710_075020',
  },
  {
    up: migration_20250710_093913.up,
    down: migration_20250710_093913.down,
    name: '20250710_093913',
  },
  {
    up: migration_20251007_075524.up,
    down: migration_20251007_075524.down,
    name: '20251007_075524',
  },
  {
    up: migration_20251007_081227.up,
    down: migration_20251007_081227.down,
    name: '20251007_081227',
  },
  {
    up: migration_20251007_083623.up,
    down: migration_20251007_083623.down,
    name: '20251007_083623'
  },
];
