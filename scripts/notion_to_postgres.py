#!/usr/bin/env python3
"""
Script pour synchroniser les données d'une base Notion vers PostgreSQL
Compatible avec les tables PayloadCMS existantes - VERSION FINALE
"""

import os
import json
import psycopg2
from psycopg2.extras import RealDictCursor
from notion_client import Client
from datetime import datetime
import logging
from dotenv import load_dotenv

load_dotenv()

# Configuration des logs
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class NotionToPostgres:
    def __init__(self):
        # Configuration Notion
        self.notion_key = os.getenv('NOTION_KEY')
        self.notion_database_id = os.getenv('NOTION_DATABASE_ID')

        # Configuration PostgreSQL
        self.pg_config = {
            'host': os.getenv('PG_HOST', 'localhost'),
            'database': os.getenv('PG_DATABASE', 'sanity-check'),
            'user': os.getenv('PG_USER'),
            'password': os.getenv('PG_PASSWORD'),
            'port': os.getenv('PG_PORT', '5432')
        }
        
        # Nom de la table existante PayloadCMS
        self.table_name = "tools"
        
        # Mapping personnalisé des noms de colonnes
        self.column_mapping = {
            "Name": "name",
            "lien site": "site_link", 
            "Description de l'outil": "description",
            "Certifications de l'entreprise ?": "enterprise_certifications",
            "Accès aux données ?": "data_access",
            "Liste des sous-traitants ultérieurs": "subcontractors",
            "Transfert hors EU?": "transfer_out_eu",
            "Privacy score SAAS": "privacy_score_saas",
            "Privacy score SELFHOSTED": "privacy_score_self_hosted",
            "Type d'outil": "tool_kind",
            "Localisation hébergement : relation client": "location_host_client",
            "DPA accessible en ligne ?": "online_accessible_dpa",
            "Sous-traitants ultérieurs (Hébergement/Infrastructure)": "subcontractors_infra",
            "Certifié \"DPF\"": "certification_dpf",
            "Open source ?": "opensource",
            "Possibilité de selfhost ?": "self_host_possibility",
            "Documentation en FR ?": "fr_documentation",
            "DPA conforme ?": "dpa_compliant",
            "Sous Type d'outil/fonctionnalités": "subkind",
            "Fonctionnalités RGPD/Sécurité": "rgpd_feature",
            "Encadrement des transferts ?": "transfer_supervision",
            "Localisation de l'entreprise": "enterprise_location",
            "lien DPA si applicable": "dpa_link",
            "Certifications des sous-traitants ou hébergeurs ?": "subcontractors_certifications",
            "Entreprise EU ?": "enterprise_european",
            "Localisation hébergement : utilisateurs finaux": "final_users_location",
            "Informations sur les transferts": "transfer_informations",
            "Actions à mener si utilisation de l'outil": "actions",
            "Remarque Localisation Hébergement": "location_note",
        }
        
        # Initialisation du client Notion
        self.notion = Client(auth=self.notion_key)
        
    def connect_postgres(self):
        """Connexion à PostgreSQL"""
        try:
            conn = psycopg2.connect(**self.pg_config)
            logger.info("Connexion PostgreSQL réussie")
            return conn
        except Exception as e:
            logger.error(f"Erreur connexion PostgreSQL: {e}")
            raise
    
    def get_notion_database_schema(self):
        """Récupère le schéma de la base Notion"""
        try:
            database = self.notion.databases.retrieve(database_id=self.notion_database_id)
            properties = database['properties']
            
            logger.info(f"Schéma de la base Notion récupéré: {len(properties)} propriétés")
            return properties
        except Exception as e:
            logger.error(f"Erreur récupération schéma Notion: {e}")
            raise

    def get_column_name(self, notion_property_name):
        """Retourne le nom de colonne PostgreSQL (mapping personnalisé ou auto-généré)"""
        if notion_property_name in self.column_mapping:
            return self.column_mapping[notion_property_name]
        return self.clean_column_name(notion_property_name)

    def clean_column_name(self, name):
        """Nettoie le nom d'une colonne pour PostgreSQL"""
        import re
        clean_name = name.lower()
        clean_name = re.sub(r'[\s\-]+', '_', clean_name)
        clean_name = re.sub(r'[^a-z0-9_]', '', clean_name)
        clean_name = re.sub(r'_+', '_', clean_name)
        clean_name = clean_name.strip('_')
        if clean_name and not clean_name[0].isalpha():
            clean_name = 'col_' + clean_name
        if not clean_name:
            clean_name = 'unnamed_column'
        return clean_name

    def check_table_exists(self, conn, table_name):
        """Vérifie si la table existe dans PostgreSQL"""
        cursor = conn.cursor()
        cursor.execute("""
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_name = %s
            );
        """, (table_name,))
        exists = cursor.fetchone()[0]
        cursor.close()
        return exists
    
    def get_table_columns(self, conn, table_name):
        """Récupère les colonnes existantes de la table avec leurs types"""
        cursor = conn.cursor()
        cursor.execute("""
            SELECT column_name, data_type, udt_name
            FROM information_schema.columns 
            WHERE table_name = %s
            ORDER BY ordinal_position;
        """, (table_name,))
        columns = cursor.fetchall()
        cursor.close()
        return {col[0]: {'data_type': col[1], 'udt_name': col[2]} for col in columns}

    def format_value_for_column(self, value, column_info, column_name=None):
        """Formate la valeur selon le type de colonne PostgreSQL"""
        if value is None:
            return None
            
        data_type = column_info.get('data_type', '')
        udt_name = column_info.get('udt_name', '')
        
        # Colonnes JSON/JSONB - utilisées par PayloadCMS pour richText
        if data_type in ['json', 'jsonb'] or udt_name in ['json', 'jsonb']:
            if isinstance(value, str):
                escaped_text = value.replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n').replace('\r', '\\r')
                return json.dumps([{
                    "type": "paragraph",
                    "children": [{"text": escaped_text}]
                }])
            else:
                return json.dumps(value)
        
        # Colonnes boolean
        elif data_type in ['boolean', 'bool'] or udt_name in ['boolean', 'bool']:
            if value is None:
                return None
            if isinstance(value, bool):
                return value
            elif isinstance(value, str):
                value_clean = value.lower().strip()
                if value_clean in ['oui', 'yes', 'true', '1', 'on']:
                    return True
                elif value_clean in ['non', 'no', 'false', '0', 'off']:
                    return False
                else:
                    return None  # Pour "n/a"
            else:
                try:
                    return bool(value)
                except:
                    return None
        
        # Colonnes numériques
        elif data_type in ['integer', 'bigint', 'smallint']:
            if isinstance(value, str) and value.isdigit():
                return int(value)
            elif isinstance(value, (int, float)):
                return int(value)
            return None
            
        elif data_type in ['numeric', 'decimal', 'real', 'double precision']:
            try:
                return float(value) if value else None
            except:
                return None
        
        # Autres types (text, varchar, etc.)
        else:
            return str(value) if value is not None else None

    def use_existing_table(self, conn):
        """Utilise la table PayloadCMS existante"""
        table_name = self.table_name
        
        if not self.check_table_exists(conn, table_name):
            raise Exception(f"La table {table_name} n'existe pas. Créez-la d'abord avec PayloadCMS.")
        
        logger.info(f"Utilisation de la table existante: {table_name}")
        
        existing_columns = self.get_table_columns(conn, table_name)
        logger.info(f"Colonnes existantes dans {table_name}: {list(existing_columns.keys())}")
        
        # Debug des types de colonnes
        json_columns = [col for col, info in existing_columns.items() 
                       if info.get('data_type') in ['json', 'jsonb'] or info.get('udt_name') in ['json', 'jsonb']]
        boolean_columns = [col for col, info in existing_columns.items() 
                          if info.get('data_type') == 'boolean']
        
        if json_columns:
            logger.info(f"Colonnes JSON détectées: {json_columns}")
        if boolean_columns:
            logger.info(f"Colonnes BOOLEAN détectées: {boolean_columns}")
        
        # Vérifier le mapping
        missing_columns = []
        available_columns = []
        
        for notion_prop, pg_column in self.column_mapping.items():
            if pg_column in existing_columns:
                available_columns.append(f"{notion_prop} → {pg_column}")
            else:
                missing_columns.append(f"{notion_prop} → {pg_column}")
        
        logger.info(f"Colonnes mappées disponibles: {len(available_columns)}")
        if missing_columns:
            logger.warning(f"Colonnes manquantes (seront ignorées): {missing_columns}")
        
        return table_name
    
    def extract_notion_property_value(self, prop_name, prop_value):
        """Extrait la valeur d'une propriété Notion selon son type"""
        prop_type = prop_value['type']
        
        if prop_type == 'title':
            return ' '.join([text['plain_text'] for text in prop_value['title']]) if prop_value['title'] else None
        elif prop_type == 'rich_text':
            if prop_value['rich_text']:
                return ' '.join([text['plain_text'] for text in prop_value['rich_text']])
            return None
        elif prop_type == 'number':
            return prop_value['number']
        elif prop_type == 'select':
            return prop_value['select']['name'] if prop_value['select'] else None
        elif prop_type == 'multi_select':
            if prop_value['multi_select']:
                return ', '.join([item['name'] for item in prop_value['multi_select']])
            return None
        elif prop_type == 'date':
            return prop_value['date']['start'] if prop_value['date'] else None
        elif prop_type == 'checkbox':
            return prop_value['checkbox']
        elif prop_type == 'email':
            return prop_value['email']
        elif prop_type == 'url':
            return prop_value['url']
        elif prop_type == 'phone_number':
            return prop_value['phone_number']
        elif prop_type == 'people':
            if prop_value['people']:
                return ', '.join([person['name'] for person in prop_value['people']])
            return None
        elif prop_type == 'files':
            if prop_value['files']:
                return ', '.join([file['name'] for file in prop_value['files']])
            return None
        else:
            return str(prop_value)
    
    def get_notion_data(self):
        """Récupère toutes les données de la base Notion"""
        try:
            results = []
            has_more = True
            start_cursor = None
            
            while has_more:
                response = self.notion.databases.query(
                    database_id=self.notion_database_id,
                    start_cursor=start_cursor,
                    page_size=100
                )
                
                results.extend(response['results'])
                has_more = response['has_more']
                start_cursor = response.get('next_cursor')
            
            logger.info(f"Récupération de {len(results)} enregistrements depuis Notion")
            return results
        except Exception as e:
            logger.error(f"Erreur récupération données Notion: {e}")
            raise
    
    def insert_to_postgres(self, conn, table_name, notion_data, properties):
        """Insère les données dans PostgreSQL (table existante PayloadCMS)"""
        cursor = conn.cursor()
        
        # Récupérer les colonnes existantes des deux tables
        existing_columns = self.get_table_columns(conn, table_name)
        
        # Vérifier si la table de versions existe
        version_table = f"_{table_name}_v"
        version_table_exists = self.check_table_exists(conn, version_table)
        version_columns = {}
        
        if version_table_exists:
            version_columns = self.get_table_columns(conn, version_table)
            logger.info(f"Table de versions détectée: {version_table}")
        else:
            logger.warning(f"Table de versions {version_table} non trouvée")
        
        successful_inserts = 0
        failed_inserts = 0
        
        for page in notion_data:
            try:
                values = {}
                
                # Extraction des propriétés mappées
                for prop_name, prop_info in properties.items():
                    column_name = self.get_column_name(prop_name)
                    
                    # Vérifier si la colonne existe dans la table
                    if column_name in existing_columns:
                        if prop_name in page['properties']:
                            raw_value = self.extract_notion_property_value(
                                prop_name, page['properties'][prop_name]
                            )
                            
                            # Formater la valeur selon le type de colonne
                            formatted_value = self.format_value_for_column(
                                raw_value, existing_columns[column_name], column_name
                            )
                            
                            values[column_name] = formatted_value
                        else:
                            values[column_name] = None
                
                # Si aucune donnée à insérer, passer
                if not values:
                    continue
                
                # Construction de la requête INSERT pour la table principale
                columns = [f'"{col}"' for col in values.keys()]
                placeholders = ['%s'] * len(values)
                
                insert_query = f"""
                    INSERT INTO {table_name} ({', '.join(columns)}) 
                    VALUES ({', '.join(placeholders)})
                    RETURNING id
                """
                
                # Exécuter l'insertion dans la table principale
                cursor.execute(insert_query, list(values.values()))
                
                # Récupérer l'ID généré
                inserted_id = cursor.fetchone()[0]
                logger.debug(f"Insertion dans {table_name} - ID: {inserted_id}")
                
                # Insérer dans la table de versions si elle existe
                if version_table_exists and version_columns:
                    # Préparer les données pour la table de versions
                    version_values = {}
                    version_values['parent_id'] = inserted_id
                    
                    # Mapper les colonnes vers les noms de la table de versions
                    for col, val in values.items():
                        # Les colonnes dans _tools_v ont le préfixe "version_"
                        version_col_name = f"version_{col}"
                        
                        # Vérifier si la colonne existe dans la table de versions
                        if version_col_name in version_columns:
                            # Formater la valeur selon le type de colonne de la table de versions
                            formatted_value = self.format_value_for_column(
                                val, version_columns[version_col_name], version_col_name
                            )
                            version_values[version_col_name] = formatted_value
                    
                    if version_values:
                        # Construction de la requête pour la table de versions
                        version_cols = [f'"{col}"' for col in version_values.keys()]
                        version_placeholders = ['%s'] * len(version_values)
                        
                        version_insert_query = f"""
                            INSERT INTO {version_table} ({', '.join(version_cols)}) 
                            VALUES ({', '.join(version_placeholders)})
                        """
                        
                        # Exécuter l'insertion dans la table de versions
                        cursor.execute(version_insert_query, list(version_values.values()))
                        logger.debug(f"Insertion dans {version_table} - parent_id: {inserted_id}, colonnes: {len(version_values)}")
                
                conn.commit()
                successful_inserts += 1
                
            except Exception as e:
                conn.rollback()
                failed_inserts += 1
                logger.error(f"Erreur lors de l'insertion d'un enregistrement: {e}")
                if 'insert_query' in locals():
                    logger.error(f"Requête principale: {insert_query}")
                if 'version_insert_query' in locals():
                    logger.error(f"Requête version: {version_insert_query}")
                if 'values' in locals():
                    logger.error(f"Valeurs: {list(values.values())}")
                continue
        
        cursor.close()
        logger.info(f"Insertion terminée: {successful_inserts} réussies, {failed_inserts} échouées")
        if version_table_exists:
            logger.info(f"Données dupliquées dans {version_table} avec préfixe 'version_' et parent_id")

    def debug_first_record(self):
        """Debug le premier enregistrement pour identifier les problèmes"""
        try:
            logger.info("=== MODE DEBUG : Analyse du premier enregistrement ===")
            
            conn = self.connect_postgres()
            properties = self.get_notion_database_schema()
            existing_columns = self.get_table_columns(conn, self.table_name)
            
            logger.info(f"Colonnes existantes dans {self.table_name}: {list(existing_columns.keys())}")
            
            # Debug des types de colonnes
            json_columns = [col for col, info in existing_columns.items() 
                           if info.get('data_type') in ['json', 'jsonb'] or info.get('udt_name') in ['json', 'jsonb']]
            boolean_columns = [col for col, info in existing_columns.items() 
                              if info.get('data_type') == 'boolean']
            
            if json_columns:
                logger.info(f"Colonnes JSON détectées: {json_columns}")
            if boolean_columns:
                logger.info(f"Colonnes BOOLEAN détectées: {boolean_columns}")
            
            # Récupération du premier enregistrement
            response = self.notion.databases.query(
                database_id=self.notion_database_id,
                page_size=1
            )
            
            if not response['results']:
                logger.error("Aucun enregistrement trouvé dans Notion")
                return
            
            page = response['results'][0]
            logger.info(f"Premier enregistrement ID: {page['id']}")
            
            # Analyse des données
            values = {}
            
            for prop_name, prop_info in properties.items():
                column_name = self.get_column_name(prop_name)
                
                if column_name in existing_columns:
                    if prop_name in page['properties']:
                        raw_value = self.extract_notion_property_value(
                            prop_name, page['properties'][prop_name]
                        )
                        formatted_value = self.format_value_for_column(
                            raw_value, existing_columns[column_name], column_name
                        )
                        values[column_name] = formatted_value
                        logger.info(f"✓ {prop_name} → {column_name}: {str(formatted_value)[:100]}...")
                    else:
                        values[column_name] = None
                        logger.info(f"○ {prop_name} → {column_name}: NULL")
                else:
                    logger.warning(f"✗ {prop_name} → {column_name}: colonne manquante")
            
            # Test d'insertion
            cursor = conn.cursor()
            columns = [f'"{col}"' for col in values.keys()]
            placeholders = ['%s'] * len(values)
            
            insert_query = f"""
                INSERT INTO {self.table_name} ({', '.join(columns)}) 
                VALUES ({', '.join(placeholders)})
            """
            
            logger.info(f"Requête SQL générée: {insert_query}")
            logger.info(f"Valeurs: {list(values.values())}")
            
            try:
                cursor.execute(insert_query, list(values.values()))
                conn.commit()
                logger.info("✓ Test d'insertion réussi !")
            except Exception as e:
                conn.rollback()
                logger.error(f"✗ Erreur lors du test d'insertion: {e}")
            
            cursor.close()
            conn.close()
            
        except Exception as e:
            logger.error(f"Erreur durant le debug: {e}")

    def show_notion_properties(self):
        """Affiche toutes les propriétés disponibles dans la base Notion"""
        try:
            properties = self.get_notion_database_schema()
            
            print("\n=== PROPRIÉTÉS DISPONIBLES DANS NOTION ===")
            print("Copiez les noms exacts pour votre mapping personnalisé :\n")
            
            for i, (prop_name, prop_info) in enumerate(properties.items(), 1):
                current_mapping = self.get_column_name(prop_name)
                mapping_source = "personnalisé" if prop_name in self.column_mapping else "auto-généré"
                
                print(f"{i:2d}. \"{prop_name}\" ({prop_info['type']})")
                print(f"    → Colonne PostgreSQL: \"{current_mapping}\" ({mapping_source})")
                print()
            
            print("Pour ajouter un mapping personnalisé, ajoutez cette ligne dans self.column_mapping :")
            print('    "Nom exact dans Notion": "nom_colonne_postgres",')
            print("\n" + "="*60)
            
        except Exception as e:
            logger.error(f"Erreur lors de l'affichage des propriétés: {e}")

    def sync(self):
        """Synchronisation complète Notion -> PostgreSQL"""
        try:
            logger.info("Début de la synchronisation Notion -> PostgreSQL")
            
            conn = self.connect_postgres()
            properties = self.get_notion_database_schema()
            table_name = self.use_existing_table(conn)
            notion_data = self.get_notion_data()
            
            self.insert_to_postgres(conn, table_name, notion_data, properties)
            
            conn.close()
            logger.info("Synchronisation terminée avec succès")
            
        except Exception as e:
            logger.error(f"Erreur durant la synchronisation: {e}")
            raise

def main():
    """Fonction principale"""
    import sys
    
    syncer = NotionToPostgres()
    
    if len(sys.argv) > 1 and sys.argv[1] == "--show-properties":
        syncer.show_notion_properties()
        return
    
    if len(sys.argv) > 1 and sys.argv[1] == "--debug":
        syncer.debug_first_record()
        return
    
    syncer.sync()

if __name__ == "__main__":
    main()