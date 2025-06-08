"use client"

import { useActionState } from "react"
import Input from "@modules/common/components/input"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { signup } from "@lib/data/customer"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
  translations: any
}

const Register = ({ setCurrentView, translations }: Props) => {
  const [message, formAction] = useActionState(signup, null)

  return (
    <div
      className="max-w-sm flex flex-col items-center"
      data-testid="register-page"
    >
      <h1 className="text-large-semi uppercase mb-6">
        {translations?.register?.heading || "Become a Medusa Store Member"}
      </h1>
      <p className="text-center text-base-regular text-ui-fg-base mb-4">
        {translations?.register?.message ||
          "Create your Medusa Store Member profile, and get access to an enhanced shopping experience."}
      </p>
      <form dir="ltr" className="w-full flex flex-col" action={formAction}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label={translations?.register?.firstName || "First name"}
            name="first_name"
            required
            autoComplete="given-name"
            data-testid="first-name-input"
          />
          <Input
            label={translations?.register?.lastName || "Last name"}
            name="last_name"
            required
            autoComplete="family-name"
            data-testid="last-name-input"
          />
          <Input
            label={translations?.register?.email || "Email"}
            name="email"
            required
            type="email"
            autoComplete="email"
            data-testid="email-input"
          />
          <Input
            label={translations?.register?.phone || "Phone"}
            name="phone"
            type="tel"
            autoComplete="tel"
            data-testid="phone-input"
          />
          <Input
            label={translations?.register?.password || "Password"}
            name="password"
            required
            type="password"
            autoComplete="new-password"
            data-testid="password-input"
          />
        </div>
        <ErrorMessage error={message} data-testid="register-error" />
        <span className="text-center text-ui-fg-base text-small-regular mt-6">
          {translations?.register?.termsPrefix ||
            "By creating an account, you agree to Medusa Store's"}{" "}
          <LocalizedClientLink
            href="/content/privacy-policy"
            className="underline"
          >
            {translations?.register?.privacyPolicy || "Privacy Policy"}
          </LocalizedClientLink>{" "}
          {translations?.register?.and || "and"}{" "}
          <LocalizedClientLink
            href="/content/terms-of-use"
            className="underline"
          >
            {translations?.register?.termsOfUse || "Terms of Use"}
          </LocalizedClientLink>
          .
        </span>
        <SubmitButton className="w-full mt-6" data-testid="register-button">
          {translations?.register?.joinButton || "Join"}
        </SubmitButton>
      </form>
      <span className="text-center text-ui-fg-base text-small-regular mt-6">
        {translations?.register?.alreadyMember || "Already a member?"}{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="underline"
        >
          {translations?.register?.signIn || "Sign in"}
        </button>
        .
      </span>
    </div>
  )
}

export default Register
