import type { Payload } from "payload";
import type { Location } from "../payload-types";

type LocationType = Omit<Location, "updatedAt" | "createdAt">;

const list: LocationType[] = [
	{ id: 1, name: "🇳🇿 Nouvelle-Zélande" },
	{ id: 2, name: "🇪🇸 Espagne" },
	{ id: 3, name: "🇺🇸 États-Unis" },
	{ id: 4, name: "🇪🇺 Filiale Européenne" },
	{ id: 5, name: "🇮🇪 Irlande" },
	{ id: 6, name: "🇪🇪 Estonie" },
	{ id: 7, name: "🇳🇴 Norvège" },
	{ id: 8, name: "🇩🇪 Allemagne" },
	{ id: 9, name: "🇲🇹 Malte" },
	{ id: 10, name: "🇫🇷 France" },
	{ id: 11, name: "🇨🇭 Suisse" },
	{ id: 12, name: "🇫🇮 Finlande" },
	{ id: 13, name: "🇵🇱 Pologne" },
	{ id: 14, name: "🇨🇿 République tchèque" },
	{ id: 15, name: "🇫🇷 Filiale Française" },
	{ id: 16, name: "🇳🇱 Pays-Bas" },
	{ id: 17, name: "🇩🇰 Danemark" },
	{ id: 18, name: "🇦🇺 Australie" },
	{ id: 19, name: "🇧🇪 Belgique" },
	{ id: 20, name: "🇪🇺 Europe" },
	{ id: 21, name: "🇨🇦 Canada" },
	{ id: 22, name: "🇱🇺 Luxembourg" },
	{ id: 23, name: "🇧🇬 Bulgarie" },
	{ id: 24, name: "🇮🇳 Inde" },
	{ id: 25, name: "🏳️ Au choix" },
];

export async function seed(payload: Payload) {
	for (const elt of list) {
		await payload.create({
			collection: "locations",
			data: elt,
		});
	}
}
