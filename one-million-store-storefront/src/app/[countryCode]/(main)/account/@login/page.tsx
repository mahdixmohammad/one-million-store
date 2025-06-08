import { Metadata } from "next"
import path from "path"
import fs from "fs/promises"

import LoginTemplate from "@modules/account/templates/login-template"

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Medusa Store account.",
}

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

export default async function Login({ params }: { params: { countryCode: string } }) {
  const { countryCode } = params
  const translations = await loadTranslations(countryCode === "iq" ? "ar" : "en")
  return <LoginTemplate translations={translations} />
}
