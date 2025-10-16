import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { RichText as RickTextLexical } from "@payloadcms/richtext-lexical/react";
import React from "react";

export const RichText = ({ data }: { data: SerializedEditorState }) => {
	return <RickTextLexical data={data} />;
};
