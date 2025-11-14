import fs from "node:fs";
import path from "node:path";
import type { Payload } from "payload";
import list from "./../../../scripts/tools.json";

export async function seed(payload: Payload) {
	const categories = await payload.find({
		collection: "categories",
		limit: 0,
	});

	const categoryMap: Record<string, number> = {};
	for (const cat of categories.docs) {
		categoryMap[cat.name] = cat.id;
	}

	const accessors = await payload.find({
		collection: "accessors",
		limit: 0,
	});

	const accessorMap: Record<string, number> = {};
	for (const acc of accessors.docs) {
		accessorMap[acc.name] = acc.id;
	}

	const certificationMap: Record<string, number> = {};

	const locations = await payload.find({
		collection: "locations",
		limit: 0,
	});

	const locationMap: Record<string, number> = {};
	for (const loc of locations.docs) {
		locationMap[loc.name] = loc.id;
	}

	const transfers = await payload.find({
		collection: "transfers",
		limit: 0,
	});

	const transferMap: Record<string, number> = {};
	for (const tra of transfers.docs) {
		transferMap[tra.name] = tra.id;
	}

	const features = await payload.find({
		collection: "features",
		limit: 0,
	});

	const featureMap: Record<string, number> = {};
	for (const fea of features.docs) {
		featureMap[fea.name] = fea.id;
	}

	const logosDir = path.resolve(process.cwd(), "scripts", "logos");
	let i = 1;

	for (const tool of list) {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const toolData: any = { ...tool };

		if (tool.enterprise_location?.length) {
			toolData.certifications = [];
			tool.enterprise_certifications.map(async (c) => {
				let certId = null;
				if (certificationMap[c]) {
					certId = certificationMap[c];
				} else {
					const certification = await payload.create({
						collection: "certifications",
						data: { name: c },
					});
					certificationMap[certification.name] = certification.id;
					certId = certification.id;
				}

				toolData.certifications.push({ certification: certId });
			});
		}

		if (tool.subcontractors_certifications?.length) {
			toolData.certifications_subcontractors = [];
			tool.subcontractors_certifications.map(async (c) => {
				let certId = null;
				if (certificationMap[c]) {
					certId = certificationMap[c];
				} else {
					const certification = await payload.create({
						collection: "certifications",
						data: { name: c },
					});
					certificationMap[certification.name] = certification.id;
					certId = certification.id;
				}

				toolData.certifications_subcontractors.push({ certification: certId });
			});
		}

		if (tool.categories?.length) {
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			toolData.categories = tool.categories.map((c: any) => ({
				category: categoryMap[c.category],
				main: c.main ?? false,
			}));
		}

		if (tool.data_access?.length) {
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			toolData.accessors = tool.data_access.map((a: any) => ({
				accessor: accessorMap[a],
			}));
		}

		if (tool.enterprise_location?.length) {
			toolData.locations_enterprise = tool.enterprise_location.map(
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				(l: any) => ({
					location: locationMap[l],
				}),
			);
		}

		if (tool.locations_data?.length) {
			toolData.locations_data = tool.locations_data.map(
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				(l: any) => ({
					location: locationMap[l],
				}),
			);
		}

		if (tool.transfer_supervision?.length) {
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			toolData.transfers = tool.transfer_supervision.map((t: any) => ({
				transfer: transferMap[t],
			}));
		}
		if (tool.rgpd_feature?.length) {
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			toolData.features = tool.rgpd_feature.map((f: any) => ({
				feature: featureMap[f],
			}));
		}

		const logoFilePath = path.join(logosDir, `${i}.webp`);

		if (logoFilePath) {
			try {
				const fileBuffer = fs.readFileSync(logoFilePath);

				const file = {
					data: fileBuffer,
					name: `${i}.webp`,
					mimetype: "image/webp",
					size: fileBuffer.length,
				};

				const uploadResult = await payload.create({
					collection: "media",
					file,
					data: {
						alt: tool.name,
					},
				});

				toolData.logo = uploadResult.id;
			} catch (err) {
				console.error(`❌ Échec de l’upload du logo pour ${tool.name}:`, err);
			}
		} else {
			console.warn(`⚠️ Aucun logo trouvé pour ${tool}`);
		}

		i++;

		try {
			await payload.create({
				collection: "tools",
				data: toolData,
			});
		} catch (err) {
			console.log(toolData);
			console.error("Failed to create tool:", tool.name, err);
		}
	}
}
