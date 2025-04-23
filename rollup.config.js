import typescript from '@rollup/plugin-typescript';
import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import metablock from 'rollup-plugin-userscript-metablock';
import fs from 'fs';
import terser from '@rollup/plugin-terser';
import makeBookmarklet from './makeBookmarket.js';
import nodePolyfills from 'rollup-plugin-polyfill-node';

const pkg = JSON.parse(fs.readFileSync('./package.json'));
const full = process.argv.includes('full');

let output = [
    {
        file: 'build/bundle.js',
        format: 'iife'
    }
]

let otherOutputs = [
    {
        file: 'build/bundle.user.js',
        format: 'iife',
        plugins: [
            metablock({
                file: './meta.json',
                override: {
                    version: pkg.version
                }
            }),
        ]
    },
    {
        file: 'build/bundle.bookmarklet.txt',
        format: 'iife',
        plugins: [
            terser(),
            makeBookmarklet()
        ]
    },
    {
        file: 'build/bundle.min.js',
        format: 'iife',
        plugins: [
            terser()
        ]
    }
];

// If we're doing a full build, also create a userscript and bookmarklet
if (full) {
    output = output.concat(otherOutputs);
}

export default {
    input: 'src/exploit/main.ts',
    output,
    plugins: [
        typescript(),
        commonjs(),
        svelte({
            emitCss: false,
            compilerOptions: {
                css: 'injected'
            },
        }),
        nodePolyfills({
            include: ['node_modules/**'],
            sourceMap: true
        }),
        resolve({
            browser: true,
            exportConditions: ['svelte'],
            extensions: ['.svelte', '.js', '.ts', '.json']
        }),
    ],
    external: [
        'colyseus.js/lib/Protocol.js'
    ]
}