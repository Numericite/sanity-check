import { type MigrateUpArgs, type MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_lines_items_type" AS ENUM('link', 'richtext', 'locations', 'boolean', 'choice', 'badges', 'categories', 'privacy_score');
  CREATE TYPE "public"."enum__lines_v_version_items_type" AS ENUM('link', 'richtext', 'locations', 'boolean', 'choice', 'badges', 'categories', 'privacy_score');
  CREATE TABLE "lines_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"active" boolean,
  	"type" "enum_lines_items_type" NOT NULL
  );
  
  CREATE TABLE "lines" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_lines_v_version_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"active" boolean,
  	"type" "enum__lines_v_version_items_type" NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_lines_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "lines_items" ADD CONSTRAINT "lines_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_lines_v_version_items" ADD CONSTRAINT "_lines_v_version_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_lines_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "lines_items_order_idx" ON "lines_items" USING btree ("_order");
  CREATE INDEX "lines_items_parent_id_idx" ON "lines_items" USING btree ("_parent_id");
  CREATE INDEX "_lines_v_version_items_order_idx" ON "_lines_v_version_items" USING btree ("_order");
  CREATE INDEX "_lines_v_version_items_parent_id_idx" ON "_lines_v_version_items" USING btree ("_parent_id");
  CREATE INDEX "_lines_v_created_at_idx" ON "_lines_v" USING btree ("created_at");
  CREATE INDEX "_lines_v_updated_at_idx" ON "_lines_v" USING btree ("updated_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "lines_items" CASCADE;
  DROP TABLE "lines" CASCADE;
  DROP TABLE "_lines_v_version_items" CASCADE;
  DROP TABLE "_lines_v" CASCADE;
  DROP TYPE "public"."enum_lines_items_type";
  DROP TYPE "public"."enum__lines_v_version_items_type";`)
}
