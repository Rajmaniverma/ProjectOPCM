export function aggregateNodes(nodes) {
  const totalSuppliers = nodes.length;

  let totalOrders = 0;
  let totalShipments = 0;
  let totalInvoices = 0;
  let delayedShipments = 0;
  let pendingInvoices = 0;
  let totalLeadTime = 0;
  let totalSupplierScore = 0;

  nodes.forEach((node) => {
    const kpis = node.kpis;

    totalOrders += kpis.totalOrders || 0;
    totalShipments += kpis.totalShipments || 0;
    totalInvoices += kpis.totalInvoices || 0;
    delayedShipments += kpis.delayedShipments || 0;
    pendingInvoices += kpis.pendingInvoices || 0;

    totalLeadTime += kpis.avgLeadTime || 0;
    totalSupplierScore += kpis.supplierScore || 0;
  });

  const averageLeadTime =
    totalSuppliers > 0
      ? Number(
          (totalLeadTime / totalSuppliers).toFixed(2)
        )
      : 0;

  const averageSupplierScore =
    totalSuppliers > 0
      ? Number(
          (
            totalSupplierScore / totalSuppliers
          ).toFixed(2)
        )
      : 0;

  const supplierRankings = nodes
    .map((node) => ({
      supplier: node.supplier,
      score: node.kpis.supplierScore,
      avgLeadTime: node.kpis.avgLeadTime,
    }))
    .sort((a, b) => b.score - a.score);

  const bottlenecks = nodes
    .filter(
      (node) =>
        node.kpis.delayedShipments > 0 ||
        node.kpis.pendingInvoices > 0
    )
    .map((node) => ({
      supplier: node.supplier,
      delayedShipments:
        node.kpis.delayedShipments,
      pendingInvoices:
        node.kpis.pendingInvoices,
    }));

  return {
    generatedAt: new Date().toISOString(),

    totalSuppliers,

    networkKPIs: {
      totalOrders,
      totalShipments,
      totalInvoices,
      delayedShipments,
      pendingInvoices,
      averageLeadTime,
      averageSupplierScore,
    },

    supplierRankings,

    bottlenecks,
  };
}