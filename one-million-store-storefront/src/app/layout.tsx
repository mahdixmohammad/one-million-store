import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"
import TranslationProvider from "@/components/TranslationProvider"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body>
        <TranslationProvider>{props.children}</TranslationProvider>
      </body>
    </html>
  )
}
