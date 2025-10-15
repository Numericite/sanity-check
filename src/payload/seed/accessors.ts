
import type { Payload } from "payload";
import type { Accessor } from "../payload-types";

type AccessorType = Omit<Accessor, 'updatedAt' | 'createdAt'>;

const list: AccessorType[] = [
    {
        "id": 1,
        "name": "La personne qui utilise l'outil",
    },
    {
        "id": 2,
        "name": "Responsable du traitement",
    },
    {
        "id": 3,
        "name": "Employés",
    },
    {
        "id": 4,
        "name": "Partenaires",
    },
    {
        "id": 5,
        "name": "Sous-traitant ultérieur",
    },
    {
        "id": 6,
        "name": "Filiales",
    },
];

export async function seed(payload: Payload) {
    for (const elt of list) {
        await payload.create({
            collection: "accessors",
            data: elt,
        });
    }
}