import { useState, useMemo } from "react";
import { useDebounce } from "~/hooks/use-debounce";

type Score = "A" | "B" | "C" | "D" | "E" | "F";
type ScoreItem = { score: Score; active: boolean };
type LocationItem = { id: number; name: string; active: boolean };
type CertificationItem = { id: number; name: string; active: boolean };

const initialScores: ScoreItem[] = [
	{ score: "A", active: false },
	{ score: "B", active: false },
	{ score: "C", active: false },
	{ score: "D", active: false },
	{ score: "E", active: false },
	{ score: "F", active: false },
];

const initialLocations: LocationItem[] = [
	{ id: 10, name: "🇫🇷 France", active: false },
	{ id: 3, name: "🇺🇸 États-Unis", active: false },
	{ id: 8, name: "🇩🇪 Allemagne", active: false },
	{ id: 5, name: "🇮🇪 Irlande", active: false },
];

const initialCertifications: CertificationItem[] = [
	{ id: 5, name: "SOC II", active: false },
	{ id: 19, name: "ISO 27001", active: false },
	{ id: 16, name: "SOC III", active: false },
	{ id: 8, name: "ISO 27001:2013 Certification", active: false },
];

export function useCategoryFilters() {
	const [search, setSearch] = useState("");
	const debouncedSearch = useDebounce(search);
	const [scores, setScores] = useState(initialScores);
	const [dpa, setDpa] = useState(false);
	const [locations, setLocations] = useState(initialLocations);
	const [certifications, setCertifications] = useState(initialCertifications);

	const handleScore = (index: number) =>
		setScores((prev) =>
			prev.map((s, i) => (i === index ? { ...s, active: !s.active } : s)),
		);

	const handleLocation = (index: number) =>
		setLocations((prev) =>
			prev.map((l, i) => (i === index ? { ...l, active: !l.active } : l)),
		);

	const handleCertification = (index: number) =>
		setCertifications((prev) =>
			prev.map((c, i) => (i === index ? { ...c, active: !c.active } : c)),
		);

	const filters = useMemo(() => {
		const activeScores = scores.filter((s) => s.active).map((s) => s.score);
		const scoreFilter = activeScores.length
			? [{ key: "privacy_score_saas", operation: "in", value: activeScores }]
			: [];

		const dpaFilter = dpa ? [{ key: "dpa_compliant", value: true }] : [];

		const activeLocations = locations.filter((l) => l.active).map((l) => l.id);
		const locationsFilter = activeLocations.length
			? activeLocations.map((loc) => ({
					key: "locations_enterprise.location",
					operation: "equals",
					value: loc,
				}))
			: [];

		const activeCertifications = certifications
			.filter((c) => c.active)
			.map((c) => c.id);
		const certificationsFilter = activeCertifications.length
			? activeCertifications.map((cert) => ({
					key: "certifications.certification",
					operation: "equals",
					value: cert,
				}))
			: [];

		return [
			{ key: "name", operation: "contains", value: debouncedSearch },
			...scoreFilter,
			...dpaFilter,
			...locationsFilter,
			...certificationsFilter,
		];
	}, [scores, dpa, locations, certifications, debouncedSearch]);

	return {
		search,
		setSearch,
		debouncedSearch,
		scores,
		dpa,
		locations,
		certifications,
		handleScore,
		handleLocation,
		handleCertification,
		setDpa,
		filters,
	};
}
