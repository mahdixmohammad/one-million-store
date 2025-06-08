import { retrieveCart } from "@lib/data/cart"
import CartDropdown from "../cart-dropdown"

export default async function CartButton({ translations }: { translations: any }) {
  const cart = await retrieveCart().catch(() => null)

  return <CartDropdown cart={cart} translations={translations} />
}
