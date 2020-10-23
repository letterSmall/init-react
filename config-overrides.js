const { override, fixBabelImports, addLessLoader, addDecoratorsLegacy, addBabelPlugins } = require('customize-cra');
const path = require('path')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const addCustomize = () => config => {
    if (process.env.NODE_ENV === 'production') {
        config.devtool = false;
        if (config.plugins && config.entry instanceof Array) {
            /* 打包分析插件使用配置 */
            // config.plugins.push(new BundleAnalyzerPlugin({
            //     openAnalyzer: true,
            //     analyzerPort: 8888,
            //     generateStatsFile: true,
            //     statsFilename: path.resolve(__dirname, './stats.json'),
            //     logLevel: 'error'
            // }))
            config.plugins.push(new CompressionPlugin({
                test: new RegExp(//要压缩的后缀
                    '\\.(' +
                    ['js', 'css', 'html', 'png'].join('|') +
                    ')$'
                ),
                //include: /\/build/,//只压缩指定目录
                cache: 'build/to/cache',//启用文件缓存并设置缓存目录的路径
                filename: '[path].gz[query]',
                algorithm: 'brotliCompress',//压缩功能/算法，Brotli是最初由Google开发的压缩算法，其压缩性能优于gzip
                compressionOptions: { level: 1 },//压缩级别，越高越久
                threshold: 8192,//处理高于该字节的文件
                minRatio: 0.8,//仅压缩比该比率更好的资产
            }))
        }
        /* 代码分割配置 */
        const optimization = config.optimization;
        Object.assign(optimization, {
            splitChunks: {
                chunks: 'all',
                automaticNameDelimiter: '~',
                cacheGroups: {
                    vendors: {
                        name: 'vendors',
                        test: /[\\/]node_modules[\\/]/,
                        chunks: 'all',
                        priority: 10,
                        enforce: true,
                    },
                    react: {
                        name: 'react',
                        test: module => /react|redux/.test(module.context),
                        chunks: 'initial',
                        priority: 11,
                        enforce: true,
                    },
                    antd: {
                        name: 'antd',
                        test: (module) => {
                            return /ant/.test(module.context);
                        },
                        chunks: 'initial',
                        priority: 11,
                        enforce: true,
                    },
                    shopify: {
                        name: 'shopify',
                        test: module => /shopify|braft-editor/.test(module.context),
                        chunks: 'initial',
                        priority: 11,
                        enforce: true,
                    },
                    default: {
                        name: 'common',
                        priority: -20,
                        reuseExistingChunk: true,
                    },
                    chunkFilename:'[name].js',
                    styles: {
                        name: 'styles',
                        test: '/\.css$/',
                        chunks: 'all',
                        enforce: true
                    }
                }
            },
            usedExports: true,
        })
        optimization.minimizer = [...optimization.minimizer,
        new TerserPlugin({
            terserOptions: {
                parse: {
                    ecma: 8,
                },
                compress: {
                    ecma: 5,
                    warnings: false,
                    drop_debugger: false,
                    pure_funcs: ['console.log'],
                    comparisons: false,
                    inline: 2,
                },
                mangle: {
                    safari10: true,
                },
                output: {
                    ecma: 5,
                    comments: false,
                    ascii_only: true,
                }
            },
            cache: true,
        })
        ]
    }
    return config
}

module.exports = override(
    // 针对antd实现按需打包: 根据import来打包(使用babel-plugin-import)
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true  // 自动打包相关的样式
    }, {
        libraryName: '@shopify/polaris',
        libraryDirectory: 'es',
        style: true
    }),
    ...addBabelPlugins(
        "dynamic-import-node"
    ),

    // 使用less-loader对源码中的less的变量进行重新指定
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: { '@primary-color': '#5C6AC4' }
    }),
    addDecoratorsLegacy(),
    addCustomize()
)
// const output=Object.assign(module.exports.output,{})
// module.exports = {
//     output:{
//         chunkFilename:'[name].js',
//     }
// }