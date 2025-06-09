import { Metadata } from "next"
import OrderOverview from "@modules/account/components/order-overview"
import { notFound } from "next/navigation"
import { listOrders } from "@lib/data/orders"
import Divider from "@modules/common/components/divider"
import TransferRequestForm from "@modules/account/components/transfer-request-form"
import path from "path"
import fs from "fs/promises"

export const metadata: Metadata = {
  title: "Orders",
  description: "Overview of your previous orders.",
}

export default async function Orders({ params }: { params: { countryCode: string } }) {
  const countryCode = params?.countryCode || "us"
  const locale = countryCode === "iq" ? "ar" : "en"
  const filePath = path.join(
    process.cwd(),
    "public",
    "locales",
    locale,
    "common.json"
  )
  const fileContents = await fs.readFile(filePath, "utf-8")
  const translations = JSON.parse(fileContents)

  const orders = await listOrders()

  if (!orders) {
    notFound()
  }

  return (
    <div className="w-full" data-testid="orders-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">{translations?.accountNav?.orders || "Orders"}</h1>
        <p className="text-base-regular">
          {translations?.account?.ordersDescription ||
            "View your previous orders and their status. You can also create returns or exchanges for your orders if needed."}
        </p>
      </div>
      <div>
        <OrderOverview orders={orders} translations={translations} />
        <Divider className="my-16" />
        <TransferRequestForm translations={translations} />
      </div>
    </div>
  )
}
