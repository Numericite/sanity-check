#!/usr/bin/env python3
"""
Script pour synchroniser les données d'une base Notion vers un fichier JSON
VERSION SANS POSTGRESQL
"""

import os
import json
from notion_client import Client
from datetime import datetime
import logging
from dotenv import load_dotenv

load_dotenv()

# Configuration des logs
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class NotionToJSON:
    def __init__(self):
        # Configuration Notion
        self.notion_key = os.getenv('NOTION_KEY')
        self.notion_database_id = os.getenv('NOTION_DATABASE_ID')

        # Nom du fichier JSON de sortie
        self.output_file = "tools.json"
        
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

    def get_notion_database_schema(self):
        """Récupère le schéma de la base Notion"""
        database = self.notion.databases.retrieve(database_id=self.notion_database_id)
        return database['properties']

    def extract_notion_property_value(self, prop_name, prop_value):
        """Extrait la valeur d'une propriété Notion selon son type"""
        prop_type = prop_value['type']
        
        if prop_type == 'title':
            return ' '.join([t['plain_text'] for t in prop_value['title']]) if prop_value['title'] else None
        elif prop_type == 'rich_text':
            return ' '.join([t['plain_text'] for t in prop_value['rich_text']]) if prop_value['rich_text'] else None
        elif prop_type == 'number':
            return prop_value['number']
        elif prop_type == 'select':
            return prop_value['select']['name'] if prop_value['select'] else None
        elif prop_type == 'multi_select':
            return [item['name'] for item in prop_value['multi_select']]
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
            return [p['name'] for p in prop_value['people']] if prop_value['people'] else []
        elif prop_type == 'files':
            return [f['name'] for f in prop_value['files']] if prop_value['files'] else []
        else:
            return str(prop_value)

    def get_column_name(self, notion_property_name):
        """Retourne le nom de clé JSON (mapping personnalisé ou auto-généré)"""
        import re
        if notion_property_name in self.column_mapping:
            return self.column_mapping[notion_property_name]
        clean = notion_property_name.lower()
        clean = re.sub(r'[\s\-]+', '_', clean)
        clean = re.sub(r'[^a-z0-9_]', '', clean)
        return clean

    def get_notion_data(self):
        """Récupère toutes les données de la base Notion"""
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

    def export_to_json(self):
        """Exporte les données Notion vers un fichier JSON"""
        logger.info("Début de l'export JSON depuis Notion...")
        
        properties = self.get_notion_database_schema()
        notion_data = self.get_notion_data()
        exported_data = []

        for page in notion_data:
            item = {}
            for prop_name, prop_info in properties.items():
                if prop_name in page['properties']:
                    value = self.extract_notion_property_value(
                        prop_name, page['properties'][prop_name]
                    )
                    json_key = self.get_column_name(prop_name)
                    item[json_key] = value
            item["id_notion"] = page["id"]

            if(item["name"] != None):
                if(item['name'] == 'Brevo (anciennement Sendinblue)'):
                    item['name'] = 'Brevo'

                # enterprise_european
                # Première vérification, dans certains cas, la donnée est une liste de 2 éléments. 
                # On transforme alors la liste de deux éléments en un élément afin que la transformation en boolean soit la même pour toutes les données.
                if(len(item['enterprise_european']) > 1):
                    if(item['enterprise_european'][0] == 'Non'):
                        item['enterprise_european'] = ['Non']
                    elif(item['enterprise_european'][0] == 'Filiale EU'):
                        item['enterprise_european'] = ['Non']
                    elif(item['enterprise_european'] == ['Oui', 'Non']):
                        item['enterprise_european'] = []

                # Transformation de la liste en boolean nullable
                if(item['enterprise_european'] == []):
                    item['enterprise_european'] = None
                elif(item['enterprise_european'] == ['Oui']):
                    item['enterprise_european'] = True
                elif(item['enterprise_european'] == ['Non']):
                    item['enterprise_european'] = False
                elif(item['enterprise_european'][0] in ['Filiale EU', 'Suisse']):
                # else if(item['enterprise_european'] == ['Filiale EU'] or item['enterprise_european'] == ['Suisse']):
                    item['enterprise_european'] = False

                # online_accessible_dpa
                if(item['online_accessible_dpa'] == 'n/a'):
                    item['online_accessible_dpa'] = None
                if(item['online_accessible_dpa'] == 'Oui'):
                    item['online_accessible_dpa'] = True
                if(item['online_accessible_dpa'] == 'Non'):
                    item['online_accessible_dpa'] = False

                # opensource
                if(item['opensource'] == 'Oui'):
                    item['opensource'] = True
                if(item['opensource'] == 'Non'):
                    item['opensource'] = False

                # self_host_possibility
                if(item['self_host_possibility'] == 'n/a'):
                    item['self_host_possibility'] = None
                if(item['self_host_possibility'] == 'Oui'):
                    item['self_host_possibility'] = True
                if(item['self_host_possibility'] == 'Non'):
                    item['self_host_possibility'] = False

                # fr_documentation
                if(item["fr_documentation"] != None):
                    item["fr_documentation"] = item["fr_documentation"].split(' ')[0]
                if(item['fr_documentation'] == 'Oui'):
                    item['fr_documentation'] = True
                if(item['fr_documentation'] == 'Non'):
                    item['fr_documentation'] = False

                # certification_dpf
                if(item['certification_dpf'] == 'n/a'):
                    item['certification_dpf'] = None
                if(item['certification_dpf'] == 'Oui'):
                    item['certification_dpf'] = True
                if(item['certification_dpf'] == 'Non'):
                    item['certification_dpf'] = False

                # dpa_compliant
                if(item['dpa_compliant'] == 'n/a'):
                    item['dpa_compliant'] = None
                if(item['dpa_compliant'] == 'Oui'):
                    item['dpa_compliant'] = True
                if(item['dpa_compliant'] == 'Non'):
                    item['dpa_compliant'] = False

                # transfer_out_eu
                if(item['transfer_out_eu'] == 'n/a'):
                    item['transfer_out_eu'] = None

                # enterprise_certifications
                liste = item['enterprise_certifications']
                liste = [x for x in liste if x not in ['n/a', 'non']]
                item['enterprise_certifications'] = liste

                # subcontractors_certifications
                liste = item['subcontractors_certifications']
                liste = [x for x in liste if x not in ['n/a']]
                item['subcontractors_certifications'] = liste

                # Gestion des catégories
                categories_rename = {
                    'Intelligence artificielle': 'Intelligence Artificielle',
                    'No Code': 'No code',
                    'Messagerie collaborative': 'Messagerie'
                }
                categories = ["Documentation","CRM","Support","Formulaire","No code","Chatbot","Hébergeur","Analytics","Monitoring","Messagerie","Consent Manager Platform","Emailing","Intelligence Artificielle"]
                kinds = []
                for i in range(len(item['tool_kind'])):
                    if(item['tool_kind'][i] in categories_rename):
                        item['tool_kind'][i] = categories_rename[item['tool_kind'][i]]
                    if(item['tool_kind'][i] in categories):
                        kinds.append(item['tool_kind'][i])

                if(len(item['subkind']) > 0):
                    for i in range(len(item['subkind'])):
                        if(item['subkind'][i] in categories_rename):
                            item['subkind'][i] = categories_rename[item['subkind'][i]]
                        if(item['subkind'][i] in categories and item['subkind'][i] not in kinds):
                            kinds.append(item['subkind'][i])

                liste = []
                j = 0
                for elt in kinds: 
                    index = categories.index(elt)
                    if(index >= 0):
                        main = True
                        if(j > 0):
                            main = False

                        liste.append({
                            "category": elt,
                            "main": main
                        })
                        j += 1
                item["categories"] = liste
                del item['tool_kind']
                del item['subkind']

                # Gestion subcontractors_infra
                if(len(item['subcontractors_infra']) == 1 and item["subcontractors_infra"][0] == 'n/a'):
                    item['subcontractors_infra'] = []
                liste2 = []
                for elt in item['subcontractors_infra']:
                    liste2.append({ 'name': elt })
                item['subcontractors_infra'] = liste2

                # Gestion du nom (trim)
                item["name"] = item["name"].strip()
                
                # Gestion de la note de localisation
                if(item['location_note'] != None):
                    item["location_note"] = {
                        "root": {
                            "type": "root",
                            "format": "",
                            "indent": 0,
                            "version": 1,
                            "children": [
                                {
                                    "type": "paragraph",
                                    "format": "",
                                    "indent": 0,
                                    "version": 1,
                                    "children": [
                                        {
                                            "mode": "normal",
                                            "text": item["location_note"],
                                            "type": "text",
                                            "style": "",
                                            "detail": 0,
                                            "format": 0,
                                            "version": 1
                                        }
                                    ],
                                    "direction": None,
                                    "textStyle": "",
                                    "textFormat": 0
                                }
                            ],
                            "direction": None
                        }
                    }
                
                # Gestion de la note d'actions
                if(item['actions'] != None):
                    item["actions"] = {
                        "root": {
                            "type": "root",
                            "format": "",
                            "indent": 0,
                            "version": 1,
                            "children": [
                                {
                                    "type": "paragraph",
                                    "format": "",
                                    "indent": 0,
                                    "version": 1,
                                    "children": [
                                        {
                                            "mode": "normal",
                                            "text": item["actions"],
                                            "type": "text",
                                            "style": "",
                                            "detail": 0,
                                            "format": 0,
                                            "version": 1
                                        }
                                    ],
                                    "direction": None,
                                    "textStyle": "",
                                    "textFormat": 0
                                }
                            ],
                            "direction": None
                        }
                    }

                # Gestion des scores
                if(item['privacy_score_self_hosted'] == 'n/a'):
                    item['privacy_score_self_hosted'] = None
                if(item['privacy_score_saas'] == 'n/a'):
                    item['privacy_score_saas'] = None

                # Gestion des accès
                if(item['data_access'] != None):
                    liste = item['data_access']
                    liste = [x for x in liste if x != 'n/a']
                    for i in range(len(liste)):
                        if(liste[i] == "le RT"):
                            liste[i] = "Responsable du traitement"
                        if(liste[i] == 'ST ultérieurs'):
                            liste[i] = 'Sous-traitant ultérieur'
                    item['data_access'] = liste

                # Gestion des locations
                locations = ["🇳🇿 Nouvelle-Zélande","🇪🇸 Espagne","🇺🇸 États-Unis","🇪🇺 Filiale Européenne","🇮🇪 Irlande","🇪🇪 Estonie","🇳🇴 Norvège","🇩🇪 Allemagne","🇲🇹 Malte","🇫🇷 France","🇨🇭 Suisse","🇫🇮 Finlande","🇵🇱 Pologne","🇨🇿 République tchèque","🇫🇷 Filiale Française","🇳🇱 Pays-Bas","🇩🇰 Danemark","🇦🇺 Australie","🇧🇪 Belgique","🇪🇺 Europe","🇨🇦 Canada","🇱🇺 Luxembourg","🇧🇬 Bulgarie","🇮🇳 Inde","🏳️ Au choix"]
                locations_old = ["Nouvelle-Zélande","Espagne","USA","Filiale EU","Irlande","Estonie","Norvège","Allemagne","Malte","France","Suisse","Finlande","Pologne","République tchèque","Filiale Française","Pays-Bas","Danemark","Australie","Belgique","Europe","Canada","Luxembourg","Bulgarie","Inde","Au choix"]
                for column in ['enterprise_location', 'location_host_client', 'final_users_location']:
                    liste = item[column]
                    liste = [x for x in liste if x not in ['Hors EU', 'Selfhost', 'n/a']]
                    for i in range(len(liste)):
                        if(liste[i] == 'États-Unis'):
                            liste[i] = 'USA'
                    for i in range(len(liste)):
                        liste[i] = locations[locations_old.index(liste[i])]
                    item[column] = liste

                # Gestion des transfer_supervision
                transfer_supervision = ["Clauses contractuelles type","Décisions d'adéquation","DPA","Standards du secteur commercial","BCR","Méthodes de chiffrement sécurisé","Filiale localisée EU","Data Transfer Assessment"]
                transfer_supervision_old = ["Clauses contractuelles type","Décisions d'adéquation","DPA","standards du secteur commercial","BCR","méthodes de chiffrement sécurisé","Filiale localisée EU","Data Transfer Assessment"]

                liste = item["transfer_supervision"]
                liste = [x for x in liste if x not in ['n/a']]
                for i in range(len(liste)):
                    liste[i] = transfer_supervision[transfer_supervision_old.index(liste[i])]
                item['transfer_supervision'] = liste

                # Gestion du rgpd_feature
                rgpd_features = ["Suppression définitive des données","Limitation du droit d'accès aux données aux personnes légitimes","Gestion des exercices des droits des personnes concernées","Droit à l'information","Droit de retirer son consentement","Modification","Droit de portabilité","Droit de suppression","Droit d'accès","Droit de rectification","Droit d'opposition","Droit de copie","Droit d'effacement","Droit de limitation","Droit de donner des directives en cas de décès","Retrait du consentement","Droit à la portabilité","Anonymisation","Portabilité","Chiffrement","Opposition","Accès","Plainte","Limitation du traitement","Gestion de la preuve du consentement","La gestion automatique des désabonnements","La création et l'administration de listes noires","L'enregistrement des données liées à l'inscription et à la désinscription des contacts","Validation d'inscription par double opt-in","Exporter les données"]
                rgpd_features_old = ["suppression définitive des données","limitation du droit d'accès aux données aux personnes légitimes","gestion des exercices des droits des personnes concernées","droit à l'information","droit de retirer son consentement","modification","droit de portabilité","droit de suppression","droit d'accès","droit de rectification","droit d'opposition","droit de copie","droit d'effacement","droit de limitation","droit de donner des directives en cas de décès","retrait du consentement","droit à la portabilité","anonymisation","portabilité","chiffrement","opposition","accès","plainte","limitation du traitement","gestion de la preuve du consentement","La gestion automatique des désabonnements","La création et l'administration de listes noires","L'enregistrement des données liées à l'inscription et à la désinscription des contacts","Validation d'inscription par double opt-in","exporter les données"]
                liste = item["rgpd_feature"]
                liste = [x for x in liste if x not in ['n/a']]
                for i in range(len(liste)):
                    liste[i] = rgpd_features[rgpd_features_old.index(liste[i])]
                item['rgpd_feature'] = liste

                exported_data.append(item)

        # Sauvegarde dans un fichier JSON
        with open(self.output_file, "w", encoding="utf-8") as f:
            json.dump(exported_data, f, ensure_ascii=False, indent=2)

        logger.info(f"Export terminé : {len(exported_data)} éléments sauvegardés dans {self.output_file}")

    def show_notion_properties(self):
        """Affiche toutes les propriétés disponibles dans la base Notion"""
        props = self.get_notion_database_schema()
        print("\n=== PROPRIÉTÉS DISPONIBLES DANS NOTION ===\n")
        for i, (name, info) in enumerate(props.items(), 1):
            mapped = self.get_column_name(name)
            print(f"{i:2d}. {name} ({info['type']}) → {mapped}")
        print("\n=============================================")

def main():
    import sys
    syncer = NotionToJSON()

    if len(sys.argv) > 1 and sys.argv[1] == "--show-properties":
        syncer.show_notion_properties()
        return

    syncer.export_to_json()

if __name__ == "__main__":
    main()