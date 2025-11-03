import { type MigrateUpArgs, type MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "categories" RENAME COLUMN "fonctionnalities_temp" TO "fonctionnalities";
  ALTER TABLE "categories" RENAME COLUMN "vigilances_temp" TO "vigilances";
  ALTER TABLE "categories" RENAME COLUMN "recommendations_temp" TO "recommendations";
  ALTER TABLE "_categories_v" RENAME COLUMN "version_fonctionnalities_temp" TO "version_fonctionnalities";
  ALTER TABLE "_categories_v" RENAME COLUMN "version_vigilances_temp" TO "version_vigilances";
  ALTER TABLE "_categories_v" RENAME COLUMN "version_recommendations_temp" TO "version_recommendations";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "categories" RENAME COLUMN "fonctionnalities" TO "fonctionnalities_temp";
  ALTER TABLE "categories" RENAME COLUMN "vigilances" TO "vigilances_temp";
  ALTER TABLE "categories" RENAME COLUMN "recommendations" TO "recommendations_temp";
  ALTER TABLE "_categories_v" RENAME COLUMN "version_fonctionnalities" TO "version_fonctionnalities_temp";
  ALTER TABLE "_categories_v" RENAME COLUMN "version_vigilances" TO "version_vigilances_temp";
  ALTER TABLE "_categories_v" RENAME COLUMN "version_recommendations" TO "version_recommendations_temp";`)
}
