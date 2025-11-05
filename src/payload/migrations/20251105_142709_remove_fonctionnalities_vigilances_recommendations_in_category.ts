import { type MigrateUpArgs, type MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "categories" DROP COLUMN "fonctionnalities";
  ALTER TABLE "categories" DROP COLUMN "vigilances";
  ALTER TABLE "categories" DROP COLUMN "recommendations";
  ALTER TABLE "_categories_v" DROP COLUMN "version_fonctionnalities";
  ALTER TABLE "_categories_v" DROP COLUMN "version_vigilances";
  ALTER TABLE "_categories_v" DROP COLUMN "version_recommendations";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "categories" ADD COLUMN "fonctionnalities" varchar;
  ALTER TABLE "categories" ADD COLUMN "vigilances" varchar;
  ALTER TABLE "categories" ADD COLUMN "recommendations" varchar;
  ALTER TABLE "_categories_v" ADD COLUMN "version_fonctionnalities" varchar;
  ALTER TABLE "_categories_v" ADD COLUMN "version_vigilances" varchar;
  ALTER TABLE "_categories_v" ADD COLUMN "version_recommendations" varchar;`)
}
