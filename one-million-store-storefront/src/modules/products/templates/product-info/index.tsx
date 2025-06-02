import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
}

const ProductInfo = ({ product, region }: ProductInfoProps) => {
  const localizedTitle = product.title
    .split("#")
    .reduce((acc, part) => {
      const [key, value] = part.split(":").map((s) => s.trim())
      if (key && value) acc[key] = value
      return acc
    }, {} as Record<string, string>)

  const localizedDescription = product.description
    ? product.description.split("#").reduce((acc, part) => {
        const [key, value] = part.split(":").map((s) => s.trim())
        if (key && value) acc[key] = value
        return acc
      }, {} as Record<string, string>)
    : {}

  const regionLang = region.countries?.[0]?.iso_2 === "iq" ? "ar" : "en"
  const title =
    localizedTitle[regionLang] || localizedTitle["en"] || product.title
  const description =
    localizedDescription[regionLang] ||
    localizedDescription["en"] ||
    product.description

  return (
    <div id="product-info">
      <div className="flex flex-col gap-y-4 lg:max-w-[500px] mx-auto">
        {product.collection && (() => {
          const localizedCollection = product.collection.title
            .split("#")
            .reduce((acc, part) => {
              const [key, value] = part.split(":").map((s) => s.trim())
              if (key && value) acc[key] = value
              return acc
            }, {} as Record<string, string>)
          const collectionTitle =
            localizedCollection[regionLang] || localizedCollection["en"] || product.collection.title
          return (
            <LocalizedClientLink
              href={`/collections/${product.collection.handle}`}
              className="text-medium text-ui-fg-muted hover:text-ui-fg-subtle"
            >
              {collectionTitle}
            </LocalizedClientLink>
          )
        })()}
        <Heading
          level="h2"
          className="text-3xl leading-10 text-ui-fg-base"
          data-testid="product-title"
        >
          {title}
        </Heading>

        <Text
          className="text-medium text-ui-fg-subtle whitespace-pre-line"
          data-testid="product-description"
        >
          {description}
        </Text>
      </div>
    </div>
  )
}

export default ProductInfo
