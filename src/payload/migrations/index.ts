import * as migration_20251015_101812 from "./20251015_101812";
import * as migration_20251017_082131 from "./20251017_082131";
import * as migration_20251017_121348_del_tools_enterprise_european from "./20251017_121348_del_tools_enterprise_european";
import * as migration_20251017_121415_add_tools_enterprise_european from "./20251017_121415_add_tools_enterprise_european";
import * as migration_20251023_132714_add_contact_submissions_table from "./20251023_132714_add_contact_submissions_table";
import * as migration_20251103_135837_add_column_category_temp_en_savoir_plus from "./20251103_135837_add_column_category_temp_en_savoir_plus";
import * as migration_20251103_140323_rename_column_category_temp_en_savoir_plus from "./20251103_140323_rename_column_category_temp_en_savoir_plus";

export const migrations = [
	{
		up: migration_20251015_101812.up,
		down: migration_20251015_101812.down,
		name: "20251015_101812",
	},
	{
		up: migration_20251017_082131.up,
		down: migration_20251017_082131.down,
		name: "20251017_082131",
	},
	{
		up: migration_20251017_121348_del_tools_enterprise_european.up,
		down: migration_20251017_121348_del_tools_enterprise_european.down,
		name: "20251017_121348_del_tools_enterprise_european",
	},
	{
		up: migration_20251017_121415_add_tools_enterprise_european.up,
		down: migration_20251017_121415_add_tools_enterprise_european.down,
		name: "20251017_121415_add_tools_enterprise_european",
	},
	{
		up: migration_20251023_132714_add_contact_submissions_table.up,
		down: migration_20251023_132714_add_contact_submissions_table.down,
		name: "20251023_132714_add_contact_submissions_table",
	},
	{
		up: migration_20251103_135837_add_column_category_temp_en_savoir_plus.up,
		down: migration_20251103_135837_add_column_category_temp_en_savoir_plus.down,
		name: "20251103_135837_add_column_category_temp_en_savoir_plus",
	},
	{
		up: migration_20251103_140323_rename_column_category_temp_en_savoir_plus.up,
		down: migration_20251103_140323_rename_column_category_temp_en_savoir_plus.down,
		name: "20251103_140323_rename_column_category_temp_en_savoir_plus",
	},
];
