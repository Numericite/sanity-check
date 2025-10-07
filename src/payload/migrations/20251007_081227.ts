import { type MigrateUpArgs, type MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "tools" ALTER COLUMN "category_id" DROP NOT NULL;
  ALTER TABLE "_tools_v" ALTER COLUMN "version_category_id" DROP NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "tools" ALTER COLUMN "category_id" SET NOT NULL;
  ALTER TABLE "_tools_v" ALTER COLUMN "version_category_id" SET NOT NULL;`)
}
