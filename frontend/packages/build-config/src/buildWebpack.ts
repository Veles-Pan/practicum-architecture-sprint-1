import webpack from "webpack";
import { buildDevServer } from "./buildDevServer";
import { buildLoaders } from "./buildLoaders";
import { buildPlugins } from "./buildPlugins";
import { buildResolvers } from "./buildResolvers";
import { BuildOptions } from "./types/types";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export function buildWebpack(options: BuildOptions): webpack.Configuration {
	const { mode, paths } = options;
	const isDev = mode === "development";

	return {
		mode: mode ?? "development",
		entry: paths.entry,
		output: {
			path: paths.output,
			filename: "[name].[contenthash].js",
			clean: true
		},
		plugins: buildPlugins(options),
		module: {
			rules: [
				...buildLoaders(options),
				{
					test: /\.css$/, // Правило для обработки CSS-файлов
					use: [isDev ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader"]
				},
				{
					test: /\.svg$/, // Правило для обработки SVG-файлов
					oneOf: [
						{
							issuer: /\.[jt]sx?$/,
							use: ["@svgr/webpack"] // Использовать для React-компонентов
						},
						{
							type: "asset/resource" // Для остальных случаев как файл
						}
					]
				}
			]
		},
		resolve: buildResolvers(options),
		devtool: isDev ? "eval-cheap-module-source-map" : "source-map",
		devServer: isDev ? buildDevServer(options) : undefined
	};
}
