import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "_tools_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar NOT NULL,
  	"version_site_link" varchar NOT NULL,
  	"version_image_link_id" integer,
  	"version_description" varchar,
  	"version_enterprise_certifications" varchar,
  	"version_data_access" varchar,
  	"version_subcontractors" varchar,
  	"version_transfer_out_eu" varchar,
  	"version_privacy_score_saas" varchar,
  	"version_privacy_score_self_hosted" varchar,
  	"version_tool_kind" varchar,
  	"version_location_host_client" varchar,
  	"version_online_accessible_dpa" varchar,
  	"version_subcontractors_infra" varchar,
  	"version_certification_dpf" boolean,
  	"version_opensource" varchar,
  	"version_self_host_possibility" varchar,
  	"version_fr_documentation" varchar,
  	"version_dpa_compliant" varchar,
  	"version_subkind" varchar,
  	"version_rgpd_feature" varchar,
  	"version_transfer_supervision" varchar,
  	"version_enterprise_location" varchar,
  	"version_dpa_link" varchar,
  	"version_subcontractors_certifications" varchar,
  	"version_enterprise_european" varchar,
  	"version_final_users_location" varchar,
  	"version_actions" jsonb,
  	"version_location_note" jsonb,
  	"version_transfer_informations" varchar,
  	"version_dpa_file_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "tools" ALTER COLUMN "image_link_id" DROP NOT NULL;
  ALTER TABLE "_tools_v" ADD CONSTRAINT "_tools_v_parent_id_tools_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."tools"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_tools_v" ADD CONSTRAINT "_tools_v_version_image_link_id_media_id_fk" FOREIGN KEY ("version_image_link_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_tools_v" ADD CONSTRAINT "_tools_v_version_dpa_file_id_media_id_fk" FOREIGN KEY ("version_dpa_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "_tools_v_parent_idx" ON "_tools_v" USING btree ("parent_id");
  CREATE INDEX "_tools_v_version_version_image_link_idx" ON "_tools_v" USING btree ("version_image_link_id");
  CREATE INDEX "_tools_v_version_version_dpa_file_idx" ON "_tools_v" USING btree ("version_dpa_file_id");
  CREATE INDEX "_tools_v_version_version_updated_at_idx" ON "_tools_v" USING btree ("version_updated_at");
  CREATE INDEX "_tools_v_version_version_created_at_idx" ON "_tools_v" USING btree ("version_created_at");
  CREATE INDEX "_tools_v_created_at_idx" ON "_tools_v" USING btree ("created_at");
  CREATE INDEX "_tools_v_updated_at_idx" ON "_tools_v" USING btree ("updated_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "_tools_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "_tools_v" CASCADE;
  ALTER TABLE "tools" ALTER COLUMN "image_link_id" SET NOT NULL;`)
}
