"use client";
import lineLogo from "@/assets/images/btn_login_base.png";
import googleLogo from "@/assets/images/web_light_sq_SI.svg";
import { signIn } from "next-auth/react";
import Image from "next/image";

export const SocialLoginButton = ({ callbackUrl }: { callbackUrl: string }) => {
	return (
		<div className="space-y-2">
			<div className="flex flex-col space-y-4">
				<button type="button" onClick={() => signIn("google", { callbackUrl })}>
					<Image src={googleLogo} alt="Google logo" />
				</button>
				<div className="flex justify-center">
					<button type="button" onClick={() => signIn("line", { callbackUrl })}>
						<Image src={lineLogo} alt="LINE logo" />
					</button>
				</div>
			</div>
		</div>
	);
};
