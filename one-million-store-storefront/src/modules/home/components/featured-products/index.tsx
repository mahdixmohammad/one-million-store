import { HttpTypes } from "@medusajs/types"
import ProductRail from "@modules/home/components/featured-products/product-rail"

export default async function FeaturedProducts({
  translations,
  collections,
  region,
}: {
  translations: any, // Accept the full translations object
  collections: HttpTypes.StoreCollection[]
  region: HttpTypes.StoreRegion
}) {
  return collections.map((collection) => (
    <li key={collection.id}>
      <ProductRail translations={translations} collection={collection} region={region} />
    </li>
  ))
}
