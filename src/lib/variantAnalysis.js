export function analyzeVariants(processData) {
  const variantMap = {};

  Object.values(
    processData.processInstances
  ).forEach((path) => {
    const variant = path.join(" -> ");

    variantMap[variant] =
      (variantMap[variant] || 0) + 1;
  });

  const variants = Object.entries(
    variantMap
  ).map(([path, count]) => ({
    path,
    count,
  }));

  variants.sort(
    (a, b) => b.count - a.count
  );

  return {
    supplier: processData.supplier,

    totalVariants: variants.length,

    mostCommonVariant:
      variants.length > 0
        ? variants[0].path
        : null,

    mostCommonCount:
      variants.length > 0
        ? variants[0].count
        : 0,

    variants,
  };
}