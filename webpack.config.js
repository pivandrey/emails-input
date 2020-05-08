const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const createStyleConfig = (cssModules = true) =>  [
    MiniCssExtractPlugin.loader,
    {
        loader: require.resolve('css-loader'),
        options: {
            importLoaders: 1,
            modules: cssModules
        },
    },
    'postcss-loader'
];

module.exports = (env, argv) => ({
    mode: env.prod ? 'production' : 'development',

    context: path.resolve(__dirname, 'src'),

    entry: (() => {
        const entry = {
            EmailsInput: path.resolve(__dirname, 'src/emailsinput.js'),
            script: env.dev && path.resolve(__dirname, 'src/script.js'),
        };

        return Object.keys(entry).reduce((acc, key) => {
            if (entry[key]) acc[key] = entry[key];
            return acc
        }, {})
    })(),

    target: 'web',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: env.prod ? 'emailsinput.min.js' : '[name].js',
        library: 'emailsinput',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                targets: {
                                    ie: 11,
                                },
                            }
                        ]
                    ],
                    plugins: [
                        ['@babel/plugin-transform-runtime']
                    ],
                }
            },
            {
                test: /\.css$/,
                oneOf: [
                    {
                        resourceQuery: /cssModuleDisable/,
                        use: createStyleConfig(false)
                    },
                    {
                        use: createStyleConfig(true)
                    }
                ]
            },
            {
                test: /\.ttf$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: './fonts/[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, './'),
        host: '0.0.0.0',
        open: true,
        port: 9001,
        public: 'http://localhost:9001'
    },

    optimization: {
        minimize: !!env.prod,
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                terserOptions: {
                    ecma: 5,
                    output: {
                        comments: false
                    }
                }
            })
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: env.prod ? 'emailsinput.min.css' : '[name].css'
        }),

        !env.prod && new HtmlWebpackPlugin({
            template: path.resolve(__dirname, `src/index.html`),

            chunks: [
                'EmailsInput',
                env.dev && 'script'
            ].filter(Boolean),
            chunksSortMode: 'manual'
        })
    ].filter(Boolean)
});
