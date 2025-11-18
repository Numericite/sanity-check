import { type MigrateUpArgs, type MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "tools_locations_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"location_id" integer NOT NULL
  );
  
  CREATE TABLE "_tools_v_version_locations_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"location_id" integer NOT NULL,
  	"_uuid" varchar
  );
  
  ALTER TABLE "categories" ALTER COLUMN "fonctionnalities" SET DATA TYPE jsonb;
  ALTER TABLE "categories" ALTER COLUMN "vigilances" SET DATA TYPE jsonb;
  ALTER TABLE "categories" ALTER COLUMN "recommendations" SET DATA TYPE jsonb;
  ALTER TABLE "_categories_v" ALTER COLUMN "version_fonctionnalities" SET DATA TYPE jsonb;
  ALTER TABLE "_categories_v" ALTER COLUMN "version_vigilances" SET DATA TYPE jsonb;
  ALTER TABLE "_categories_v" ALTER COLUMN "version_recommendations" SET DATA TYPE jsonb;
  ALTER TABLE "tools_locations_data" ADD CONSTRAINT "tools_locations_data_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tools_locations_data" ADD CONSTRAINT "tools_locations_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tools_v_version_locations_data" ADD CONSTRAINT "_tools_v_version_locations_data_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_tools_v_version_locations_data" ADD CONSTRAINT "_tools_v_version_locations_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tools_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "tools_locations_data_order_idx" ON "tools_locations_data" USING btree ("_order");
  CREATE INDEX "tools_locations_data_parent_id_idx" ON "tools_locations_data" USING btree ("_parent_id");
  CREATE INDEX "tools_locations_data_location_idx" ON "tools_locations_data" USING btree ("location_id");
  CREATE INDEX "_tools_v_version_locations_data_order_idx" ON "_tools_v_version_locations_data" USING btree ("_order");
  CREATE INDEX "_tools_v_version_locations_data_parent_id_idx" ON "_tools_v_version_locations_data" USING btree ("_parent_id");
  CREATE INDEX "_tools_v_version_locations_data_location_idx" ON "_tools_v_version_locations_data" USING btree ("location_id");
  CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "_categories_v_version_version_slug_idx" ON "_categories_v" USING btree ("version_slug");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "tools_locations_data" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tools_v_version_locations_data" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "tools_locations_data" CASCADE;
  DROP TABLE "_tools_v_version_locations_data" CASCADE;
  DROP INDEX "categories_slug_idx";
  DROP INDEX "_categories_v_version_version_slug_idx";
  ALTER TABLE "categories" ALTER COLUMN "fonctionnalities" SET DATA TYPE varchar;
  ALTER TABLE "categories" ALTER COLUMN "vigilances" SET DATA TYPE varchar;
  ALTER TABLE "categories" ALTER COLUMN "recommendations" SET DATA TYPE varchar;
  ALTER TABLE "_categories_v" ALTER COLUMN "version_fonctionnalities" SET DATA TYPE varchar;
  ALTER TABLE "_categories_v" ALTER COLUMN "version_vigilances" SET DATA TYPE varchar;
  ALTER TABLE "_categories_v" ALTER COLUMN "version_recommendations" SET DATA TYPE varchar;`)
}
