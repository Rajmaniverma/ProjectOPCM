import fs from "fs";

import { aggregateVariants }
from "../src/lib/aggregateVariants.js";

const suppliers = [
  "supplierA",
  "supplierB",
  "supplierC"
];

const variantFiles = [];

try {

  suppliers.forEach((supplier) => {

    const data = JSON.parse(
      fs.readFileSync(
        `./public/variants/${supplier}-variants.json`,
        "utf8"
      )
    );

    variantFiles.push(data);
  });

  const aggregatedVariants =
    aggregateVariants(
      variantFiles
    );

  if (
    !fs.existsSync(
      "./public/aggregated"
    )
  ) {
    fs.mkdirSync(
      "./public/aggregated",
      { recursive: true }
    );
  }

  fs.writeFileSync(
    "./public/aggregated/global-variants.json",
    JSON.stringify(
      aggregatedVariants,
      null,
      2
    )
  );

  console.log(
    "✅ global-variants.json generated"
  );

} catch (error) {

  console.error(
    "❌ Error generating global variants:",
    error
  );
}