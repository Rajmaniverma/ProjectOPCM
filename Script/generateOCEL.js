import fs from "fs";
import { generateOCEL } from "../src/lib/ocelGenerator.js";

const suppliers = [
  "supplierA",
  "supplierB",
  "supplierC"
];

// Create output folder if not exists
if (!fs.existsSync("./public/ocel")) {
  fs.mkdirSync("./public/ocel", { recursive: true });
}

suppliers.forEach((supplier) => {
  try {
    const rawData = JSON.parse(
      fs.readFileSync(
        `./public/data/${supplier}.json`,
        "utf8"
      )
    );

    const ocelData = generateOCEL(rawData);

    fs.writeFileSync(
      `./public/ocel/${supplier}-ocel.json`,
      JSON.stringify(ocelData, null, 2)
    );

    console.log(`✅ ${supplier}-ocel.json generated`);
  } catch (error) {
    console.error(`❌ Error generating ${supplier}:`, error);
  }
});