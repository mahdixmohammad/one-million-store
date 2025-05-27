"use client"

import Image from "next/image"
import Link from "next/link"

const Hero = ({
  translations,
}: {
  translations: {
    hero: { welcome: string; description: string; shopNow: string }
  }
}) => {
  const { hero } = translations

  return (
    <section className="w-full bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* Left: Text */}
        <div className="flex items-center justify-center min-h-[300px] md:min-h-[400px] px-8 md:px-16 bg-[#F9F9F9]">
          <div className="w-full max-w-[500px]">
            <h1 className="text-5xl md:text-6xl font-normal mb-6">
              {hero.welcome}
            </h1>
            <p className="text-lg text-gray-700 mb-8 max-w-[450px]">
              {hero.description}
            </p>
            <Link href="/store" passHref>
              <button className="bg-[#E5C887] hover:bg-[#d4b87a] text-black font-medium py-3 px-10 rounded-full w-fit text-lg">
                {hero.shopNow}
              </button>
            </Link>
          </div>
        </div>
        {/* Right: Image */}
        <div className="relative h-full min-h-[300px] md:min-h-[400px] w-full">
          <Image
            src="/images/one-million-background.jpeg"
            alt="One Million Store Product"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      </div>
    </section>
  )
}

export default Hero