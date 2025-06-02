import { Heading, Text } from "@medusajs/ui"
import InteractiveLink from "@modules/common/components/interactive-link"

const EmptyCartMessage = ({ translations }: { translations: { emptyCart: { heading: string; message: string; explore: string } } }) => {
  const { emptyCart } = translations
  return (
    <div className="py-48 px-2 flex flex-col justify-center items-start" data-testid="empty-cart-message">
      <Heading
        level="h1"
        className="flex flex-row text-3xl-regular gap-x-2 items-baseline"
      >
        {emptyCart.heading}
      </Heading>
      <Text className="text-base-regular mt-4 mb-6 max-w-[32rem]">
        {emptyCart.message}
      </Text>
      <div>
        <InteractiveLink href="/store">{emptyCart.explore}</InteractiveLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage
