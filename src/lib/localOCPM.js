export function analyzeOCEL(ocel) {
  const objects = ocel["ocel:objects"];

  const purchaseOrders = Object.values(objects).filter(
    (obj) => obj["ocel:type"] === "PurchaseOrder"
  );

  const shipments = Object.values(objects).filter(
    (obj) => obj["ocel:type"] === "Shipment"
  );

  const invoices = Object.values(objects).filter(
    (obj) => obj["ocel:type"] === "Invoice"
  );

  const delayedShipments = shipments.filter(
    (shipment) => shipment.status === "Delayed"
  );

  const pendingInvoices = invoices.filter(
    (invoice) => invoice.status === "Pending"
  );

  let totalLeadTime = 0;

  purchaseOrders.forEach((po) => {
    if (po.createdAt && po.approvedAt) {
      const created = new Date(po.createdAt);
      const approved = new Date(po.approvedAt);

      const days =
        (approved - created) /
        (1000 * 60 * 60 * 24);

      totalLeadTime += days;
    }
  });

  const avgLeadTime =
    purchaseOrders.length > 0
      ? totalLeadTime / purchaseOrders.length
      : 0;

  const supplierScore =
    100 -
    delayedShipments.length * 10 -
    pendingInvoices.length * 5;

  return {
    supplier:
      ocel["ocel:global-log"].supplier,

    totalOrders:
      purchaseOrders.length,

    totalShipments:
      shipments.length,

    totalInvoices:
      invoices.length,

    delayedShipments:
      delayedShipments.length,

    pendingInvoices:
      pendingInvoices.length,

    avgLeadTime:
      Number(avgLeadTime.toFixed(2)),

    supplierScore:
      Math.max(0, supplierScore),
  };
}