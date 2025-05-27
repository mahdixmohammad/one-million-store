import "styles/globals.css";
import TranslationProvider from "../../components/TranslationProvider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "One Million Store",
  description: "Discover the world’s best coffee, delivered to your door.",
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { countryCode: string };
}) {
  const { countryCode } = params;
  const dir = countryCode === "iq" ? "rtl" : "ltr";
  const lang = countryCode === "iq" ? "ar" : "en";

  return (
    <html lang={lang} data-mode="light" dir={dir}>
      <body>
        <TranslationProvider pageProps={{}}>{children}</TranslationProvider>
      </body>
    </html>
  );
}
