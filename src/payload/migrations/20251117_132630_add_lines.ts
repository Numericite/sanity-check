import { type MigrateUpArgs, type MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "lines" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"slug" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"active" boolean,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_lines_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version__order" varchar,
  	"version_slug" varchar NOT NULL,
  	"version_name" varchar NOT NULL,
  	"version_active" boolean,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "categories" ALTER COLUMN "fonctionnalities" SET DATA TYPE jsonb;
  ALTER TABLE "categories" ALTER COLUMN "vigilances" SET DATA TYPE jsonb;
  ALTER TABLE "categories" ALTER COLUMN "recommendations" SET DATA TYPE jsonb;
  ALTER TABLE "_categories_v" ALTER COLUMN "version_fonctionnalities" SET DATA TYPE jsonb;
  ALTER TABLE "_categories_v" ALTER COLUMN "version_vigilances" SET DATA TYPE jsonb;
  ALTER TABLE "_categories_v" ALTER COLUMN "version_recommendations" SET DATA TYPE jsonb;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "lines_id" integer;
  ALTER TABLE "_lines_v" ADD CONSTRAINT "_lines_v_parent_id_lines_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."lines"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "lines__order_idx" ON "lines" USING btree ("_order");
  CREATE INDEX "lines_updated_at_idx" ON "lines" USING btree ("updated_at");
  CREATE INDEX "lines_created_at_idx" ON "lines" USING btree ("created_at");
  CREATE INDEX "_lines_v_parent_idx" ON "_lines_v" USING btree ("parent_id");
  CREATE INDEX "_lines_v_version_version__order_idx" ON "_lines_v" USING btree ("version__order");
  CREATE INDEX "_lines_v_version_version_updated_at_idx" ON "_lines_v" USING btree ("version_updated_at");
  CREATE INDEX "_lines_v_version_version_created_at_idx" ON "_lines_v" USING btree ("version_created_at");
  CREATE INDEX "_lines_v_created_at_idx" ON "_lines_v" USING btree ("created_at");
  CREATE INDEX "_lines_v_updated_at_idx" ON "_lines_v" USING btree ("updated_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_lines_fk" FOREIGN KEY ("lines_id") REFERENCES "public"."lines"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "_categories_v_version_version_slug_idx" ON "_categories_v" USING btree ("version_slug");
  CREATE INDEX "payload_locked_documents_rels_lines_id_idx" ON "payload_locked_documents_rels" USING btree ("lines_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "lines" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_lines_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "lines" CASCADE;
  DROP TABLE "_lines_v" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_lines_fk";
  
  DROP INDEX "categories_slug_idx";
  DROP INDEX "_categories_v_version_version_slug_idx";
  DROP INDEX "payload_locked_documents_rels_lines_id_idx";
  ALTER TABLE "categories" ALTER COLUMN "fonctionnalities" SET DATA TYPE varchar;
  ALTER TABLE "categories" ALTER COLUMN "vigilances" SET DATA TYPE varchar;
  ALTER TABLE "categories" ALTER COLUMN "recommendations" SET DATA TYPE varchar;
  ALTER TABLE "_categories_v" ALTER COLUMN "version_fonctionnalities" SET DATA TYPE varchar;
  ALTER TABLE "_categories_v" ALTER COLUMN "version_vigilances" SET DATA TYPE varchar;
  ALTER TABLE "_categories_v" ALTER COLUMN "version_recommendations" SET DATA TYPE varchar;
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "lines_id";`)
}
