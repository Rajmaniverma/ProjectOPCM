export function createFederatedNode(localOCPMData) {
  return {
    nodeId: `${localOCPMData.supplier
      .replace(/\s+/g, "-")
      .toLowerCase()}-node`,

    supplier: localOCPMData.supplier,

    generatedAt: new Date().toISOString(),

    kpis: {
      totalOrders: localOCPMData.totalOrders,
      totalShipments: localOCPMData.totalShipments,
      totalInvoices: localOCPMData.totalInvoices,
      delayedShipments: localOCPMData.delayedShipments,
      pendingInvoices: localOCPMData.pendingInvoices,
      avgLeadTime: localOCPMData.avgLeadTime,
      supplierScore: localOCPMData.supplierScore,
    },
  };
}