"use client";

import React, { useEffect, useState } from "react";
import { FcSurvey } from "react-icons/fc";
import { FaShippingFast, FaRunning } from "react-icons/fa";
import { LuClock1 } from "react-icons/lu";
import { MdOutlineReceiptLong } from "react-icons/md";
import { BiSolidError } from "react-icons/bi";
import {  useSearchParams } from "next/navigation";

export default function Page() {
const [supplierData, setSupplierData] = useState(null);
const [Flow , setFlow] = useState(null);
const searchParams = useSearchParams();
const supplier = searchParams.get("Supplier");

useEffect( () => {
  let file = "";
  let variant = " ";

  if (supplier === "Supplier A") {
    file = "/localOCPM/supplierA-localOCPM.json";
    variant="/variants/supplierA-variants.json";
  } else if (supplier === "Supplier B") {
    file = "/localOCPM/supplierB-localOCPM.json";
     variant="/variants/supplierB-variants.json";
  } else if (supplier === "Supplier C") {
    file = "/localOCPM/supplierC-localOCPM.json";
     variant="/variants/supplierC-variants.json";
  }

  if (file) {
    fetch(file)
      .then((res) => res.json())
      .then((data) => setSupplierData(data))
      .catch((err) => console.log(err));
  }

  if(variant){
    fetch(variant)
    .then((res)=> res.json())
    .then((data)=> setFlow(data))
    .catch((err)=> console.log(err))
  }
},[]);
useEffect(() => {
  console.log("supplier =", supplier);
  console.log("supplierData =", supplierData);
}, [supplierData]);

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
          {supplierData?.supplier} OCPM Dashboard
      </h1>

      <p style={{ color: "#94a3b8" }}>
        Multi-Tier Supply Chain Process Mining
      </p>

      {/* KPI CARDS */}

      <h2 style={{ marginTop: "40px" }}>
        {supplierData?.supplier} KPIs(Key Performance Indicator)
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
          value={supplierData?.totalOrders}
        />

        <Card
          title="Total Shipments"
          value={supplierData?.totalShipments}
        />

        <Card
          title="Total Invoices"
          value={supplierData?.totalInvoices}
        />

        <Card
          title="Delayed Shipments"
          value={supplierData?.delayedShipments}
        />

        <Card
          title="Pending Invoices"
          value={supplierData?.pendingInvoices}
        />

        <Card
          title="Avg Lead Time"
          value={supplierData?.avgLeadTime}
        />

        <Card
          title="Supplier Score"
          value={supplierData?.supplierScore}
        />


      </div>

  



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
        
          
            <div
            
              style={{
                background: "#7f1d1d",
                padding: "20px",
                borderRadius: "10px",
              }}
            >
              <h3>{supplierData?.supplier}</h3>

              <p>
                Delayed Shipments:
                {" "}
                {supplierData?.delayedShipments}
              </p>

              <p>
                Pending Invoices:
                {" "}
                {supplierData?.pendingInvoices}
              </p>
            </div>
          
        
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
          {Flow?.mostCommonVariant}
        </p>

        <h3
          style={{
            marginTop: "25px",
          }}
        >
          Variant Frequency
        </h3>

    
            <div
              
              style={{
                marginBottom: "20px",
              }}
            >
              <div>
                {Flow?.variants.path}
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
                      Flow?.variants.count *
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
                {Flow?.mostCommonCount}
              </small>
            </div>
       
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