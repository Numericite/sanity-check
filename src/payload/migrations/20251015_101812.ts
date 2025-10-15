import { type MigrateUpArgs, type MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_tools_transfer_out_eu" AS ENUM('Oui', 'Non', 'Au choix');
  CREATE TYPE "public"."enum_tools_privacy_score_saas" AS ENUM('A', 'B', 'C', 'D', 'E', 'F');
  CREATE TYPE "public"."enum_tools_privacy_score_self_hosted" AS ENUM('A', 'B', 'C', 'D', 'E', 'F');
  CREATE TYPE "public"."enum__tools_v_version_transfer_out_eu" AS ENUM('Oui', 'Non', 'Au choix');
  CREATE TYPE "public"."enum__tools_v_version_privacy_score_saas" AS ENUM('A', 'B', 'C', 'D', 'E', 'F');
  CREATE TYPE "public"."enum__tools_v_version_privacy_score_self_hosted" AS ENUM('A', 'B', 'C', 'D', 'E', 'F');
  CREATE TABLE "tools_subcontractors_infra" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE "tools_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"category_id" integer NOT NULL,
  	"main" boolean DEFAULT false
  );
  
  CREATE TABLE "tools_certifications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"certification_id" integer NOT NULL
  );
  
  CREATE TABLE "tools_certifications_subcontractors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"certification_id" integer NOT NULL
  );
  
  CREATE TABLE "tools_accessors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"accessor_id" integer NOT NULL
  );
  
  CREATE TABLE "tools_locations_enterprise" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"location_id" integer NOT NULL
  );
  
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
  
  CREATE TABLE "tools_transfers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"transfer_id" integer NOT NULL
  );
  
  CREATE TABLE "tools_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature_id" integer NOT NULL
  );
  
  CREATE TABLE "tools" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"site_link" varchar NOT NULL,
  	"logo_id" integer,
  	"description" varchar,
  	"subcontractors" varchar,
  	"transfer_out_eu" "enum_tools_transfer_out_eu",
  	"privacy_score_saas" "enum_tools_privacy_score_saas",
  	"privacy_score_self_hosted" "enum_tools_privacy_score_self_hosted",
  	"online_accessible_dpa" boolean,
  	"certification_dpf" boolean,
  	"opensource" boolean,
  	"self_host_possibility" boolean,
  	"fr_documentation" boolean,
  	"dpa_compliant" boolean,
  	"dpa_link" varchar,
  	"enterprise_european" varchar,
  	"actions" jsonb,
  	"location_note" jsonb,
  	"transfer_informations" varchar,
  	"dpa_file_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_tools_v_version_subcontractors_infra" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tools_v_version_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"category_id" integer NOT NULL,
  	"main" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tools_v_version_certifications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"certification_id" integer NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tools_v_version_certifications_subcontractors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"certification_id" integer NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tools_v_version_accessors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"accessor_id" integer NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tools_v_version_locations_enterprise" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"location_id" integer NOT NULL,
  	"_uuid" varchar
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
  
  CREATE TABLE "_tools_v_version_transfers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"transfer_id" integer NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tools_v_version_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"feature_id" integer NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tools_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar NOT NULL,
  	"version_site_link" varchar NOT NULL,
  	"version_logo_id" integer,
  	"version_description" varchar,
  	"version_subcontractors" varchar,
  	"version_transfer_out_eu" "enum__tools_v_version_transfer_out_eu",
  	"version_privacy_score_saas" "enum__tools_v_version_privacy_score_saas",
  	"version_privacy_score_self_hosted" "enum__tools_v_version_privacy_score_self_hosted",
  	"version_online_accessible_dpa" boolean,
  	"version_certification_dpf" boolean,
  	"version_opensource" boolean,
  	"version_self_host_possibility" boolean,
  	"version_fr_documentation" boolean,
  	"version_dpa_compliant" boolean,
  	"version_dpa_link" varchar,
  	"version_enterprise_european" varchar,
  	"version_actions" jsonb,
  	"version_location_note" jsonb,
  	"version_transfer_informations" varchar,
  	"version_dpa_file_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"icon" varchar NOT NULL,
  	"color" varchar NOT NULL,
  	"fonctionnalities" varchar,
  	"vigilances" varchar,
  	"recommendations" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "categories_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tools_id" integer
  );
  
  CREATE TABLE "_categories_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar NOT NULL,
  	"version_description" varchar,
  	"version_icon" varchar NOT NULL,
  	"version_color" varchar NOT NULL,
  	"version_fonctionnalities" varchar,
  	"version_vigilances" varchar,
  	"version_recommendations" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_categories_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tools_id" integer
  );
  
  CREATE TABLE "certifications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "certifications_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tools_id" integer
  );
  
  CREATE TABLE "_certifications_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_certifications_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tools_id" integer
  );
  
  CREATE TABLE "accessors" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "accessors_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tools_id" integer
  );
  
  CREATE TABLE "_accessors_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_accessors_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tools_id" integer
  );
  
  CREATE TABLE "locations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "locations_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tools_id" integer
  );
  
  CREATE TABLE "_locations_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_locations_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tools_id" integer
  );
  
  CREATE TABLE "transfers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "transfers_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tools_id" integer
  );
  
  CREATE TABLE "_transfers_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_transfers_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tools_id" integer
  );
  
  CREATE TABLE "features" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "features_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tools_id" integer
  );
  
  CREATE TABLE "_features_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_features_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tools_id" integer
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tools_id" integer,
  	"media_id" integer,
  	"categories_id" integer,
  	"certifications_id" integer,
  	"accessors_id" integer,
  	"locations_id" integer,
  	"transfers_id" integer,
  	"features_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "tools_subcontractors_infra" ADD CONSTRAINT "tools_subcontractors_infra_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tools_categories" ADD CONSTRAINT "tools_categories_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tools_categories" ADD CONSTRAINT "tools_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tools_certifications" ADD CONSTRAINT "tools_certifications_certification_id_certifications_id_fk" FOREIGN KEY ("certification_id") REFERENCES "public"."certifications"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tools_certifications" ADD CONSTRAINT "tools_certifications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tools_certifications_subcontractors" ADD CONSTRAINT "tools_certifications_subcontractors_certification_id_certifications_id_fk" FOREIGN KEY ("certification_id") REFERENCES "public"."certifications"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tools_certifications_subcontractors" ADD CONSTRAINT "tools_certifications_subcontractors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tools_accessors" ADD CONSTRAINT "tools_accessors_accessor_id_accessors_id_fk" FOREIGN KEY ("accessor_id") REFERENCES "public"."accessors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tools_accessors" ADD CONSTRAINT "tools_accessors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tools_locations_enterprise" ADD CONSTRAINT "tools_locations_enterprise_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tools_locations_enterprise" ADD CONSTRAINT "tools_locations_enterprise_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tools_locations_host_client" ADD CONSTRAINT "tools_locations_host_client_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tools_locations_host_client" ADD CONSTRAINT "tools_locations_host_client_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tools_locations_final_users" ADD CONSTRAINT "tools_locations_final_users_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tools_locations_final_users" ADD CONSTRAINT "tools_locations_final_users_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tools_transfers" ADD CONSTRAINT "tools_transfers_transfer_id_transfers_id_fk" FOREIGN KEY ("transfer_id") REFERENCES "public"."transfers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tools_transfers" ADD CONSTRAINT "tools_transfers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tools_features" ADD CONSTRAINT "tools_features_feature_id_features_id_fk" FOREIGN KEY ("feature_id") REFERENCES "public"."features"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tools_features" ADD CONSTRAINT "tools_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tools" ADD CONSTRAINT "tools_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tools" ADD CONSTRAINT "tools_dpa_file_id_media_id_fk" FOREIGN KEY ("dpa_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_tools_v_version_subcontractors_infra" ADD CONSTRAINT "_tools_v_version_subcontractors_infra_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tools_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tools_v_version_categories" ADD CONSTRAINT "_tools_v_version_categories_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_tools_v_version_categories" ADD CONSTRAINT "_tools_v_version_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tools_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tools_v_version_certifications" ADD CONSTRAINT "_tools_v_version_certifications_certification_id_certifications_id_fk" FOREIGN KEY ("certification_id") REFERENCES "public"."certifications"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_tools_v_version_certifications" ADD CONSTRAINT "_tools_v_version_certifications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tools_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tools_v_version_certifications_subcontractors" ADD CONSTRAINT "_tools_v_version_certifications_subcontractors_certification_id_certifications_id_fk" FOREIGN KEY ("certification_id") REFERENCES "public"."certifications"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_tools_v_version_certifications_subcontractors" ADD CONSTRAINT "_tools_v_version_certifications_subcontractors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tools_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tools_v_version_accessors" ADD CONSTRAINT "_tools_v_version_accessors_accessor_id_accessors_id_fk" FOREIGN KEY ("accessor_id") REFERENCES "public"."accessors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_tools_v_version_accessors" ADD CONSTRAINT "_tools_v_version_accessors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tools_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tools_v_version_locations_enterprise" ADD CONSTRAINT "_tools_v_version_locations_enterprise_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_tools_v_version_locations_enterprise" ADD CONSTRAINT "_tools_v_version_locations_enterprise_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tools_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tools_v_version_locations_host_client" ADD CONSTRAINT "_tools_v_version_locations_host_client_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_tools_v_version_locations_host_client" ADD CONSTRAINT "_tools_v_version_locations_host_client_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tools_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tools_v_version_locations_final_users" ADD CONSTRAINT "_tools_v_version_locations_final_users_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_tools_v_version_locations_final_users" ADD CONSTRAINT "_tools_v_version_locations_final_users_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tools_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tools_v_version_transfers" ADD CONSTRAINT "_tools_v_version_transfers_transfer_id_transfers_id_fk" FOREIGN KEY ("transfer_id") REFERENCES "public"."transfers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_tools_v_version_transfers" ADD CONSTRAINT "_tools_v_version_transfers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tools_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tools_v_version_features" ADD CONSTRAINT "_tools_v_version_features_feature_id_features_id_fk" FOREIGN KEY ("feature_id") REFERENCES "public"."features"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_tools_v_version_features" ADD CONSTRAINT "_tools_v_version_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tools_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tools_v" ADD CONSTRAINT "_tools_v_parent_id_tools_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."tools"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_tools_v" ADD CONSTRAINT "_tools_v_version_logo_id_media_id_fk" FOREIGN KEY ("version_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_tools_v" ADD CONSTRAINT "_tools_v_version_dpa_file_id_media_id_fk" FOREIGN KEY ("version_dpa_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categories_rels" ADD CONSTRAINT "categories_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_rels" ADD CONSTRAINT "categories_rels_tools_fk" FOREIGN KEY ("tools_id") REFERENCES "public"."tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_categories_v" ADD CONSTRAINT "_categories_v_parent_id_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_categories_v_rels" ADD CONSTRAINT "_categories_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_categories_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_categories_v_rels" ADD CONSTRAINT "_categories_v_rels_tools_fk" FOREIGN KEY ("tools_id") REFERENCES "public"."tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "certifications_rels" ADD CONSTRAINT "certifications_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."certifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "certifications_rels" ADD CONSTRAINT "certifications_rels_tools_fk" FOREIGN KEY ("tools_id") REFERENCES "public"."tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_certifications_v" ADD CONSTRAINT "_certifications_v_parent_id_certifications_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."certifications"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_certifications_v_rels" ADD CONSTRAINT "_certifications_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_certifications_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_certifications_v_rels" ADD CONSTRAINT "_certifications_v_rels_tools_fk" FOREIGN KEY ("tools_id") REFERENCES "public"."tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accessors_rels" ADD CONSTRAINT "accessors_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."accessors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accessors_rels" ADD CONSTRAINT "accessors_rels_tools_fk" FOREIGN KEY ("tools_id") REFERENCES "public"."tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_accessors_v" ADD CONSTRAINT "_accessors_v_parent_id_accessors_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."accessors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_accessors_v_rels" ADD CONSTRAINT "_accessors_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_accessors_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_accessors_v_rels" ADD CONSTRAINT "_accessors_v_rels_tools_fk" FOREIGN KEY ("tools_id") REFERENCES "public"."tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_rels" ADD CONSTRAINT "locations_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_rels" ADD CONSTRAINT "locations_rels_tools_fk" FOREIGN KEY ("tools_id") REFERENCES "public"."tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_locations_v" ADD CONSTRAINT "_locations_v_parent_id_locations_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_locations_v_rels" ADD CONSTRAINT "_locations_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_locations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_locations_v_rels" ADD CONSTRAINT "_locations_v_rels_tools_fk" FOREIGN KEY ("tools_id") REFERENCES "public"."tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "transfers_rels" ADD CONSTRAINT "transfers_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."transfers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "transfers_rels" ADD CONSTRAINT "transfers_rels_tools_fk" FOREIGN KEY ("tools_id") REFERENCES "public"."tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_transfers_v" ADD CONSTRAINT "_transfers_v_parent_id_transfers_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."transfers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_transfers_v_rels" ADD CONSTRAINT "_transfers_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_transfers_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_transfers_v_rels" ADD CONSTRAINT "_transfers_v_rels_tools_fk" FOREIGN KEY ("tools_id") REFERENCES "public"."tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "features_rels" ADD CONSTRAINT "features_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "features_rels" ADD CONSTRAINT "features_rels_tools_fk" FOREIGN KEY ("tools_id") REFERENCES "public"."tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_features_v" ADD CONSTRAINT "_features_v_parent_id_features_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."features"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_features_v_rels" ADD CONSTRAINT "_features_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_features_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_features_v_rels" ADD CONSTRAINT "_features_v_rels_tools_fk" FOREIGN KEY ("tools_id") REFERENCES "public"."tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tools_fk" FOREIGN KEY ("tools_id") REFERENCES "public"."tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_certifications_fk" FOREIGN KEY ("certifications_id") REFERENCES "public"."certifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_accessors_fk" FOREIGN KEY ("accessors_id") REFERENCES "public"."accessors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_transfers_fk" FOREIGN KEY ("transfers_id") REFERENCES "public"."transfers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_features_fk" FOREIGN KEY ("features_id") REFERENCES "public"."features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "tools_subcontractors_infra_order_idx" ON "tools_subcontractors_infra" USING btree ("_order");
  CREATE INDEX "tools_subcontractors_infra_parent_id_idx" ON "tools_subcontractors_infra" USING btree ("_parent_id");
  CREATE INDEX "tools_categories_order_idx" ON "tools_categories" USING btree ("_order");
  CREATE INDEX "tools_categories_parent_id_idx" ON "tools_categories" USING btree ("_parent_id");
  CREATE INDEX "tools_categories_category_idx" ON "tools_categories" USING btree ("category_id");
  CREATE INDEX "tools_certifications_order_idx" ON "tools_certifications" USING btree ("_order");
  CREATE INDEX "tools_certifications_parent_id_idx" ON "tools_certifications" USING btree ("_parent_id");
  CREATE INDEX "tools_certifications_certification_idx" ON "tools_certifications" USING btree ("certification_id");
  CREATE INDEX "tools_certifications_subcontractors_order_idx" ON "tools_certifications_subcontractors" USING btree ("_order");
  CREATE INDEX "tools_certifications_subcontractors_parent_id_idx" ON "tools_certifications_subcontractors" USING btree ("_parent_id");
  CREATE INDEX "tools_certifications_subcontractors_certification_idx" ON "tools_certifications_subcontractors" USING btree ("certification_id");
  CREATE INDEX "tools_accessors_order_idx" ON "tools_accessors" USING btree ("_order");
  CREATE INDEX "tools_accessors_parent_id_idx" ON "tools_accessors" USING btree ("_parent_id");
  CREATE INDEX "tools_accessors_accessor_idx" ON "tools_accessors" USING btree ("accessor_id");
  CREATE INDEX "tools_locations_enterprise_order_idx" ON "tools_locations_enterprise" USING btree ("_order");
  CREATE INDEX "tools_locations_enterprise_parent_id_idx" ON "tools_locations_enterprise" USING btree ("_parent_id");
  CREATE INDEX "tools_locations_enterprise_location_idx" ON "tools_locations_enterprise" USING btree ("location_id");
  CREATE INDEX "tools_locations_host_client_order_idx" ON "tools_locations_host_client" USING btree ("_order");
  CREATE INDEX "tools_locations_host_client_parent_id_idx" ON "tools_locations_host_client" USING btree ("_parent_id");
  CREATE INDEX "tools_locations_host_client_location_idx" ON "tools_locations_host_client" USING btree ("location_id");
  CREATE INDEX "tools_locations_final_users_order_idx" ON "tools_locations_final_users" USING btree ("_order");
  CREATE INDEX "tools_locations_final_users_parent_id_idx" ON "tools_locations_final_users" USING btree ("_parent_id");
  CREATE INDEX "tools_locations_final_users_location_idx" ON "tools_locations_final_users" USING btree ("location_id");
  CREATE INDEX "tools_transfers_order_idx" ON "tools_transfers" USING btree ("_order");
  CREATE INDEX "tools_transfers_parent_id_idx" ON "tools_transfers" USING btree ("_parent_id");
  CREATE INDEX "tools_transfers_transfer_idx" ON "tools_transfers" USING btree ("transfer_id");
  CREATE INDEX "tools_features_order_idx" ON "tools_features" USING btree ("_order");
  CREATE INDEX "tools_features_parent_id_idx" ON "tools_features" USING btree ("_parent_id");
  CREATE INDEX "tools_features_feature_idx" ON "tools_features" USING btree ("feature_id");
  CREATE INDEX "tools_logo_idx" ON "tools" USING btree ("logo_id");
  CREATE INDEX "tools_dpa_file_idx" ON "tools" USING btree ("dpa_file_id");
  CREATE INDEX "tools_updated_at_idx" ON "tools" USING btree ("updated_at");
  CREATE INDEX "tools_created_at_idx" ON "tools" USING btree ("created_at");
  CREATE INDEX "_tools_v_version_subcontractors_infra_order_idx" ON "_tools_v_version_subcontractors_infra" USING btree ("_order");
  CREATE INDEX "_tools_v_version_subcontractors_infra_parent_id_idx" ON "_tools_v_version_subcontractors_infra" USING btree ("_parent_id");
  CREATE INDEX "_tools_v_version_categories_order_idx" ON "_tools_v_version_categories" USING btree ("_order");
  CREATE INDEX "_tools_v_version_categories_parent_id_idx" ON "_tools_v_version_categories" USING btree ("_parent_id");
  CREATE INDEX "_tools_v_version_categories_category_idx" ON "_tools_v_version_categories" USING btree ("category_id");
  CREATE INDEX "_tools_v_version_certifications_order_idx" ON "_tools_v_version_certifications" USING btree ("_order");
  CREATE INDEX "_tools_v_version_certifications_parent_id_idx" ON "_tools_v_version_certifications" USING btree ("_parent_id");
  CREATE INDEX "_tools_v_version_certifications_certification_idx" ON "_tools_v_version_certifications" USING btree ("certification_id");
  CREATE INDEX "_tools_v_version_certifications_subcontractors_order_idx" ON "_tools_v_version_certifications_subcontractors" USING btree ("_order");
  CREATE INDEX "_tools_v_version_certifications_subcontractors_parent_id_idx" ON "_tools_v_version_certifications_subcontractors" USING btree ("_parent_id");
  CREATE INDEX "_tools_v_version_certifications_subcontractors_certifica_idx" ON "_tools_v_version_certifications_subcontractors" USING btree ("certification_id");
  CREATE INDEX "_tools_v_version_accessors_order_idx" ON "_tools_v_version_accessors" USING btree ("_order");
  CREATE INDEX "_tools_v_version_accessors_parent_id_idx" ON "_tools_v_version_accessors" USING btree ("_parent_id");
  CREATE INDEX "_tools_v_version_accessors_accessor_idx" ON "_tools_v_version_accessors" USING btree ("accessor_id");
  CREATE INDEX "_tools_v_version_locations_enterprise_order_idx" ON "_tools_v_version_locations_enterprise" USING btree ("_order");
  CREATE INDEX "_tools_v_version_locations_enterprise_parent_id_idx" ON "_tools_v_version_locations_enterprise" USING btree ("_parent_id");
  CREATE INDEX "_tools_v_version_locations_enterprise_location_idx" ON "_tools_v_version_locations_enterprise" USING btree ("location_id");
  CREATE INDEX "_tools_v_version_locations_host_client_order_idx" ON "_tools_v_version_locations_host_client" USING btree ("_order");
  CREATE INDEX "_tools_v_version_locations_host_client_parent_id_idx" ON "_tools_v_version_locations_host_client" USING btree ("_parent_id");
  CREATE INDEX "_tools_v_version_locations_host_client_location_idx" ON "_tools_v_version_locations_host_client" USING btree ("location_id");
  CREATE INDEX "_tools_v_version_locations_final_users_order_idx" ON "_tools_v_version_locations_final_users" USING btree ("_order");
  CREATE INDEX "_tools_v_version_locations_final_users_parent_id_idx" ON "_tools_v_version_locations_final_users" USING btree ("_parent_id");
  CREATE INDEX "_tools_v_version_locations_final_users_location_idx" ON "_tools_v_version_locations_final_users" USING btree ("location_id");
  CREATE INDEX "_tools_v_version_transfers_order_idx" ON "_tools_v_version_transfers" USING btree ("_order");
  CREATE INDEX "_tools_v_version_transfers_parent_id_idx" ON "_tools_v_version_transfers" USING btree ("_parent_id");
  CREATE INDEX "_tools_v_version_transfers_transfer_idx" ON "_tools_v_version_transfers" USING btree ("transfer_id");
  CREATE INDEX "_tools_v_version_features_order_idx" ON "_tools_v_version_features" USING btree ("_order");
  CREATE INDEX "_tools_v_version_features_parent_id_idx" ON "_tools_v_version_features" USING btree ("_parent_id");
  CREATE INDEX "_tools_v_version_features_feature_idx" ON "_tools_v_version_features" USING btree ("feature_id");
  CREATE INDEX "_tools_v_parent_idx" ON "_tools_v" USING btree ("parent_id");
  CREATE INDEX "_tools_v_version_version_logo_idx" ON "_tools_v" USING btree ("version_logo_id");
  CREATE INDEX "_tools_v_version_version_dpa_file_idx" ON "_tools_v" USING btree ("version_dpa_file_id");
  CREATE INDEX "_tools_v_version_version_updated_at_idx" ON "_tools_v" USING btree ("version_updated_at");
  CREATE INDEX "_tools_v_version_version_created_at_idx" ON "_tools_v" USING btree ("version_created_at");
  CREATE INDEX "_tools_v_created_at_idx" ON "_tools_v" USING btree ("created_at");
  CREATE INDEX "_tools_v_updated_at_idx" ON "_tools_v" USING btree ("updated_at");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE INDEX "categories_rels_order_idx" ON "categories_rels" USING btree ("order");
  CREATE INDEX "categories_rels_parent_idx" ON "categories_rels" USING btree ("parent_id");
  CREATE INDEX "categories_rels_path_idx" ON "categories_rels" USING btree ("path");
  CREATE INDEX "categories_rels_tools_id_idx" ON "categories_rels" USING btree ("tools_id");
  CREATE INDEX "_categories_v_parent_idx" ON "_categories_v" USING btree ("parent_id");
  CREATE INDEX "_categories_v_version_version_updated_at_idx" ON "_categories_v" USING btree ("version_updated_at");
  CREATE INDEX "_categories_v_version_version_created_at_idx" ON "_categories_v" USING btree ("version_created_at");
  CREATE INDEX "_categories_v_created_at_idx" ON "_categories_v" USING btree ("created_at");
  CREATE INDEX "_categories_v_updated_at_idx" ON "_categories_v" USING btree ("updated_at");
  CREATE INDEX "_categories_v_rels_order_idx" ON "_categories_v_rels" USING btree ("order");
  CREATE INDEX "_categories_v_rels_parent_idx" ON "_categories_v_rels" USING btree ("parent_id");
  CREATE INDEX "_categories_v_rels_path_idx" ON "_categories_v_rels" USING btree ("path");
  CREATE INDEX "_categories_v_rels_tools_id_idx" ON "_categories_v_rels" USING btree ("tools_id");
  CREATE INDEX "certifications_updated_at_idx" ON "certifications" USING btree ("updated_at");
  CREATE INDEX "certifications_created_at_idx" ON "certifications" USING btree ("created_at");
  CREATE INDEX "certifications_rels_order_idx" ON "certifications_rels" USING btree ("order");
  CREATE INDEX "certifications_rels_parent_idx" ON "certifications_rels" USING btree ("parent_id");
  CREATE INDEX "certifications_rels_path_idx" ON "certifications_rels" USING btree ("path");
  CREATE INDEX "certifications_rels_tools_id_idx" ON "certifications_rels" USING btree ("tools_id");
  CREATE INDEX "_certifications_v_parent_idx" ON "_certifications_v" USING btree ("parent_id");
  CREATE INDEX "_certifications_v_version_version_updated_at_idx" ON "_certifications_v" USING btree ("version_updated_at");
  CREATE INDEX "_certifications_v_version_version_created_at_idx" ON "_certifications_v" USING btree ("version_created_at");
  CREATE INDEX "_certifications_v_created_at_idx" ON "_certifications_v" USING btree ("created_at");
  CREATE INDEX "_certifications_v_updated_at_idx" ON "_certifications_v" USING btree ("updated_at");
  CREATE INDEX "_certifications_v_rels_order_idx" ON "_certifications_v_rels" USING btree ("order");
  CREATE INDEX "_certifications_v_rels_parent_idx" ON "_certifications_v_rels" USING btree ("parent_id");
  CREATE INDEX "_certifications_v_rels_path_idx" ON "_certifications_v_rels" USING btree ("path");
  CREATE INDEX "_certifications_v_rels_tools_id_idx" ON "_certifications_v_rels" USING btree ("tools_id");
  CREATE INDEX "accessors_updated_at_idx" ON "accessors" USING btree ("updated_at");
  CREATE INDEX "accessors_created_at_idx" ON "accessors" USING btree ("created_at");
  CREATE INDEX "accessors_rels_order_idx" ON "accessors_rels" USING btree ("order");
  CREATE INDEX "accessors_rels_parent_idx" ON "accessors_rels" USING btree ("parent_id");
  CREATE INDEX "accessors_rels_path_idx" ON "accessors_rels" USING btree ("path");
  CREATE INDEX "accessors_rels_tools_id_idx" ON "accessors_rels" USING btree ("tools_id");
  CREATE INDEX "_accessors_v_parent_idx" ON "_accessors_v" USING btree ("parent_id");
  CREATE INDEX "_accessors_v_version_version_updated_at_idx" ON "_accessors_v" USING btree ("version_updated_at");
  CREATE INDEX "_accessors_v_version_version_created_at_idx" ON "_accessors_v" USING btree ("version_created_at");
  CREATE INDEX "_accessors_v_created_at_idx" ON "_accessors_v" USING btree ("created_at");
  CREATE INDEX "_accessors_v_updated_at_idx" ON "_accessors_v" USING btree ("updated_at");
  CREATE INDEX "_accessors_v_rels_order_idx" ON "_accessors_v_rels" USING btree ("order");
  CREATE INDEX "_accessors_v_rels_parent_idx" ON "_accessors_v_rels" USING btree ("parent_id");
  CREATE INDEX "_accessors_v_rels_path_idx" ON "_accessors_v_rels" USING btree ("path");
  CREATE INDEX "_accessors_v_rels_tools_id_idx" ON "_accessors_v_rels" USING btree ("tools_id");
  CREATE INDEX "locations_updated_at_idx" ON "locations" USING btree ("updated_at");
  CREATE INDEX "locations_created_at_idx" ON "locations" USING btree ("created_at");
  CREATE INDEX "locations_rels_order_idx" ON "locations_rels" USING btree ("order");
  CREATE INDEX "locations_rels_parent_idx" ON "locations_rels" USING btree ("parent_id");
  CREATE INDEX "locations_rels_path_idx" ON "locations_rels" USING btree ("path");
  CREATE INDEX "locations_rels_tools_id_idx" ON "locations_rels" USING btree ("tools_id");
  CREATE INDEX "_locations_v_parent_idx" ON "_locations_v" USING btree ("parent_id");
  CREATE INDEX "_locations_v_version_version_updated_at_idx" ON "_locations_v" USING btree ("version_updated_at");
  CREATE INDEX "_locations_v_version_version_created_at_idx" ON "_locations_v" USING btree ("version_created_at");
  CREATE INDEX "_locations_v_created_at_idx" ON "_locations_v" USING btree ("created_at");
  CREATE INDEX "_locations_v_updated_at_idx" ON "_locations_v" USING btree ("updated_at");
  CREATE INDEX "_locations_v_rels_order_idx" ON "_locations_v_rels" USING btree ("order");
  CREATE INDEX "_locations_v_rels_parent_idx" ON "_locations_v_rels" USING btree ("parent_id");
  CREATE INDEX "_locations_v_rels_path_idx" ON "_locations_v_rels" USING btree ("path");
  CREATE INDEX "_locations_v_rels_tools_id_idx" ON "_locations_v_rels" USING btree ("tools_id");
  CREATE INDEX "transfers_updated_at_idx" ON "transfers" USING btree ("updated_at");
  CREATE INDEX "transfers_created_at_idx" ON "transfers" USING btree ("created_at");
  CREATE INDEX "transfers_rels_order_idx" ON "transfers_rels" USING btree ("order");
  CREATE INDEX "transfers_rels_parent_idx" ON "transfers_rels" USING btree ("parent_id");
  CREATE INDEX "transfers_rels_path_idx" ON "transfers_rels" USING btree ("path");
  CREATE INDEX "transfers_rels_tools_id_idx" ON "transfers_rels" USING btree ("tools_id");
  CREATE INDEX "_transfers_v_parent_idx" ON "_transfers_v" USING btree ("parent_id");
  CREATE INDEX "_transfers_v_version_version_updated_at_idx" ON "_transfers_v" USING btree ("version_updated_at");
  CREATE INDEX "_transfers_v_version_version_created_at_idx" ON "_transfers_v" USING btree ("version_created_at");
  CREATE INDEX "_transfers_v_created_at_idx" ON "_transfers_v" USING btree ("created_at");
  CREATE INDEX "_transfers_v_updated_at_idx" ON "_transfers_v" USING btree ("updated_at");
  CREATE INDEX "_transfers_v_rels_order_idx" ON "_transfers_v_rels" USING btree ("order");
  CREATE INDEX "_transfers_v_rels_parent_idx" ON "_transfers_v_rels" USING btree ("parent_id");
  CREATE INDEX "_transfers_v_rels_path_idx" ON "_transfers_v_rels" USING btree ("path");
  CREATE INDEX "_transfers_v_rels_tools_id_idx" ON "_transfers_v_rels" USING btree ("tools_id");
  CREATE INDEX "features_updated_at_idx" ON "features" USING btree ("updated_at");
  CREATE INDEX "features_created_at_idx" ON "features" USING btree ("created_at");
  CREATE INDEX "features_rels_order_idx" ON "features_rels" USING btree ("order");
  CREATE INDEX "features_rels_parent_idx" ON "features_rels" USING btree ("parent_id");
  CREATE INDEX "features_rels_path_idx" ON "features_rels" USING btree ("path");
  CREATE INDEX "features_rels_tools_id_idx" ON "features_rels" USING btree ("tools_id");
  CREATE INDEX "_features_v_parent_idx" ON "_features_v" USING btree ("parent_id");
  CREATE INDEX "_features_v_version_version_updated_at_idx" ON "_features_v" USING btree ("version_updated_at");
  CREATE INDEX "_features_v_version_version_created_at_idx" ON "_features_v" USING btree ("version_created_at");
  CREATE INDEX "_features_v_created_at_idx" ON "_features_v" USING btree ("created_at");
  CREATE INDEX "_features_v_updated_at_idx" ON "_features_v" USING btree ("updated_at");
  CREATE INDEX "_features_v_rels_order_idx" ON "_features_v_rels" USING btree ("order");
  CREATE INDEX "_features_v_rels_parent_idx" ON "_features_v_rels" USING btree ("parent_id");
  CREATE INDEX "_features_v_rels_path_idx" ON "_features_v_rels" USING btree ("path");
  CREATE INDEX "_features_v_rels_tools_id_idx" ON "_features_v_rels" USING btree ("tools_id");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_tools_id_idx" ON "payload_locked_documents_rels" USING btree ("tools_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_certifications_id_idx" ON "payload_locked_documents_rels" USING btree ("certifications_id");
  CREATE INDEX "payload_locked_documents_rels_accessors_id_idx" ON "payload_locked_documents_rels" USING btree ("accessors_id");
  CREATE INDEX "payload_locked_documents_rels_locations_id_idx" ON "payload_locked_documents_rels" USING btree ("locations_id");
  CREATE INDEX "payload_locked_documents_rels_transfers_id_idx" ON "payload_locked_documents_rels" USING btree ("transfers_id");
  CREATE INDEX "payload_locked_documents_rels_features_id_idx" ON "payload_locked_documents_rels" USING btree ("features_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "tools_subcontractors_infra" CASCADE;
  DROP TABLE "tools_categories" CASCADE;
  DROP TABLE "tools_certifications" CASCADE;
  DROP TABLE "tools_certifications_subcontractors" CASCADE;
  DROP TABLE "tools_accessors" CASCADE;
  DROP TABLE "tools_locations_enterprise" CASCADE;
  DROP TABLE "tools_locations_host_client" CASCADE;
  DROP TABLE "tools_locations_final_users" CASCADE;
  DROP TABLE "tools_transfers" CASCADE;
  DROP TABLE "tools_features" CASCADE;
  DROP TABLE "tools" CASCADE;
  DROP TABLE "_tools_v_version_subcontractors_infra" CASCADE;
  DROP TABLE "_tools_v_version_categories" CASCADE;
  DROP TABLE "_tools_v_version_certifications" CASCADE;
  DROP TABLE "_tools_v_version_certifications_subcontractors" CASCADE;
  DROP TABLE "_tools_v_version_accessors" CASCADE;
  DROP TABLE "_tools_v_version_locations_enterprise" CASCADE;
  DROP TABLE "_tools_v_version_locations_host_client" CASCADE;
  DROP TABLE "_tools_v_version_locations_final_users" CASCADE;
  DROP TABLE "_tools_v_version_transfers" CASCADE;
  DROP TABLE "_tools_v_version_features" CASCADE;
  DROP TABLE "_tools_v" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "categories_rels" CASCADE;
  DROP TABLE "_categories_v" CASCADE;
  DROP TABLE "_categories_v_rels" CASCADE;
  DROP TABLE "certifications" CASCADE;
  DROP TABLE "certifications_rels" CASCADE;
  DROP TABLE "_certifications_v" CASCADE;
  DROP TABLE "_certifications_v_rels" CASCADE;
  DROP TABLE "accessors" CASCADE;
  DROP TABLE "accessors_rels" CASCADE;
  DROP TABLE "_accessors_v" CASCADE;
  DROP TABLE "_accessors_v_rels" CASCADE;
  DROP TABLE "locations" CASCADE;
  DROP TABLE "locations_rels" CASCADE;
  DROP TABLE "_locations_v" CASCADE;
  DROP TABLE "_locations_v_rels" CASCADE;
  DROP TABLE "transfers" CASCADE;
  DROP TABLE "transfers_rels" CASCADE;
  DROP TABLE "_transfers_v" CASCADE;
  DROP TABLE "_transfers_v_rels" CASCADE;
  DROP TABLE "features" CASCADE;
  DROP TABLE "features_rels" CASCADE;
  DROP TABLE "_features_v" CASCADE;
  DROP TABLE "_features_v_rels" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."enum_tools_transfer_out_eu";
  DROP TYPE "public"."enum_tools_privacy_score_saas";
  DROP TYPE "public"."enum_tools_privacy_score_self_hosted";
  DROP TYPE "public"."enum__tools_v_version_transfer_out_eu";
  DROP TYPE "public"."enum__tools_v_version_privacy_score_saas";
  DROP TYPE "public"."enum__tools_v_version_privacy_score_self_hosted";`)
}
