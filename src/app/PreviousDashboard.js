//  ------------Previous Dashboard not in current use -------

"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [variants, setVariants] = useState(null);

  useEffect(() => {
    async function loadData() {
      const summaryData = await fetch(
        "/aggregated/global-summary.json"
      ).then((res) => res.json());

      const variantData = await fetch(
        "/aggregated/global-variants.json"
      ).then((res) => res.json());

      setSummary(summaryData);
      setVariants(variantData);
    }

    loadData();
  }, []);

  if (!summary || !variants) {
    return (
      <div
        style={{
          background: "#0f172a",
          color: "white",
          minHeight: "100vh",
          padding: "40px",
        }}
      >
        Loading Dashboard...
      </div>
    );
  }

  const kpis = summary.networkKPIs;

  return (
    <div
      style={{
  minHeight: "100vh",
  background:
    "linear-gradient(135deg,#020617,#0f172a,#111827)",
  color: "white",
  padding: "40px",
  fontFamily:
    "Inter, Segoe UI, Arial, sans-serif",
}}
    >
      <h1
        style={{
          fontSize: "40px",
          marginBottom: "10px",
        }}
      >
        Federated OCPM Dashboard
      </h1>

      <p style={{ color: "#94a3b8" }}>
        Multi-Tier Supply Chain Process Mining
      </p>

      {/* KPI CARDS */}

      <h2 style={{ marginTop: "40px" }}>
        Global KPIs(Key Performance Indicator)
      </h2>

      <div
        style={{
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(250px,1fr))",
  gap: "24px",
  marginTop: "24px",
}}
      >
        <Card
          title="Total Orders"
          value={kpis.totalOrders}
        />

        <Card
          title="Total Shipments"
          value={kpis.totalShipments}
        />

        <Card
          title="Total Invoices"
          value={kpis.totalInvoices}
        />

        <Card
          title="Delayed Shipments"
          value={kpis.delayedShipments}
        />

        <Card
          title="Pending Invoices"
          value={kpis.pendingInvoices}
        />

        <Card
          title="Avg Lead Time"
          value={kpis.averageLeadTime}
        />

        <Card
          title="Supplier Score"
          value={kpis.averageSupplierScore}
        />

        <Card
          title="Total Suppliers"
          value={summary.totalSuppliers}
        />
      </div>

      {/* RANKINGS */}

      <h2 style={{ marginTop: "50px" }}>
        Supplier Rankings
      </h2>

      <table
        style={{
          width: "100%",
          background: "#1e293b",
          marginTop: "20px",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th style={th}>Rank</th>
            <th style={th}>Supplier</th>
            <th style={th}>Score</th>
            <th style={th}>Lead Time</th>
          </tr>
        </thead>

        <tbody>
          {summary.supplierRankings.map(
            (supplier, index) => (
              <tr key={index}>
                <td style={td}>{index + 1}</td>
                <td style={td}>
                  {supplier.supplier}
                </td>
                <td style={td}>
                  {supplier.score}
                </td>
                <td style={td}>
                  {supplier.avgLeadTime}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      {/* BOTTLENECKS */}

      <h2 style={{ marginTop: "50px" }}>
        Bottleneck Detection
      </h2>

      <div
        style={{
          display: "grid",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        {summary.bottlenecks.map(
          (item, index) => (
            <div
              key={index}
              style={{
                background: "#7f1d1d",
                padding: "20px",
                borderRadius: "10px",
              }}
            >
              <h3>{item.supplier}</h3>

              <p>
                Delayed Shipments:
                {" "}
                {item.delayedShipments}
              </p>

              <p>
                Pending Invoices:
                {" "}
                {item.pendingInvoices}
              </p>
            </div>
          )
        )}
      </div>

      {/* PROCESS VARIANTS */}

      <h2 style={{ marginTop: "50px" }}>
        Process Variant Analysis
      </h2>
{/* adslkfja */}
      <div
        style={{
          background: "#1e293b",
          padding: "20px",
          borderRadius: "10px",
          marginTop: "20px",
        }}
      >
        <h3>
          Most Common Variant
        </h3>

        <p
          style={{
            color: "#38bdf8",
            wordBreak: "break-word",
          }}
        >
          {variants.mostCommonVariant}
        </p>

        <h3
          style={{
            marginTop: "25px",
          }}
        >
          Variant Frequency
        </h3>

        {variants.variantFrequency.map(
          (variant, index) => (
            <div
              key={index}
              style={{
                marginBottom: "20px",
              }}
            >
              <div>
                {variant.path}
              </div>

              <div
                style={{
                  background: "#334155",
                  height: "18px",
                  marginTop: "5px",
                  borderRadius: "6px",
                }}
              >
                <div
                  style={{
                    width:
                      variant.count *
                        20 +
                      "%",
                    height: "100%",
                    background:
                      "#06b6d4",
                    borderRadius:
                      "6px",
                  }}
                />
              </div>

              <small>
                Count:
                {" "}
                {variant.count}
              </small>
            </div>
          )
        )}
      </div>
{/* asdf */}
      {/* PROCESS FLOW */}

      <h2 style={{ marginTop: "50px" }}>
        Standard Supply Chain Flow
      </h2>

      <div
        style={{
          background: "#1e293b",
          padding: "30px",
          borderRadius: "10px",
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        <FlowBox text="Create PO" />
        <FlowArrow />
        <FlowBox text="Approve PO" />
        <FlowArrow />
        <FlowBox text="Dispatch Shipment" />
        <FlowArrow />
        <FlowBox text="Deliver Shipment" />
        <FlowArrow />
        <FlowBox text="Generate Invoice" />
      </div>

      {/* FEDERATED WORKFLOW */}

      <h2 style={{ marginTop: "50px" }}>
        Federated OCPM Architecture
      </h2>

      <div
        style={{
          background: "#1e293b",
          padding: "20px",
          borderRadius: "10px",
          lineHeight: 2,
        }}
      >
        Supplier A → Local OCPM → Federated Node

        <br />

        Supplier B → Local OCPM → Federated Node

        <br />

        Supplier C → Local OCPM → Federated Node

        <br />
        <br />

        Federated Nodes → Aggregator →
        Global Process Model
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div
      style={{
        background: "rgba(30,41,59,0.75)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.08)",
        padding: "24px",
        borderRadius: "18px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
      }}
    >
      <div
        style={{
          color: "#94a3b8",
          fontSize: "14px",
          fontWeight: "600",
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: "38px",
          fontWeight: "800",
          marginTop: "12px",
          color: "#38bdf8",
        }}
      >
        {value}
      </div>
    </div>
  );
}
function FlowBox({ text }) {
  return (
    <div
      style={{
        background:
          "linear-gradient(135deg,#0284c7,#06b6d4)",
        padding: "16px 24px",
        borderRadius: "14px",
        fontWeight: "700",
        boxShadow:
          "0 6px 16px rgba(6,182,212,.35)",
      }}
    >
      {text}
    </div>
  );
}

function FlowArrow() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        fontSize: "28px",
        fontWeight: "bold",
        color: "#38bdf8",
      }}
    >
      →
    </div>
  );
}

const th = {
  padding: "16px",
  background: "#1e293b",
  color: "#38bdf8",
  fontWeight: "700",
};
const td = {
  padding: "16px",
  textAlign: "center",
  borderBottom:
    "1px solid rgba(255,255,255,0.06)",
};