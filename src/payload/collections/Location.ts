import type { CollectionConfig } from "payload";

export const Locations: CollectionConfig = {
    slug: "locations",
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
            label: "Nom de la localisation",
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
