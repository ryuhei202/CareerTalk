"use client";
import Image from "next/image";
import googleLogo from "@/assets/images/web_light_sq_SI.svg";
import lineLogo from "@/assets/images/btn_login_base.png";
import { signIn } from "next-auth/react";

export const SocialLoginButton = ({ callbackUrl }: { callbackUrl: string }) => {
  return (
    <div className="space-y-2">
      <div className="flex flex-col space-y-4">
        <button onClick={() => signIn("google", { callbackUrl })}>
          <Image src={googleLogo} alt="Google logo" />
        </button>
        <div className="flex justify-center">
          <button onClick={() => signIn("line", { callbackUrl })}>
            <Image src={lineLogo} alt="LINE logo" />
          </button>
        </div>
      </div>
    </div>
  );
};
