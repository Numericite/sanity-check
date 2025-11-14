import type { Category, Tool } from "~/payload/payload-types";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

export type ToolRichType = Omit<
	Tool,
	"location_note" | "actions" | "category"
> & {
	location_note: SerializedEditorState;
	actions: SerializedEditorState;
	category: Category | null;
};
