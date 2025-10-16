import * as migration_20251015_101812 from "./20251015_101812";

export const migrations = [
	{
		up: migration_20251015_101812.up,
		down: migration_20251015_101812.down,
		name: "20251015_101812",
	},
];
