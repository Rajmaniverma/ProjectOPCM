export function generateProcessFlow(ocel) {
  const events = ocel["ocel:events"];
  const objects = ocel["ocel:objects"];

  // Get all Purchase Orders
  const purchaseOrders = Object.keys(objects).filter(
    (id) =>
      objects[id]["ocel:type"] ===
      "PurchaseOrder"
  );

  const transitions = {};
  const processInstances = {};

  purchaseOrders.forEach((poId) => {
    // Events related to this PO
    const poEvents = events
      .filter((event) =>
        event["ocel:omap"].includes(poId)
      )
      .sort(
        (a, b) =>
          new Date(a["ocel:timestamp"]) -
          new Date(b["ocel:timestamp"])
      );

    const path = poEvents.map(
      (event) => event["ocel:activity"]
    );

    processInstances[poId] = path;

    // Count transitions for this PO
    for (let i = 0; i < path.length - 1; i++) {
      const transition =
        `${path[i]} -> ${path[i + 1]}`;

      transitions[transition] =
        (transitions[transition] || 0) + 1;
    }
  });

  return {
    supplier:
      ocel["ocel:global-log"].supplier,

    totalPurchaseOrders:
      purchaseOrders.length,

    processInstances,

    transitions
  };
}