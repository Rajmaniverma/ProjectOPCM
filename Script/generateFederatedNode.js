import fs from "fs";
import { createFederatedNode } from "../src/lib/federatedNode.js";

const suppliers = [
  "supplierA",
  "supplierB",
  "supplierC",
];

// Create folder
if (!fs.existsSync("./public/federated")) {
  fs.mkdirSync("./public/federated", {
    recursive: true,
  });
}

suppliers.forEach((supplier) => {
  try {
    const localData = JSON.parse(
      fs.readFileSync(
        `./public/localOCPM/${supplier}-localOCPM.json`,
        "utf8"
      )
    );

    const federatedData =
      createFederatedNode(localData);

    fs.writeFileSync(
      `./public/federated/${supplier}-node.json`,
      JSON.stringify(federatedData, null, 2)
    );

    console.log(
      `✅ ${supplier}-node.json generated`
    );
  } catch (error) {
    console.error(
      `❌ Error generating ${supplier} node`,
      error
    );
  }
});