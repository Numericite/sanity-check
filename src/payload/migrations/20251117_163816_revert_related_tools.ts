import { type MigrateUpArgs, type MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "certifications_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tools_id" integer
  );
  
  CREATE TABLE "_certifications_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tools_id" integer
  );
  
  CREATE TABLE "accessors_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tools_id" integer
  );
  
  CREATE TABLE "_accessors_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tools_id" integer
  );
  
  CREATE TABLE "locations_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tools_id" integer
  );
  
  CREATE TABLE "_locations_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tools_id" integer
  );
  
  CREATE TABLE "transfers_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tools_id" integer
  );
  
  CREATE TABLE "_transfers_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tools_id" integer
  );
  
  CREATE TABLE "features_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tools_id" integer
  );
  
  CREATE TABLE "_features_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tools_id" integer
  );
  
  ALTER TABLE "certifications_rels" ADD CONSTRAINT "certifications_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."certifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "certifications_rels" ADD CONSTRAINT "certifications_rels_tools_fk" FOREIGN KEY ("tools_id") REFERENCES "public"."tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_certifications_v_rels" ADD CONSTRAINT "_certifications_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_certifications_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_certifications_v_rels" ADD CONSTRAINT "_certifications_v_rels_tools_fk" FOREIGN KEY ("tools_id") REFERENCES "public"."tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accessors_rels" ADD CONSTRAINT "accessors_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."accessors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accessors_rels" ADD CONSTRAINT "accessors_rels_tools_fk" FOREIGN KEY ("tools_id") REFERENCES "public"."tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_accessors_v_rels" ADD CONSTRAINT "_accessors_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_accessors_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_accessors_v_rels" ADD CONSTRAINT "_accessors_v_rels_tools_fk" FOREIGN KEY ("tools_id") REFERENCES "public"."tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_rels" ADD CONSTRAINT "locations_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_rels" ADD CONSTRAINT "locations_rels_tools_fk" FOREIGN KEY ("tools_id") REFERENCES "public"."tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_locations_v_rels" ADD CONSTRAINT "_locations_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_locations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_locations_v_rels" ADD CONSTRAINT "_locations_v_rels_tools_fk" FOREIGN KEY ("tools_id") REFERENCES "public"."tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "transfers_rels" ADD CONSTRAINT "transfers_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."transfers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "transfers_rels" ADD CONSTRAINT "transfers_rels_tools_fk" FOREIGN KEY ("tools_id") REFERENCES "public"."tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_transfers_v_rels" ADD CONSTRAINT "_transfers_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_transfers_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_transfers_v_rels" ADD CONSTRAINT "_transfers_v_rels_tools_fk" FOREIGN KEY ("tools_id") REFERENCES "public"."tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "features_rels" ADD CONSTRAINT "features_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "features_rels" ADD CONSTRAINT "features_rels_tools_fk" FOREIGN KEY ("tools_id") REFERENCES "public"."tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_features_v_rels" ADD CONSTRAINT "_features_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_features_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_features_v_rels" ADD CONSTRAINT "_features_v_rels_tools_fk" FOREIGN KEY ("tools_id") REFERENCES "public"."tools"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "certifications_rels_order_idx" ON "certifications_rels" USING btree ("order");
  CREATE INDEX "certifications_rels_parent_idx" ON "certifications_rels" USING btree ("parent_id");
  CREATE INDEX "certifications_rels_path_idx" ON "certifications_rels" USING btree ("path");
  CREATE INDEX "certifications_rels_tools_id_idx" ON "certifications_rels" USING btree ("tools_id");
  CREATE INDEX "_certifications_v_rels_order_idx" ON "_certifications_v_rels" USING btree ("order");
  CREATE INDEX "_certifications_v_rels_parent_idx" ON "_certifications_v_rels" USING btree ("parent_id");
  CREATE INDEX "_certifications_v_rels_path_idx" ON "_certifications_v_rels" USING btree ("path");
  CREATE INDEX "_certifications_v_rels_tools_id_idx" ON "_certifications_v_rels" USING btree ("tools_id");
  CREATE INDEX "accessors_rels_order_idx" ON "accessors_rels" USING btree ("order");
  CREATE INDEX "accessors_rels_parent_idx" ON "accessors_rels" USING btree ("parent_id");
  CREATE INDEX "accessors_rels_path_idx" ON "accessors_rels" USING btree ("path");
  CREATE INDEX "accessors_rels_tools_id_idx" ON "accessors_rels" USING btree ("tools_id");
  CREATE INDEX "_accessors_v_rels_order_idx" ON "_accessors_v_rels" USING btree ("order");
  CREATE INDEX "_accessors_v_rels_parent_idx" ON "_accessors_v_rels" USING btree ("parent_id");
  CREATE INDEX "_accessors_v_rels_path_idx" ON "_accessors_v_rels" USING btree ("path");
  CREATE INDEX "_accessors_v_rels_tools_id_idx" ON "_accessors_v_rels" USING btree ("tools_id");
  CREATE INDEX "locations_rels_order_idx" ON "locations_rels" USING btree ("order");
  CREATE INDEX "locations_rels_parent_idx" ON "locations_rels" USING btree ("parent_id");
  CREATE INDEX "locations_rels_path_idx" ON "locations_rels" USING btree ("path");
  CREATE INDEX "locations_rels_tools_id_idx" ON "locations_rels" USING btree ("tools_id");
  CREATE INDEX "_locations_v_rels_order_idx" ON "_locations_v_rels" USING btree ("order");
  CREATE INDEX "_locations_v_rels_parent_idx" ON "_locations_v_rels" USING btree ("parent_id");
  CREATE INDEX "_locations_v_rels_path_idx" ON "_locations_v_rels" USING btree ("path");
  CREATE INDEX "_locations_v_rels_tools_id_idx" ON "_locations_v_rels" USING btree ("tools_id");
  CREATE INDEX "transfers_rels_order_idx" ON "transfers_rels" USING btree ("order");
  CREATE INDEX "transfers_rels_parent_idx" ON "transfers_rels" USING btree ("parent_id");
  CREATE INDEX "transfers_rels_path_idx" ON "transfers_rels" USING btree ("path");
  CREATE INDEX "transfers_rels_tools_id_idx" ON "transfers_rels" USING btree ("tools_id");
  CREATE INDEX "_transfers_v_rels_order_idx" ON "_transfers_v_rels" USING btree ("order");
  CREATE INDEX "_transfers_v_rels_parent_idx" ON "_transfers_v_rels" USING btree ("parent_id");
  CREATE INDEX "_transfers_v_rels_path_idx" ON "_transfers_v_rels" USING btree ("path");
  CREATE INDEX "_transfers_v_rels_tools_id_idx" ON "_transfers_v_rels" USING btree ("tools_id");
  CREATE INDEX "features_rels_order_idx" ON "features_rels" USING btree ("order");
  CREATE INDEX "features_rels_parent_idx" ON "features_rels" USING btree ("parent_id");
  CREATE INDEX "features_rels_path_idx" ON "features_rels" USING btree ("path");
  CREATE INDEX "features_rels_tools_id_idx" ON "features_rels" USING btree ("tools_id");
  CREATE INDEX "_features_v_rels_order_idx" ON "_features_v_rels" USING btree ("order");
  CREATE INDEX "_features_v_rels_parent_idx" ON "_features_v_rels" USING btree ("parent_id");
  CREATE INDEX "_features_v_rels_path_idx" ON "_features_v_rels" USING btree ("path");
  CREATE INDEX "_features_v_rels_tools_id_idx" ON "_features_v_rels" USING btree ("tools_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "certifications_rels" CASCADE;
  DROP TABLE "_certifications_v_rels" CASCADE;
  DROP TABLE "accessors_rels" CASCADE;
  DROP TABLE "_accessors_v_rels" CASCADE;
  DROP TABLE "locations_rels" CASCADE;
  DROP TABLE "_locations_v_rels" CASCADE;
  DROP TABLE "transfers_rels" CASCADE;
  DROP TABLE "_transfers_v_rels" CASCADE;
  DROP TABLE "features_rels" CASCADE;
  DROP TABLE "_features_v_rels" CASCADE;`)
}
