import fs from "fs";
import { generateProcessFlow }
from "../src/lib/processFlow.js";

const suppliers = [
  "supplierA",
  "supplierB",
  "supplierC"
];

if (!fs.existsSync("../public/process")) {
  fs.mkdirSync("./public/process", {
    recursive: true
  });
}

suppliers.forEach((supplier) => {
  const ocel = JSON.parse(
    fs.readFileSync(
      `../public/ocel/${supplier}-ocel.json`,
      "utf8"
    )
  );

  const processFlow =
    generateProcessFlow(ocel);

  fs.writeFileSync(
    `../public/process/${supplier}-process.json`,
    JSON.stringify(
      processFlow,
      null,
      2
    )
  );

  console.log(
    `✅ ${supplier}-process.json generated`
  );
});