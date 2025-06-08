import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"

type LineItemOptionsProps = {
  variant: HttpTypes.StoreProductVariant | undefined
  translations?: any // Add translations prop for localization
  "data-testid"?: string
  "data-value"?: HttpTypes.StoreProductVariant
}

const getLocalizedLabel = (label: string, translations: any, regionLang: string) => {
  // 1. Use translations if provided
  if (translations?.cartDropdown?.variant) return translations.cartDropdown.variant
  // 2. Use #en:...#ar:... split if present
  if (label.includes("#en:") && label.includes("#ar:")) {
    const localized = label.split("#").reduce((acc, part) => {
      const [key, value] = part.split(":").map((s) => s.trim())
      if (key && value) acc[key] = value
      return acc
    }, {} as Record<string, string>)
    return localized[regionLang] || localized["en"] || label
  }
  // 3. Fallback to English
  return label
}

const LineItemOptions = ({
  variant,
  translations,
  "data-testid": dataTestid,
  "data-value": dataValue,
}: LineItemOptionsProps) => {
  // Infer regionLang from translations if possible, fallback to 'en'
  let regionLang = "en"
  if (translations?.lang) regionLang = translations.lang
  else if (translations?.shippingAddress?.country === "الدولة") regionLang = "ar"
  // Use translation or fallback logic
  const label = getLocalizedLabel("Variant:", translations, regionLang)
  const isRTL = regionLang === "ar"
  return (
    <Text
      data-testid={dataTestid}
      dir="ltr"
      data-value={dataValue}
      className="inline-block txt-medium text-ui-fg-subtle w-full overflow-hidden text-ellipsis"
    >
      {isRTL ? `${variant?.title} ${label}` : `${label} ${variant?.title}`}
    </Text>
  )
}

export default LineItemOptions
