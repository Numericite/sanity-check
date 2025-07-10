import * as migration_20250710_075020 from './20250710_075020';

export const migrations = [
  {
    up: migration_20250710_075020.up,
    down: migration_20250710_075020.down,
    name: '20250710_075020'
  },
];
