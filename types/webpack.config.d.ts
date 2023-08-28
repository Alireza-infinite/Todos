import HtmlWebpackPlugin = require("html-webpack-plugin");
export let mode: string;
export let entry: string;
export let plugins: HtmlWebpackPlugin[];
export let devtool: string;
export namespace devServer {
    let _static: string;
    export { _static as static };
}
export namespace module {
    let rules: ({
        test: RegExp;
        use: string;
        exclude: RegExp;
    } | {
        test: RegExp;
        use: string[];
        exclude?: undefined;
    })[];
}
export namespace resolve {
    let extensions: string[];
}
export namespace output {
    let filename: string;
    let path: string;
    let clean: boolean;
}
