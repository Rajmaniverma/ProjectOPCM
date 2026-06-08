export function generateOCEL(data) {
  // Convert events to OCEL 2.0 format
  const events = data.events.map((event) => ({
    "ocel:eid": event.eventId,
    "ocel:activity": event.activity,
    "ocel:timestamp": event.timestamp,
    "ocel:omap": event.objects,
    "ocel:vmap": {}
  }));

  const objects = {};

  // Purchase Orders
  if (data.purchaseOrders) {
    data.purchaseOrders.forEach((po) => {
      objects[po.poId] = {
        "ocel:type": "PurchaseOrder",
        productId: po.productId,
        product: po.product,
        quantity: po.quantity,
        status: po.status,
        createdAt: po.createdAt,
        approvedAt: po.approvedAt
      };
    });
  }

  // Shipments
  if (data.shipments) {
    data.shipments.forEach((shipment) => {
      objects[shipment.shipmentId] = {
        "ocel:type": "Shipment",
        poId: shipment.poId,
        dispatchDate: shipment.dispatchDate,
        deliveryDate: shipment.deliveryDate,
        status: shipment.status
      };
    });
  }

  // Invoices
  if (data.invoices) {
    data.invoices.forEach((invoice) => {
      objects[invoice.invoiceId] = {
        "ocel:type": "Invoice",
        poId: invoice.poId,
        amount: invoice.amount,
        issueDate: invoice.issueDate,
        status: invoice.status
      };
    });
  }

  return {
    "ocel:global-log": {
      version: "OCEL 2.0",
      supplier: data.supplier,
      generatedAt: new Date().toISOString()
    },

    "ocel:events": events,

    "ocel:objects": objects
  };
}