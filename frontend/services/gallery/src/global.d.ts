declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";

declare module "*.svg" {
	const content: string;
	export default content;
}

declare const __PLATFORM__: "mobile" | "desktop";
declare const __ENV__: "production" | "development";
