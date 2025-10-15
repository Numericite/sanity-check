import type { Payload } from "payload";
import type { Transfer } from "../payload-types";

type TransferType = Omit<Transfer, 'updatedAt' | 'createdAt'>;

const list: TransferType[] = [
    {
        "id": 1,
        "name": "Clauses contractuelles type",
    },
    {
        "id": 2,
        "name": "Décisions d'adéquation",
    },
    {
        "id": 3,
        "name": "DPA",
    },
    {
        "id": 4,
        "name": "Standards du secteur commercial",
    },
    {
        "id": 5,
        "name": "BCR",
    },
    {
        "id": 6,
        "name": "Méthodes de chiffrement sécurisé",
    },
    {
        "id": 7,
        "name": "Filiale localisée EU",
    },
    {
        "id": 8,
        "name": "Data Transfer Assessment",
    },
];

export async function seed(payload: Payload) {
    for (const elt of list) {
        await payload.create({
            collection: "transfers",
            data: elt,
        });
    }
}