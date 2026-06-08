import fs from "fs";

import { analyzeVariants }
from "../src/lib/variantAnalysis.js";

const suppliers = [
  "supplierA",
  "supplierB",
  "supplierC"
];

if (!fs.existsSync("./public/variants")) {
  fs.mkdirSync(
    "./public/variants",
    { recursive: true }
  );
}

suppliers.forEach((supplier) => {

  const processData = JSON.parse(
    fs.readFileSync(
      `./public/process/${supplier}-process.json`,
      "utf8"
    )
  );

  const variantData =
    analyzeVariants(processData);

  fs.writeFileSync(
    `./public/variants/${supplier}-variants.json`,
    JSON.stringify(
      variantData,
      null,
      2
    )
  );

  console.log(
    `✅ ${supplier}-variants.json generated`
  );
});