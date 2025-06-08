import { Text } from "@medusajs/ui"
import { listProducts } from "@lib/data/products"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
  translations, // <-- add translations prop
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
  translations?: any // <-- add translations type
}) {
  // const pricedProduct = await listProducts({
  //   regionId: region.id,
  //   queryParams: { id: [product.id!] },
  // }).then(({ response }) => response.products[0])

  // if (!pricedProduct) {
  //   return null
  // }

  const { cheapestPrice } = getProductPrice({
    product,
  })

  const localizedTitle = product.title
    .split("#")
    .reduce((acc, part) => {
      const [key, value] = part.split(":").map((s) => s.trim())
      if (key && value) acc[key] = value
      return acc
    }, {} as Record<string, string>)

  const regionLang = region.countries?.[0]?.iso_2 === "iq" ? "ar" : "en"
  const title = localizedTitle[regionLang] || localizedTitle["en"] || product.title

  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="group">
      <div data-testid="product-wrapper">
        <Thumbnail
          thumbnail={product.thumbnail}
          images={product.images}
          size="full"
          isFeatured={isFeatured}
        />
        <div className="flex flex-col 2xsmall:flex-row txt-compact-medium mt-4 justify-between">
          <Text className="text-ui-fg-subtle" data-testid="product-title">
            {title}
          </Text>
          <div className="flex items-center gap-x-2">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} translations={translations} />}
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
