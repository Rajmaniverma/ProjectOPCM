import fs from "fs";
import { analyzeOCEL } from "../src/lib/localOCPM.js";

const suppliers = [
  "supplierA",
  "supplierB",
  "supplierC"
];

// Create folder if it doesn't exist
if (!fs.existsSync("../public/localOCPM")) {
  fs.mkdirSync("../public/localOCPM", {
    recursive: true,
  });
}

suppliers.forEach((supplier) => {
  try {
    const ocelData = JSON.parse(
      fs.readFileSync(
        `../public/ocel/${supplier}-ocel.json`,
        "utf8"
      )
    );

    const summary = analyzeOCEL(ocelData);

    fs.writeFileSync(
      `../public/localOCPM/${supplier}-localOCPM.json`,
      JSON.stringify(summary, null, 2)
    );

    console.log(
      `✅ ${supplier}-localOCPM.json generated`
    );
  } catch (error) {
    console.error(
      `❌ Error processing ${supplier}:`,
      error
    );
  }
});