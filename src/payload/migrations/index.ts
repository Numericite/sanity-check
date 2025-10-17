import * as migration_20251015_101812 from './20251015_101812';
import * as migration_20251017_082131 from './20251017_082131';

export const migrations = [
  {
    up: migration_20251015_101812.up,
    down: migration_20251015_101812.down,
    name: '20251015_101812',
  },
  {
    up: migration_20251017_082131.up,
    down: migration_20251017_082131.down,
    name: '20251017_082131'
  },
];
