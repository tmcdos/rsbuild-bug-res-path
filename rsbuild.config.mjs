import { defineConfig, loadEnv } from '@rsbuild/core';
import { pluginVue2 } from '@rsbuild/plugin-vue2';
import { pluginSass } from '@rsbuild/plugin-sass';
import { VuetifyLoaderPlugin } from 'vuetify-loader';
import pk from './package.json';
import fs from 'node:fs';
import path from 'path';

const { publicVars } = loadEnv({ prefixes: ['VUE_APP_'] });

export default defineConfig({
  plugins: [
    pluginVue2(),
    pluginSass({
      sassLoaderOptions:
        {
          sourceMap: true,
          implementation: require.resolve('sass'),
        },
    }),
  ],
  source:
    {
      entry:
        {
          index: './src/main.js',
        },
      define:
        {
          ...publicVars,
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
          'process.env.VERSION': JSON.stringify(pk.version),
          'process.env.BUILD_TIME': JSON.stringify(new Date().toISOString()),
        },
      tsconfigPath: './jsconfig.json',
    },
  html:
    {
      template: './src/index.html',
      templateParameters:
        {
          VERSION: pk.version,
        },
    },
  output:
    {
      legalComments: 'none',
      sourceMap:
        {
          js: process.env.NODE_ENV === 'development' ? 'inline-source-map' : 'hidden-source-map',
          css: true,
        },
    },
  server:
    {
      port: 8080,
      historyApiFallback: true,
    },
  tools:
    {
      rspack: (config, { env }) =>
      {
        config.plugins = config.plugins || [];
        config.plugins.push(
          new VuetifyLoaderPlugin(),
        );

        config.output = config.output || {};
        if (env === 'development')
        {
          // !!!!!!! -- https://github.com/vuejs/vue-cli/issues/2978#issuecomment-441426094
          config.output.devtoolModuleFilenameTemplate = (info) =>
          {
            const resPath = path.normalize(info.resourcePath).split(path.sep).join('/');
            const isVue = /\.vue$/.test(resPath) && /^src/.test(resPath);
            //const isScript = info.query.match(/type=script/);
            //const hasModuleId = info.moduleId !== '';
            const isGenerated = info.allLoaders;

            const generated = `rspack:///${resPath}?${info.hash}`;
            const vuesource = `vue-source:///${resPath}`;
            if(!isGenerated && /(App|HomePage|DialogConfirm)\.vue$/.test(info.resourcePath)) console.log(info.resourcePath);
            return isVue && !isGenerated ? vuesource : generated;
          };
          config.output.devtoolFallbackModuleFilenameTemplate = 'webpack:///[resource-path]?[loaders]';
        }

        // Forces Rspack to generate readable string IDs for modules and chunks
        config.optimization = config.optimization || {};
        config.optimization.chunkIds = 'named';
        config.optimization.moduleIds = 'named';
        config.optimization.splitChunks = {
          automaticNameDelimiter: '_',
          chunks: 'all',
          maxInitialRequests: 5,
          minSize: 5000,
          //maxSize: 250000,
          cacheGroups:
            {
              default:
                {
                  minChunks: 2,
                  priority: -20,
                  reuseExistingChunk: true,
                  name(module, chunks, cacheGroupKey)
                  {
                    return chunks.map((chunk) => chunk.name).join('_');
                  },
                },
              vendor:
                {
                  reuseExistingChunk: true,
                  test: /[\\/]node_modules[\\/]/,
                  name(module, chunks, cacheGroupKey)
                  {
                    // get the name. E.g. node_modules/packageName/not/this/part.js
                    // or node_modules/packageName
                    const match = module.identifier().match(/[\\/]node_modules[\\/]([^\\/]+)([\\/]|$)/);
                    if (!match)
                    {
                      return undefined;
                    }

                    // npm package names are URL-safe, but some servers don't like @ symbols
                    return `${cacheGroupKey}_${match[1].replace('@', '')}`;
                  },
                },
            },
        };

        return config;
      },
    },
});
