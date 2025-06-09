import { Metadata } from "next"
import ProfilePhone from "@modules/account//components/profile-phone"
import ProfileBillingAddress from "@modules/account/components/profile-billing-address"
import ProfileEmail from "@modules/account/components/profile-email"
import ProfileName from "@modules/account/components/profile-name"
import ProfilePassword from "@modules/account/components/profile-password"
import { notFound } from "next/navigation"
import { listRegions } from "@lib/data/regions"
import { retrieveCustomer } from "@lib/data/customer"
import path from "path"
import fs from "fs/promises"

async function loadTranslations(locale: string) {
  const filePath = path.join(
    process.cwd(),
    "public",
    "locales",
    locale,
    "common.json"
  )
  const fileContents = await fs.readFile(filePath, "utf-8")
  return JSON.parse(fileContents)
}

export const metadata: Metadata = {
  title: "Profile",
  description: "View and edit your Medusa Store profile.",
}

export default async function Profile({ params }: { params: { countryCode: string } }) {
  const customer = await retrieveCustomer()
  const regions = await listRegions()
  const countryCode = params?.countryCode || "us"
  const locale = countryCode === "iq" ? "ar" : "en"
  const translations = await loadTranslations(locale)

  if (!customer || !regions) {
    notFound()
  }

  return (
    <div className="w-full" data-testid="profile-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">
          {translations?.accountNav?.profile || "Profile"}
        </h1>
        <p className="text-base-regular">
          {translations?.account?.profileDescription ||
            "View and update your profile information, including your name, email, and phone number. You can also update your billing address, or change your password."}
        </p>
      </div>
      <div className="flex flex-col gap-y-8 w-full">
        <ProfileName customer={customer} translations={translations} />
        <Divider />
        <ProfileEmail customer={customer} translations={translations} />
        <Divider />
        <ProfilePhone customer={customer} translations={translations} />
        <Divider />
        {/* <ProfilePassword customer={customer} translations={translations} />
        <Divider /> */}
        <ProfileBillingAddress
          customer={customer}
          regions={regions}
          translations={translations}
        />
      </div>
    </div>
  )
}

const Divider = () => {
  return <div className="w-full h-px bg-gray-200" />
}
