
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import buble from '@rollup/plugin-buble';
import sass from 'rollup-plugin-sass';
import {terser} from 'rollup-plugin-terser';
import {version} from './package.json';

const appName = 'LeafletSearch';
const year = new Date().getFullYear();

const banner = `
/*!
 * ${appName} ${version}
 * (c) ${year} Sjaak Priester, Amsterdam
 * MIT License
 * https://github.com/sjaakp/leaflet-search
 * https://sjaakpriester.nl
 */
`;

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/leaflet-search.js',
        format: 'iife',
        name: appName,
        sourcemap: true,
        banner: banner,
    },
    plugins: [
        resolve({
            customResolveOptions: {
                moduleDirectory: 'node_modules'
            }
        }),
        commonjs(),
        json(),
        sass({
            insert: true,
            options: {
                outputStyle: 'compressed'
            }
        }),
        buble({
             transforms: {
                 modules: false,
                 dangerousForOf: true,
                 dangerousTaggedTemplateString: true
             }
        }),
        terser({
            output: {
                 comments: /^!/
            }
        })
    ],
};
