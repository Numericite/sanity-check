import { type MigrateUpArgs, type MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "tools_locations_host_client" CASCADE;
  DROP TABLE "tools_locations_final_users" CASCADE;
  DROP TABLE "_tools_v_version_locations_host_client" CASCADE;
  DROP TABLE "_tools_v_version_locations_final_users" CASCADE;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "tools_locations_host_client" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"location_id" integer NOT NULL
  );
  
  CREATE TABLE "tools_locations_final_users" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"location_id" integer NOT NULL
  );
  
  CREATE TABLE "_tools_v_version_locations_host_client" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"location_id" integer NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tools_v_version_locations_final_users" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"location_id" integer NOT NULL,
  	"_uuid" varchar
  );
  
  ALTER TABLE "tools_locations_host_client" ADD CONSTRAINT "tools_locations_host_client_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tools_locations_host_client" ADD CONSTRAINT "tools_locations_host_client_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tools_locations_final_users" ADD CONSTRAINT "tools_locations_final_users_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tools_locations_final_users" ADD CONSTRAINT "tools_locations_final_users_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tools_v_version_locations_host_client" ADD CONSTRAINT "_tools_v_version_locations_host_client_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_tools_v_version_locations_host_client" ADD CONSTRAINT "_tools_v_version_locations_host_client_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tools_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tools_v_version_locations_final_users" ADD CONSTRAINT "_tools_v_version_locations_final_users_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_tools_v_version_locations_final_users" ADD CONSTRAINT "_tools_v_version_locations_final_users_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tools_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "tools_locations_host_client_order_idx" ON "tools_locations_host_client" USING btree ("_order");
  CREATE INDEX "tools_locations_host_client_parent_id_idx" ON "tools_locations_host_client" USING btree ("_parent_id");
  CREATE INDEX "tools_locations_host_client_location_idx" ON "tools_locations_host_client" USING btree ("location_id");
  CREATE INDEX "tools_locations_final_users_order_idx" ON "tools_locations_final_users" USING btree ("_order");
  CREATE INDEX "tools_locations_final_users_parent_id_idx" ON "tools_locations_final_users" USING btree ("_parent_id");
  CREATE INDEX "tools_locations_final_users_location_idx" ON "tools_locations_final_users" USING btree ("location_id");
  CREATE INDEX "_tools_v_version_locations_host_client_order_idx" ON "_tools_v_version_locations_host_client" USING btree ("_order");
  CREATE INDEX "_tools_v_version_locations_host_client_parent_id_idx" ON "_tools_v_version_locations_host_client" USING btree ("_parent_id");
  CREATE INDEX "_tools_v_version_locations_host_client_location_idx" ON "_tools_v_version_locations_host_client" USING btree ("location_id");
  CREATE INDEX "_tools_v_version_locations_final_users_order_idx" ON "_tools_v_version_locations_final_users" USING btree ("_order");
  CREATE INDEX "_tools_v_version_locations_final_users_parent_id_idx" ON "_tools_v_version_locations_final_users" USING btree ("_parent_id");
  CREATE INDEX "_tools_v_version_locations_final_users_location_idx" ON "_tools_v_version_locations_final_users" USING btree ("location_id");`)
}
