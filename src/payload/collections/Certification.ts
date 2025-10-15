import type { CollectionConfig } from "payload";

export const Certifications: CollectionConfig = {
    slug: "certifications",
    versions: {
        drafts: false,
    },
    admin: {
        useAsTitle: 'name',
    },
    fields: [
        {
            name: 'name',
            type: "text",
            label: "Nom de la certification",
            required: true
        },
        {
            name: 'tools',
            type: 'relationship',
            relationTo: 'tools',
            hasMany: true,
        },
    ],
};
