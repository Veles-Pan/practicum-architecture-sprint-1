import path from "path";
import webpack from "webpack";
import { BuildMode, BuildPaths, BuildPlatform, buildWebpack, BuildOptions } from "@packages/build-config";
import packageJson from "./package.json";

interface EnvVariables {
	mode?: BuildMode;
	analyzer?: boolean;
	port?: number;
	platform?: BuildPlatform;
	AUTH_REMOTE_URL?: string;
	GALLERY_REMOTE_URL?: string;
	PROFILE_REMOTE_URL?: string;
}

export default (env: EnvVariables) => {
	const paths: BuildPaths = {
		output: path.resolve(__dirname, "build"),
		entry: path.resolve(__dirname, "src", "index.tsx"),
		html: path.resolve(__dirname, "public", "index.html"),
		public: path.resolve(__dirname, "public"),
		src: path.resolve(__dirname, "src")
	};
	const AUTH_REMOTE_URL = process.env.AUTH_REMOTE_URL ?? "http://localhost:3004";
	const GALLERY_REMOTE_URL = process.env.GALLERY_REMOTE_URL ?? "http://localhost:3002";
	const PROFILE_REMOTE_URL = process.env.PROFILE_REMOTE_URL ?? "http://localhost:3003";

	const config: webpack.Configuration = buildWebpack({
		port: env.port ?? 3000,
		mode: env.mode ?? "development",
		paths,
		analyzer: env.analyzer,
		platform: env.platform ?? "desktop"
	});

	config.plugins.push(
		new webpack.container.ModuleFederationPlugin({
			name: "host",
			filename: "remoteEntry.js",

			remotes: {
				gallery: `gallery@${GALLERY_REMOTE_URL}/remoteEntry.js`,
				auth: `auth@${AUTH_REMOTE_URL}/remoteEntry.js`,
				profile: `profile@${PROFILE_REMOTE_URL}/remoteEntry.js`
			},
			shared: {
				...packageJson.dependencies,
				react: {
					eager: true,
					requiredVersion: packageJson.dependencies["react"]
				},
				"react-router-dom": {
					eager: true,
					requiredVersion: packageJson.dependencies["react-router-dom"]
				},
				"react-dom": {
					eager: true,
					requiredVersion: packageJson.dependencies["react-dom"]
				}
			}
		})
	);

	return config;
};
