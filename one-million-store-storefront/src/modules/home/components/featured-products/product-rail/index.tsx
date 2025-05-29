import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"

import InteractiveLink from "@modules/common/components/interactive-link"
import ProductPreview from "@modules/products/components/product-preview"

export default async function ProductRail({
  translations,
  collection,
  region,
}: {
  translations: {featuredProducts: {heading: string, viewAll: string}},
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
}) {
  const { featuredProducts } = translations

  const {
    response: { products: pricedProducts },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      collection_id: collection.id,
      fields: "*variants.calculated_price",
    },
  })

  if (!pricedProducts) {
    return null
  }

  return (
    <div className="content-container py-12">
      <div className="flex justify-between mb-8">
        <Text className="text-2xl">{featuredProducts.heading}</Text>
        <InteractiveLink href={`/store`}>
          {featuredProducts.viewAll}
        </InteractiveLink>
      </div>
      <ul className="grid grid-cols-2 xsmall:grid-cols-3 small:grid-cols-5 gap-x-6 gap-y-6 small:gap-y-36">
        {pricedProducts &&
          pricedProducts.map((product) => (
            <li key={product.id}>
              <ProductPreview product={product} region={region} isFeatured />
            </li>
          ))}
      </ul>
    </div>
  )
}
