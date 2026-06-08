<<<<<<< HEAD
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
=======
# Federated OCPM for Multi-Tier Supply Chains

## Overview

This project is a Proof of Concept (PoC) for **Federated Object-Centric Process Mining (OCPM)** in multi-tier supply chains.

Traditional process mining requires organizations to share complete event logs with a central platform. This approach creates privacy, confidentiality, and regulatory challenges. Our solution enables suppliers to keep their raw process data locally while sharing only aggregated process insights.

The system combines:

* Object-Centric Process Mining (OCPM)
* OCEL 2.0 Event Logs
* Federated Analytics
* Supply Chain KPI Monitoring
* Process Variant Analysis

The final result is a unified supply chain view without exposing supplier-sensitive data.

---

## Problem Statement

Modern supply chains involve multiple interconnected business objects:

* Purchase Orders
* Shipments
* Invoices
* Products
* Suppliers

Traditional process mining assumes a single case identifier and struggles to capture these complex relationships.

At the same time, suppliers are often unwilling or unable to share raw ERP data due to:

* Data privacy regulations
* Business confidentiality
* Data sovereignty requirements
* Competitive sensitivity

This project addresses both challenges by combining OCPM with a federated architecture.

---

## Solution Architecture

Supplier A ERP
↓
OCEL 2.0 Generator
↓
Local OCPM
↓
Federated Node A

Supplier B ERP
↓
OCEL 2.0 Generator
↓
Local OCPM
↓
Federated Node B

Supplier C ERP
↓
OCEL 2.0 Generator
↓
Local OCPM
↓
Federated Node C

Federated Nodes
↓
Central Aggregation Server
↓
Global KPI Engine
↓
Federated OCPM Dashboard

---

## Key Features

### OCEL 2.0 Generation

Converts supplier ERP data into Object-Centric Event Logs.

Generated Files:

* supplierA-ocel.json
* supplierB-ocel.json
* supplierC-ocel.json

---

### Local OCPM

Performs process mining locally at each supplier.

Calculated Metrics:

* Total Orders
* Total Shipments
* Total Invoices
* Delayed Shipments
* Pending Invoices
* Average Lead Time
* Supplier Performance Score

Generated Files:

* supplierA-localOCPM.json
* supplierB-localOCPM.json
* supplierC-localOCPM.json

---

### Federated Nodes

Each supplier becomes an independent federated participant.

Responsibilities:

* Maintain local data ownership
* Execute local process mining
* Share only aggregated KPIs
* Preserve privacy

Generated Files:

* supplierA-node.json
* supplierB-node.json
* supplierC-node.json

---

### Process Discovery

Discovers actual process flows from OCEL event logs.

Example Process:

Create Purchase Order
→ Approve Purchase Order
→ Dispatch Shipment
→ Deliver Shipment
→ Generate Invoice

Generated Files:

* supplierA-process.json
* supplierB-process.json
* supplierC-process.json

---

### Process Variant Analysis

Identifies different execution paths across supply chain processes.

Example:

Variant 1:
Create → Approve → Dispatch → Deliver → Invoice

Variant 2:
Create → Approve → Dispatch → Invoice

Generated Files:

* supplierA-variants.json
* supplierB-variants.json
* supplierC-variants.json

---

### Federated Aggregation

Combines supplier insights without accessing raw event data.

Generated Files:

* global-summary.json
* global-variants.json

---

## Dashboard Features

### Global KPIs

* Total Orders
* Total Shipments
* Total Invoices
* Delayed Shipments
* Pending Invoices
* Average Lead Time
* Average Supplier Score
* Total Suppliers

### Supplier Rankings

Ranks suppliers based on performance score.

### Bottleneck Detection

Identifies:

* Delayed shipments
* Pending invoices
* Underperforming suppliers

### Process Flow Visualization

Displays end-to-end process execution.

### Variant Analysis

Shows:

* Most common process variant
* Variant frequencies
* Process deviations

### Federated Architecture View

Visualizes supplier nodes and aggregation flow.

---

## Technology Stack

### Frontend

* Next.js
* React.js

### Data Format

* JSON
* OCEL 2.0

### Process Mining

* Object-Centric Process Mining (OCPM)

### Architecture

* Federated Analytics
* Distributed Processing

---

## Project Structure

public/

├── aggregated/

│ ├── global-summary.json

│ └── global-variants.json

├── data/

│ ├── supplierA.json

│ ├── supplierB.json

│ └── supplierC.json

├── federated/

│ ├── supplierA-node.json

│ ├── supplierB-node.json

│ └── supplierC-node.json

├── localOCPM/

│ ├── supplierA-localOCPM.json

│ ├── supplierB-localOCPM.json

│ └── supplierC-localOCPM.json

├── ocel/

│ ├── supplierA-ocel.json

│ ├── supplierB-ocel.json

│ └── supplierC-ocel.json

├── process/

│ ├── supplierA-process.json

│ ├── supplierB-process.json

│ └── supplierC-process.json

└── variants/

├── supplierA-variants.json

├── supplierB-variants.json

└── supplierC-variants.json

---

## How to Run

Install dependencies:

npm install

Run development server:

npm run dev

Open:

http://localhost:3000

---

## Future Improvements

* Real OCEL 2.0 compliance validation
* Integration with Celonis EMS APIs
* Interactive process graphs
* Conformance checking
* Federated machine learning models
* Real ERP integrations
* Live event streaming
* Predictive bottleneck detection

---

## Conclusion

This project demonstrates how Federated OCPM can provide end-to-end visibility across multi-tier supply chains while preserving supplier privacy. By combining OCEL 2.0, local process mining, federated nodes, and centralized aggregation, organizations can discover bottlenecks, monitor KPIs, analyze process variants, and improve operational efficiency without sharing raw process data.
>>>>>>> 21bcf7029d8c29e72813b933598396eead96f8b3
