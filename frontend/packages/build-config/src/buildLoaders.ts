import { ModuleOptions } from "webpack";
import ReactRefreshTypeScript from "react-refresh-typescript";
import { BuildOptions } from "./types/types";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export function buildLoaders(options: BuildOptions): ModuleOptions["rules"] {
	const isDev = options.mode === "development";

	const assetLoader = {
		test: /\.(png|jpg|jpeg|gif|svg)$/i,
		type: "asset/resource"
	};

	// const svgrLoader = {
	// 	test: /\.svg$/i,
	// 	use: "file-loader"
	// };

	const cssLoader = {
		test: /\.css$/,
		use: [isDev ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader"]
	};

	const tsLoader = {
		exclude: /node_modules/,
		test: /\.tsx?$/,
		use: [
			{
				loader: "ts-loader",
				options: {
					transpileOnly: true,
					getCustomTransformers: () => ({
						before: [isDev && ReactRefreshTypeScript()].filter(Boolean)
					})
				}
			}
		]
	};

	return [assetLoader, tsLoader, cssLoader];
}
