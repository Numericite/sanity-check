import { type MigrateUpArgs, type MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_contact_submissions_state" AS ENUM('pending', 'in_progress', 'processed', 'rejected');
  CREATE TYPE "public"."enum__contact_submissions_v_version_state" AS ENUM('pending', 'in_progress', 'processed', 'rejected');
  CREATE TABLE "contact_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"state" "enum_contact_submissions_state" DEFAULT 'pending',
  	"category_id" integer NOT NULL,
  	"name" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"comment" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_contact_submissions_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_state" "enum__contact_submissions_v_version_state" DEFAULT 'pending',
  	"version_category_id" integer NOT NULL,
  	"version_name" varchar NOT NULL,
  	"version_url" varchar NOT NULL,
  	"version_comment" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "contact_submissions_id" integer;
  ALTER TABLE "contact_submissions" ADD CONSTRAINT "contact_submissions_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_contact_submissions_v" ADD CONSTRAINT "_contact_submissions_v_parent_id_contact_submissions_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."contact_submissions"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_contact_submissions_v" ADD CONSTRAINT "_contact_submissions_v_version_category_id_categories_id_fk" FOREIGN KEY ("version_category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "contact_submissions_category_idx" ON "contact_submissions" USING btree ("category_id");
  CREATE INDEX "contact_submissions_updated_at_idx" ON "contact_submissions" USING btree ("updated_at");
  CREATE INDEX "contact_submissions_created_at_idx" ON "contact_submissions" USING btree ("created_at");
  CREATE INDEX "_contact_submissions_v_parent_idx" ON "_contact_submissions_v" USING btree ("parent_id");
  CREATE INDEX "_contact_submissions_v_version_version_category_idx" ON "_contact_submissions_v" USING btree ("version_category_id");
  CREATE INDEX "_contact_submissions_v_version_version_updated_at_idx" ON "_contact_submissions_v" USING btree ("version_updated_at");
  CREATE INDEX "_contact_submissions_v_version_version_created_at_idx" ON "_contact_submissions_v" USING btree ("version_created_at");
  CREATE INDEX "_contact_submissions_v_created_at_idx" ON "_contact_submissions_v" USING btree ("created_at");
  CREATE INDEX "_contact_submissions_v_updated_at_idx" ON "_contact_submissions_v" USING btree ("updated_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_contact_submissions_fk" FOREIGN KEY ("contact_submissions_id") REFERENCES "public"."contact_submissions"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_contact_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("contact_submissions_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "contact_submissions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contact_submissions_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "contact_submissions" CASCADE;
  DROP TABLE "_contact_submissions_v" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_contact_submissions_fk";
  
  DROP INDEX "payload_locked_documents_rels_contact_submissions_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "contact_submissions_id";
  DROP TYPE "public"."enum_contact_submissions_state";
  DROP TYPE "public"."enum__contact_submissions_v_version_state";`)
}
