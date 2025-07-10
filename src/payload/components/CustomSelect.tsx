import type { TextFieldServerComponent } from "payload";
import type React from "react";
import CreatableTextClient from "./CreatableTextClient";
import type { Tool } from "../payload-types";

export const CustomSelectFieldServer: TextFieldServerComponent = async (
	props,
) => {
	const { path, payload, data } = props;

	const tmpPath = path as keyof Tool;

	const versions = await payload.findVersions({
		collection: "tools",
		select: {
			version: {
				[tmpPath]: true,
			},
		},
	});

	const uniqueValues = Array.from(
		new Set(versions.docs.map((version) => (version.version as Tool)[tmpPath])),
	) as string[];

	const options = uniqueValues.map((val) => ({
		label: val,
		value: val,
	}));

	return (
		<CreatableTextClient
			path={path}
			label="Sélectionner une valeur"
			options={options}
		/>
	);
};
