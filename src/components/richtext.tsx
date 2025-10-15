import React from "react";
import { RichText as RickTextLexical } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

export const RichText = ({ data }: { data: SerializedEditorState }) => {
  return <RickTextLexical data={data} />;
};
