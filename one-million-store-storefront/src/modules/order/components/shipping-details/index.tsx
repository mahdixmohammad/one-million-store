import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"

import Divider from "@modules/common/components/divider"

type ShippingDetailsProps = {
  order: HttpTypes.StoreOrder
  translations?: any // Add translations prop
}

// Custom function to localize shipping method name using #en:#ar: split logic
function getLocalizedShippingMethodName(name: string, translations: any) {
  if (!name) return ""
  // If name uses #en:...#ar:... split, use that
  const localized = name.split("#").reduce((acc, part) => {
    const [key, value] = part.split(":").map((s) => s.trim())
    if (key && value) acc[key] = value
    return acc
  }, {} as Record<string, string>)
  // Try to infer language from translations object
  const lang = translations?.lang || (translations?.shippingAddress && translations.shippingAddress.country === "الدولة" ? "ar" : "en")
  return localized[lang] || localized["en"] || name
}

const ShippingDetails = ({ order, translations }: ShippingDetailsProps) => {
  return (
    <div>
      <Heading level="h2" className="flex flex-row text-3xl-regular my-6">
        {translations?.shippingAddress?.delivery || "Delivery"}
      </Heading>
      <div className="flex items-start gap-x-8">
        <div
          className="flex flex-col w-1/3"
          data-testid="shipping-address-summary"
        >
          <Text className="txt-medium-plus text-ui-fg-base mb-1">
            {translations?.shippingAddress?.shippingAddress || "Shipping Address"}
          </Text>
          <Text className="txt-medium text-ui-fg-subtle">
            {order.shipping_address?.first_name} {order.shipping_address?.last_name}
          </Text>
          <Text className="txt-medium text-ui-fg-subtle">
            {order.shipping_address?.address_1} {order.shipping_address?.address_2}
          </Text>
          <Text className="txt-medium text-ui-fg-subtle">
            {order.shipping_address?.postal_code}, {order.shipping_address?.city}
          </Text>
          <Text className="txt-medium text-ui-fg-subtle">
            {order.shipping_address?.country_code?.toUpperCase()}
          </Text>
        </div>

        <div
          className="flex flex-col w-1/3 "
          data-testid="shipping-contact-summary"
        >
          <Text className="txt-medium-plus text-ui-fg-base mb-1">
            {translations?.shippingAddress?.contact || "Contact"}
          </Text>
          <Text className="txt-medium text-ui-fg-subtle">
            {order.shipping_address?.phone}
          </Text>
          <Text className="txt-medium text-ui-fg-subtle">{order.email}</Text>
        </div>

        <div
          className="flex flex-col w-1/3"
          data-testid="shipping-method-summary"
        >
          <Text className="txt-medium-plus text-ui-fg-base mb-1">
            {translations?.shippingAddress?.method || "Method"}
          </Text>
          <Text className="txt-medium text-ui-fg-subtle">
            {getLocalizedShippingMethodName((order as any).shipping_methods[0]?.name, translations)} (
            {convertToLocale({
              amount: order.shipping_methods?.[0].total ?? 0,
              currency_code: order.currency_code,
            })
              .replace(/,/g, "")
              .replace(/\./g, ",")}
            )
          </Text>
        </div>
      </div>
      <Divider className="mt-8" />
    </div>
  )
}

export default ShippingDetails
