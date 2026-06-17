"use client";

import React, { useEffect, useState } from "react";
import { FcSurvey  } from "react-icons/fc";
import { FaShippingFast } from "react-icons/fa";
import { LuClock1 } from "react-icons/lu";
import { FaRunning } from "react-icons/fa";
import { RiShoppingBag4Line } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";
import { GiArcheryTarget } from "react-icons/gi";
import { BiSolidError } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { FaExclamationTriangle } from "react-icons/fa";


const Page = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [aggregate , setAggregate] = useState(null);
  const [variant , setVariant] = useState(null);
  
const router = useRouter();

  

  const supplierOCPM = [
    "/localOCPM/supplierA-localOCPM.json",
    "/localOCPM/supplierB-localOCPM.json",
    "/localOCPM/supplierC-localOCPM.json",
  ];
const [summary, setSummary] = useState(null);

useEffect(() => {
  fetch("/aggregated/global-summary.json")
    .then((res) => res.json())
    .then((data) => setSummary(data))
    .catch((err) => console.log(err));
}, []);
  useEffect(() => {
    Promise.all(
      supplierOCPM.map((file) =>
        fetch(file).then((res) => res.json())
      )
    )
      .then((data) => {
        setSuppliers(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
useEffect(() => {
  fetch("/aggregated/global-summary.json")
    .then((res) => res.json())
    .then((data) => setAggregate(data))
    .catch((err) => console.log(err));
}, []);
useEffect(()=>{
  fetch("/aggregated/global-variants.json")
  .then((res)=> res.json())
  .then((data) => setVariant(data))
},[])
const SupplierDashboardA = (data)=>{
  
  router.push(`/Supplier?Supplier=${encodeURIComponent(data)}`
);
}
  return (
    <div className="flex flex-col">
      <div className="bg-white/10   shadow-2xs shadow-blue-200 w-full h-20 text-2xl p-3 text-blue-900 font-semibold ">
        Dashboard Overview
      </div>
 
      <div className="w-full p-2 flex gap-x-2">
        {/* ---------------- supplier cards ------------------- */}
        <div className="flex flex-2 flex-col text-gray-800 font-semibold bg-gray-100 outline-1 outline-blue-400 rounded-xl max-w-5xl p-2">
          <h1 className="text-xl">SUPPLIER MANAGMENT</h1>

          <div className="grid grid-cols-3  w-full gap-x-2 p-2">
            {suppliers.map((supplier, index) => (
              <div
                key={index}
                className="bg-white/10 shadow-[2px_5px_10px_0px_#3b82f6] outline-1 outline-blue-300 p-2 rounded h-70 gap-y-2 "
              >
                {/* --------total supplier */}
                <div className="flex w-full justify-between mb-2"><h2>{supplier.supplier}</h2>
                <h2 className="text-green-400">🟢 Active</h2>
                </div>
                {/* --------total order ---------- */}
                <div className="p-1 ">
                   <p className="flex justify-between">
                    <p className="text-blue-500 flex items-baseline gap-x-0.5"> <p><FcSurvey /></p> <span className="text-gray-800">Order</span></p>
                    <p className="text-black font-semibold"> {supplier.totalOrders}</p>
                   </p>
                </div>
                {/* -----------total shipment------------- */}
                <div className="p-1 ">
                   <div className="flex justify-between">
                    <p className="text-blue-500 flex items-baseline gap-x-0.5"> <p><FaShippingFast /></p> <span className="text-gray-800">Total shipment</span></p>
                    <p className="text-black font-semibold"> {supplier.totalShipments}</p>
                   </div>
                </div>
                {/* ---------averge lead time */}
                                <div className="p-1 ">
                   <div className="flex justify-between">
                    <p className="text-blue-500 flex items-baseline gap-x-0.5"> <p><LuClock1 /></p> <span className="text-gray-800">avgLeadTime</span></p>
                    <p className="text-black font-semibold"> {supplier.avgLeadTime}  days</p>
                   </div>
                </div>
                {/*------------supplier Score------------ */}
                <div className="p-1 ">
                   <p className="flex justify-between">
                    <p className="text-blue-500 flex items-baseline gap-x-0.5"> <p><FaRunning /></p> <span className="text-gray-800">supplierScore</span></p>
                    <p className="text-black font-semibold"> {supplier.supplierScore}</p>
                   </p>
                </div>
                {/*  -------view details button ------------ */}
                <button className="w-full p-2 h-10 bg-sky-100 text-blue-600 rounded-xl outline-1 outline-sky-400 hover:scale-105 active:scale-95 cursor-pointer duration-600" onClick={() =>SupplierDashboardA(supplier.supplier)}>
                  view details

                </button>
                

      
               
              </div>
            ))}
          </div>
          
        </div>
        {/* -------- supplier-card end --------- */}
        {/* ---------Aggregator overview */}
        <div className="text-black flex-1 p-2 bg-gray-50 outline-1 outline-blue-400 rounded-xl">
          <div>
            {/* aggregator overview */}
            <div className="flex flex-col">
              <h1 className="font-semibold text-gray-900">AGGREGATOR OVERVIEW</h1>
              <h5 className="text-gray-700 text-[16px]">Global process insight from all supplier</h5></div>
              {/* ------global-summary-cards---  */}
              <div className="w-full  ">
               {aggregate && (
                
  <div className="grid grid-cols-2 gap-2">
    {/* -------- Total Orders ---------- */}
        <div className="bg-white outline-1 outline-blue-400 p-3 rounded-lg shadow flex items-center">
          <div className="bg-purple-100 text-purple-300 text-5xl rounded-full p-2"><RiShoppingBag4Line /></div>
        <div className=" text-[18px] mx-1 font-bold opacity-80"><h2 className="mb-2">Total Orders</h2>
      <p className="mx-2">{aggregate.networkKPIs.totalOrders}</p></div>
      
    </div>
    {/* ---------total supplier ---------- */}
        <div className="bg-white outline-1 outline-blue-400 p-3 rounded-lg shadow flex items-center">
          <div className="bg-blue-100 text-blue-300 text-5xl rounded-full p-2"><TbTruckDelivery /></div>
        <div className=" text-[18px] mx-1 font-bold opacity-80"><h2 className="mb-2">Total Supplier</h2>
      <p className="mx-2">{aggregate.totalSuppliers}</p></div>
      
    </div>

   {/* -----------Average Lead time --------- */}
            <div className="bg-white outline-1 outline-blue-400 p-3 rounded-lg shadow flex items-center">
          <div className="bg-green-100 text-green-300 text-5xl rounded-full p-2"><LuClock1 /></div>
        <div className=" text-[17.5px] mx-1 font-bold opacity-80"><h2 className="mb-2">Avg. LeadTime</h2>
      <p className="mx-2">{aggregate.networkKPIs.averageLeadTime}</p></div>
      
    </div>
   {/* -------Avg supplier score */}
    <div className="bg-white outline-1 outline-blue-400 p-3 rounded-lg shadow flex items-center">
       <div className="bg-orange-100 text-orange-300 text-5xl rounded-full p-2"><GiArcheryTarget /></div>
               <div className=" text-[17.5px] mx-1 font-bold opacity-80"><h2 className="mb-2">Avg. score</h2>
      <p className="mx-2">{aggregate.networkKPIs.averageSupplierScore}</p></div>   </div>
    {/* -------delay shipment -------- */}
     <div className="bg-white outline-1 outline-blue-400 p-3 rounded-lg shadow flex items-center">
      <div className="bg-red-100 text-red-500 text-5xl rounded-full p-2"><BiSolidError /></div>
        <div className=" text-[17px] mx-1 font-bold opacity-80"><h2 className="mb-2">delayed Shipments</h2>
      <p className="mx-2">{aggregate.networkKPIs.delayedShipments}</p></div>
            </div></div>)}</div></div></div></div>
              {/* --------------Global Kpi --------------- */}
   <div className="w-full p-2 flex gap-x-2">
    <div className="flex flex-2 flex-col text-gray-800 font-semibold bg-gray-100 outline-1 outline-blue-400 rounded-xl max-w-5xl p-2">
        <h1 className="text-xl">Global KPI( Key Performance Indicator)</h1>
         <div className="w-full">
          {aggregate && (
            
             <div className="grid grid-cols-5 gap-y-3 w-full gap-x-2 p-2">
              {/* -------------Total order---------------- */}
              <div className="bg-white outline-1 outline-blue-400 p-3 rounded-lg shadow flex items-center">
      <div className=" text-[17px] mx-1 font-bold "><h5 className="mb-2">Total Order</h5>
      <p className="mx-2 text-3xl">{aggregate.networkKPIs.totalOrders}</p></div></div>
     {/* ------------Total shipment --------------- */}
    <div className="bg-white outline-1 outline-blue-400 p-3 rounded-lg shadow flex items-center">
      <div className=" text-[17px] mx-1 font-bold "><h5 className="mb-2">Total Shipment</h5>
      <p className="mx-2 text-3xl">{aggregate.networkKPIs.totalShipments}</p></div></div>
      {/* -------------Total Invoices ------------ */}
          <div className="bg-white outline-1 outline-blue-400 p-3 rounded-lg shadow flex items-center">
      <div className=" text-[17px] mx-1 font-bold "><h5 className="mb-2">Total Invoices</h5>
      <p className="mx-2 text-3xl">{aggregate.networkKPIs.totalInvoices}</p></div></div>
      {/* -------------Delay Shipment ----------- */}
                <div className="bg-white outline-1 outline-red-400 p-3 rounded-lg shadow flex items-center">
      <div className=" text-[17px] mx-1 font-bold "><h5 className="mb-2">Delayed Shipments</h5>
      <p className="mx-2 text-3xl">{aggregate.networkKPIs.delayedShipments}</p></div></div>
      {/* --------pending Invoices ---------- */}
      <div className="bg-white outline-1 outline-red-400 p-3 rounded-lg shadow flex items-center">
      <div className=" text-[17px] mx-1 font-bold "><h5 className="mb-2">Pending Invioce</h5>
      <p className="mx-2 text-3xl">{aggregate.networkKPIs.pendingInvoices}</p></div></div>
      {/* --------Average Lead Time --------- */}
           <div className="bg-white outline-1 outline-red-400 p-3 rounded-lg shadow flex items-center">
      <div className=" text-[17px] mx-1 font-bold "><h5 className="mb-2">Avg. Lead time</h5>
      <p className="mx-2 text-3xl">{aggregate.networkKPIs.averageLeadTime}</p></div></div>
      {/* -------supplier score ----------- */}
           <div className="bg-white outline-1 outline-red-400 p-3 rounded-lg shadow flex items-center">
      <div className=" text-[17px] mx-1 font-bold "><h5 className="mb-2">Avg. Supplier Score</h5>
      <p className="mx-2 text-3xl">{aggregate.networkKPIs.averageSupplierScore}</p></div></div>
      {/* --------Total supplier -------- */}
              <div className="bg-white outline-1 outline-red-400 p-3 rounded-lg shadow flex items-center">
      <div className=" text-[17px] mx-1 font-bold "><h5 className="mb-2">Total supplier</h5>
      <p className="mx-2 text-3xl">{aggregate.totalSuppliers}</p></div></div>

      </div>
          )}
          {/* ----Bottle neck detection start----------- */}
          <div className="mt-8">
  <h2 className="text-xl font-bold text-gray-800 mb-4">
    🚨 Bottleneck Detection
  </h2>

  <div className="grid gap-2">
    {summary?.bottlenecks?.map((item, index) => (
      <div
        key={index}
        className="bg-gradient-to-r from-red-50 to-red-100 border border-red-300 rounded-xl p-2 shadow-md hover:shadow-xl transition-all duration-300"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <div className="bg-red-200 p-3 rounded-full text-red-700 text-2xl">
              <BiSolidError />
            </div>

            <div>
              <h3 className="text-xl font-bold text-red-900">
                {item.supplier}
              </h3>

              <p className="text-red-600 text-sm">
                Bottleneck Detected
              </p>
            </div>
          </div>

          <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            High Risk
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white rounded-lg p-2 shadow-sm">
            <p className="text-gray-500 text-sm">
              Delayed Shipments
            </p>

            <p className="text-3xl font-bold text-red-600">
              {item.delayedShipments}
            </p>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-gray-500 text-sm">
              Pending Invoices
            </p>

            <p className="text-3xl font-bold text-orange-500">
              {item.pendingInvoices}
            </p>
          </div>
        </div>

        {/* Alert Message */}
        <div className="mt-4 bg-red-200/50 border border-red-300 rounded-lg p-2 flex items-center gap-2">
          <FaExclamationTriangle className="text-red-600" />

          <span className="text-red-800 text-sm font-medium">
            This supplier is causing delays in the supply chain process.
          </span>
        </div>
      </div>
    ))}
  </div>
</div>
          {/* --------Bottle neck detection End */}
          {/*  -------Architecture start ---------- */}
          <div className="mt-4">
  <h2 className="text-2xl font-bold text-gray-800 mb-2">
    🌐 Federated OCPM Architecture
  </h2>

  <div className="bg-white rounded-2xl p-2 shadow-xl">

    {/* Suppliers */}
    <div className="space-y-2">

      {["Supplier A", "Supplier B", "Supplier C"].map(
        (supplier, index) => (
          <div
            key={index}
            className="flex items-center justify-center gap-4 flex-wrap"
          >
            {/* Supplier */}
            <div className="bg-blue-500 text-white px-5 py-2 rounded-xl shadow-lg font-semibold min-w-[140px] text-center">
              🏭 {supplier}
            </div>

            <div className="text-3xl text-cyan-400">
              →
            </div>

            {/* Local OCPM */}
            <div className="bg-green-500 text-white px-5 py-2 rounded-xl shadow-lg font-semibold min-w-[140px] text-center">
              📊 Local OCPM
            </div>

            <div className="text-3xl text-cyan-400">
              →
            </div>

            {/* Federated Node */}
            <div className="bg-purple-500 text-white px-5 py-2 rounded-xl shadow-lg font-semibold min-w-[160px] text-center">
              🔗 Federated Node
            </div>
          </div>
        )
      )}
    </div>

    {/* Down Arrow */}
    <div className="flex justify-center text-5xl text-cyan-400 my-2">
      ↓
    </div>

    {/* Aggregator */}
    <div className="flex justify-center">
      <div className="bg-orange-500 text-white px-8 py-2 rounded-2xl shadow-xl text-center">
        <h3 className="text-xl font-bold">
          🧠 Central Aggregator
        </h3>

        <p className="text-sm opacity-90">
          Combines Federated Insights
        </p>
      </div>
    </div>

    {/* Down Arrow */}
    <div className="flex justify-center text-5xl text-cyan-400 my-2">
      ↓
    </div>

    {/* Global Model */}
    <div className="flex justify-center">
      <div className="bg-cyan-500 text-white px-10 py-3 rounded-2xl shadow-xl text-center">
        <h3 className="text-xl font-bold">
          🌍 Global Process Model
        </h3>

        <p className="text-sm opacity-90">
          Federated Object-Centric Process Mining
        </p>
      </div>
    </div>

  </div>
</div>
          <div></div>
          
          </div>
        </div>
        {/* ---------Global Kpi End ---------- */}
        {/* --------global process model ----------- */}
        <div className="text-black flex-1 p-2 bg-gray-50 outline-1 outline-blue-400 rounded-xl">
                      <div className="flex flex-col">
              <h1 className="font-semibold text-gray-900">GLOBAL PROCESS MODEL</h1>
              <h5 className="text-gray-700 text-[16px]">Aggregate object-centric process</h5>
              <div>
               {/*  start */}
{variant && (
  <div className="space-y-6">
    
    {/* Most Common Variant */}
    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-5 rounded-xl text-white shadow-lg">
      <h2 className="text-lg font-semibold mb-2">
        🏆 Most Common Variant
      </h2>

      <div className="flex flex-wrap items-center gap-2">
        {variant.mostCommonVariant
          .split(" -> ")
          .map((step, index, arr) => (
            <React.Fragment key={index}>
              <span className="bg-white/20 px-3 py-1 rounded-lg text-sm">
                {step}
              </span>

              {index < arr.length - 1 && (
                <span className="text-xl">➡️</span>
              )}
            </React.Fragment>
          ))}
      </div>
    </div>

    {/* Variant Frequency */}
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        📊 Variant Frequency Analysis
      </h2>

      <div className="space-y-4">
        {variant.variantFrequency.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-md hover:shadow-lg transition"
          >
            {/* Variant Number */}
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-blue-600">
                Variant #{index + 1}
              </h3>

              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                Count: {item.count}
              </span>
            </div>

            {/* Process Flow */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {item.path.split(" -> ").map((step, i, arr) => (
                <React.Fragment key={i}>
                  <span className="bg-slate-100 px-3 py-2 rounded-lg text-sm">
                    {step}
                  </span>

                  {i < arr.length - 1 && (
                    <span className="text-blue-500 font-bold">
                      →
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-500 to-blue-600 h-3 rounded-full"
                style={{
                  width: `${(item.count / variant.variantFrequency[0].count) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)}
               {/* End */}
               <div className="mt-8">
  <h2 className="text-2xl font-bold text-gray-800 mb-4">
    🏆 Supplier Rankings
  </h2>

  <div className="space-y-4">
    {aggregate?.supplierRankings?.map((supplier, index) => (
      <div
        key={index}
        className="bg-white border border-gray-200 rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300"
      >
        <div className="flex justify-between items-center">
          
          {/* Left Side */}
          <div className="flex items-center gap-4">
            
            {/* Rank Badge */}
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-full text-white font-bold text-lg
                ${
                  index === 0
                    ? "bg-yellow-500"
                    : index === 1
                    ? "bg-gray-400"
                    : "bg-orange-500"
                }`}
            >
              #{index + 1}
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800">
                {supplier.supplier}
              </h3>

              <p className="text-gray-500">
                Average Lead Time: {supplier.avgLeadTime} Days
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div className="text-right">
            <p className="text-gray-500 text-sm">
              Supplier Score
            </p>

            <p
              className={`text-3xl font-bold
                ${
                  supplier.score >= 90
                    ? "text-green-600"
                    : supplier.score >= 80
                    ? "text-yellow-500"
                    : "text-red-500"
                }`}
            >
              {supplier.score}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className={`h-3 rounded-full
                ${
                  supplier.score >= 90
                    ? "bg-green-500"
                    : supplier.score >= 80
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
              style={{
                width: `${supplier.score}%`,
              }}
            />
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
              </div>
            
              </div></div>
        


    </div>

   </div>
    
  );
};

export default Page;