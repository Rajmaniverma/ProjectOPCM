import fs from "fs";
import { aggregateNodes } from "../src/lib/aggregator.js";

const suppliers = [
  "supplierA",
  "supplierB",
  "supplierC",
];

const nodes = [];

try {
  suppliers.forEach((supplier) => {
    const filePath = `./public/federated/${supplier}-node.json`;

    const nodeData = JSON.parse(
      fs.readFileSync(filePath, "utf8")
    );

    nodes.push(nodeData);
  });

  const globalSummary = aggregateNodes(nodes);

  // Create aggregated folder if it doesn't exist
  if (!fs.existsSync("./public/aggregated")) {
    fs.mkdirSync("./public/aggregated", {
      recursive: true,
    });
  }

  fs.writeFileSync(
    "./public/aggregated/global-summary.json",
    JSON.stringify(globalSummary, null, 2)
  );

  console.log(
    "✅ global-summary.json generated successfully"
  );

} catch (error) {
  console.error(
    "❌ Error generating aggregation:",
    error
  );
}