import type { Payload } from "payload";
import type { Feature } from "../payload-types";

type FeatureType = Omit<Feature, 'updatedAt' | 'createdAt'>;

const list: FeatureType[] = [
    {
        "id": 1,
        "name": "Suppression définitive des données"
    },
    {
        "id": 2,
        "name": "Limitation du droit d'accès aux données aux personnes légitimes"
    },
    {
        "id": 3,
        "name": "Gestion des exercices des droits des personnes concernées"
    },
    {
        "id": 4,
        "name": "Droit à l'information"
    },
    {
        "id": 5,
        "name": "Droit de retirer son consentement"
    },
    {
        "id": 6,
        "name": "Modification"
    },
    {
        "id": 7,
        "name": "Droit de portabilité"
    },
    {
        "id": 8,
        "name": "Droit de suppression"
    },
    {
        "id": 9,
        "name": "Droit d'accès"
    },
    {
        "id": 10,
        "name": "Droit de rectification"
    },
    {
        "id": 11,
        "name": "Droit d'opposition"
    },
    {
        "id": 12,
        "name": "Droit de copie"
    },
    {
        "id": 13,
        "name": "Droit d'effacement"
    },
    {
        "id": 14,
        "name": "Droit de limitation"
    },
    {
        "id": 15,
        "name": "Droit de donner des directives en cas de décès"
    },
    {
        "id": 16,
        "name": "Retrait du consentement"
    },
    {
        "id": 17,
        "name": "Droit à la portabilité"
    },
    {
        "id": 18,
        "name": "Anonymisation"
    },
    {
        "id": 19,
        "name": "Portabilité"
    },
    {
        "id": 20,
        "name": "Chiffrement"
    },
    {
        "id": 21,
        "name": "Opposition"
    },
    {
        "id": 22,
        "name": "Accès"
    },
    {
        "id": 23,
        "name": "Plainte"
    },
    {
        "id": 24,
        "name": "Limitation du traitement"
    },
    {
        "id": 25,
        "name": "Gestion de la preuve du consentement"
    },
    {
        "id": 26,
        "name": "La gestion automatique des désabonnements"
    },
    {
        "id": 27,
        "name": "La création et l'administration de listes noires"
    },
    {
        "id": 28,
        "name": "L'enregistrement des données liées à l'inscription et à la désinscription des contacts"
    },
    {
        "id": 29,
        "name": "Validation d'inscription par double opt-in"
    },
    {
        "id": 30,
        "name": "Exporter les données"
    },
];

export async function seed(payload: Payload) {
    for (const elt of list) {
        await payload.create({
            collection: "features",
            data: elt,
        });
    }
}