import "dotenv/config";

import config from "@payload-config";
import { getPayload } from "payload";

import { seed as categories } from "./categories";
import { seed as accessors } from "./accessors";
import { seed as locations } from "./locations";
import { seed as transfers } from "./transfers";
import { seed as features } from "./features";
import { seed as tools } from "./tools";
import path from "path";
import fs from "fs";

const seedData = async () => {
    try {
        const payload = await getPayload({
            config,
        });

        const uploadDir = path.join(process.cwd(), 'media');

        await fs.rm(uploadDir, { recursive: true }, (err) => {
            if (err) {
                console.error(err.message);
                return;
            }
        })


        console.log("⚪️ Categories seed begin");
        await categories(payload);
        console.log("✅ Categories seed done");

        console.log("⚪️ Accessors seed begin");
        await accessors(payload);
        console.log("✅ Accessors seed done");

        console.log("⚪️ Locations seed begin");
        await locations(payload);
        console.log("✅ Locations seed done");

        console.log("⚪️ Transfers seed begin");
        await transfers(payload);
        console.log("✅ Transfers seed done");

        console.log("⚪️ Features seed begin");
        await features(payload);
        console.log("✅ Features seed done");

        console.log("⚪️ Tools seed begin");
        await tools(payload);
        console.log("✅ Tools seed done");
    } catch (e) {
        console.error(e);
    } finally {
        console.log("🌱 Seed completed");
        process.exit();
    }
};

await seedData();