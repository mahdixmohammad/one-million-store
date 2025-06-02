import { retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import { listRegions, retrieveRegion } from "@lib/data/regions"
import CartTemplate from "@modules/cart/templates"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Cart",
  description: "View your cart",
}

export default async function Cart({ params }: { params: { countryCode: string } }) {
  const cart = await retrieveCart().catch((error) => {
    console.error(error)
    return notFound()
  })

  const customer = await retrieveCustomer()

  let regionId = cart?.region_id
  if (!regionId) {
    const regions = await listRegions()
    regionId = regions?.[0]?.id
  }
  const region = await retrieveRegion(regionId)

  return <CartTemplate cart={cart} customer={customer} region={region} countryCode={params.countryCode} />
}
