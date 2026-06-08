export function aggregateVariants(
  variantFiles
) {
  const globalVariantMap = {};

  variantFiles.forEach((supplier) => {

    supplier.variants.forEach(
      (variant) => {

        globalVariantMap[
          variant.path
        ] =
          (
            globalVariantMap[
              variant.path
            ] || 0
          ) + variant.count;
      }
    );
  });

  const globalVariants =
    Object.entries(
      globalVariantMap
    ).map(
      ([path, count]) => ({
        path,
        count,
      })
    );

  globalVariants.sort(
    (a, b) => b.count - a.count
  );

  return {
    totalGlobalVariants:
      globalVariants.length,

    mostCommonVariant:
      globalVariants[0]?.path,

    variantFrequency:
      globalVariants,
  };
}