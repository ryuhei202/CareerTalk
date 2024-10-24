export { default } from "next-auth/middleware";

export const config = {
	matcher: ["/profile", "/employee/create_profile"],
};
