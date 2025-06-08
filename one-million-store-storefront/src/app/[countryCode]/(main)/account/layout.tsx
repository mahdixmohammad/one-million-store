import { retrieveCustomer } from "@lib/data/customer"
import { Toaster } from "@medusajs/ui"
import AccountLayout from "@modules/account/templates/account-layout"

export default async function AccountPageLayout({
  dashboard,
  login,
  params,
}: {
  dashboard?: React.ReactNode
  login?: React.ReactNode
  params: { countryCode: string }
}) {
  const customer = await retrieveCustomer().catch(() => null)
  const countryCode = params?.countryCode || "us"

  return (
    <AccountLayout customer={customer} countryCode={countryCode}>
      {customer ? dashboard : login}
      <Toaster />
    </AccountLayout>
  )
}
