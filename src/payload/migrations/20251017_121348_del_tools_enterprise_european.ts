import { type MigrateUpArgs, type MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "tools" DROP COLUMN "enterprise_european";
  ALTER TABLE "_tools_v" DROP COLUMN "version_enterprise_european";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "tools" ADD COLUMN "enterprise_european" varchar;
  ALTER TABLE "_tools_v" ADD COLUMN "version_enterprise_european" varchar;`)
}
