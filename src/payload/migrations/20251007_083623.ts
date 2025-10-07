import { type MigrateUpArgs, type MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "categories" RENAME COLUMN "vigilance" TO "vigilances";
  ALTER TABLE "_categories_v" RENAME COLUMN "version_vigilance" TO "version_vigilances";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "categories" RENAME COLUMN "vigilances" TO "vigilance";
  ALTER TABLE "_categories_v" RENAME COLUMN "version_vigilances" TO "version_vigilance";`)
}
