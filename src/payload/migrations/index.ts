import * as migration_20251015_101812 from './20251015_101812';
import * as migration_20251017_082131 from './20251017_082131';
import * as migration_20251017_121348_del_tools_enterprise_european from './20251017_121348_del_tools_enterprise_european';
import * as migration_20251017_121415_add_tools_enterprise_european from './20251017_121415_add_tools_enterprise_european';
import * as migration_20251023_132714_add_contact_submissions_table from './20251023_132714_add_contact_submissions_table';
import * as migration_20251105_142709_remove_fonctionnalities_vigilances_recommendations_in_category from './20251105_142709_remove_fonctionnalities_vigilances_recommendations_in_category';
import * as migration_20251105_142734_add_fonctionnalities_vigilances_recommendations_in_category from './20251105_142734_add_fonctionnalities_vigilances_recommendations_in_category';
import * as migration_20251105_160408_add_category_slug from './20251105_160408_add_category_slug';
import * as migration_20251114_101722_add_locations_data_in_tool from './20251114_101722_add_locations_data_in_tool';
import * as migration_20251114_104709_remove_location_host_client_final_users from './20251114_104709_remove_location_host_client_final_users';

export const migrations = [
  {
    up: migration_20251015_101812.up,
    down: migration_20251015_101812.down,
    name: '20251015_101812',
  },
  {
    up: migration_20251017_082131.up,
    down: migration_20251017_082131.down,
    name: '20251017_082131',
  },
  {
    up: migration_20251017_121348_del_tools_enterprise_european.up,
    down: migration_20251017_121348_del_tools_enterprise_european.down,
    name: '20251017_121348_del_tools_enterprise_european',
  },
  {
    up: migration_20251017_121415_add_tools_enterprise_european.up,
    down: migration_20251017_121415_add_tools_enterprise_european.down,
    name: '20251017_121415_add_tools_enterprise_european',
  },
  {
    up: migration_20251023_132714_add_contact_submissions_table.up,
    down: migration_20251023_132714_add_contact_submissions_table.down,
    name: '20251023_132714_add_contact_submissions_table',
  },
  {
    up: migration_20251105_142709_remove_fonctionnalities_vigilances_recommendations_in_category.up,
    down: migration_20251105_142709_remove_fonctionnalities_vigilances_recommendations_in_category.down,
    name: '20251105_142709_remove_fonctionnalities_vigilances_recommendations_in_category',
  },
  {
    up: migration_20251105_142734_add_fonctionnalities_vigilances_recommendations_in_category.up,
    down: migration_20251105_142734_add_fonctionnalities_vigilances_recommendations_in_category.down,
    name: '20251105_142734_add_fonctionnalities_vigilances_recommendations_in_category',
  },
  {
    up: migration_20251105_160408_add_category_slug.up,
    down: migration_20251105_160408_add_category_slug.down,
    name: '20251105_160408_add_category_slug',
  },
  {
    up: migration_20251114_101722_add_locations_data_in_tool.up,
    down: migration_20251114_101722_add_locations_data_in_tool.down,
    name: '20251114_101722_add_locations_data_in_tool',
  },
  {
    up: migration_20251114_104709_remove_location_host_client_final_users.up,
    down: migration_20251114_104709_remove_location_host_client_final_users.down,
    name: '20251114_104709_remove_location_host_client_final_users'
  },
];
