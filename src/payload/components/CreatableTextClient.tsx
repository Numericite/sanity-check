"use client";

import { FieldLabel, Select, useField } from "@payloadcms/ui";

type CreatableTextClientProps = {
	path: string;
	label: string;
	options: { label: string; value: string }[];
	hasMany?: boolean;
};

export default function CreatableTextClient({
	path,
	label,
	options,
	hasMany = false,
}: CreatableTextClientProps) {
	const { value, setValue } = useField<string>({ path });

	const currentValue = options.find((option) => option.value === value);

	return (
		<div className="field-type">
			<FieldLabel htmlFor={path} path={path} label={label} />
			<Select
				options={options}
				isMulti={hasMany}
				isCreatable
				isClearable
				onChange={(option) => {
					if (!Array.isArray(option)) {
						setValue(option?.value || undefined);
					}
				}}
				value={currentValue}
			/>
		</div>
	);
}
