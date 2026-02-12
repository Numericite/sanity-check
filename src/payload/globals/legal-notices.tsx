import { lexicalEditor } from "@payloadcms/richtext-lexical";
import type { GlobalConfig } from "payload";

export const LegalNotices: GlobalConfig = {
    slug: 'legal-notices',
    label: "Mentions légales",
    fields: [
        {
            name: "content",
            type: "richText",
            label: "Contenu des mentions légales",
            editor: lexicalEditor({
                features: ({ defaultFeatures }) => [...defaultFeatures],
            }),
        },
    ]
}