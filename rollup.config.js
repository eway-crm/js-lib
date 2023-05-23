import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import json from '@rollup/plugin-json';
import terser from "@rollup/plugin-terser";
import del from 'rollup-plugin-delete';
import pkg from './package.json' assert { type: 'json' };

export default [
    {
        input: "src/index.ts",
        output: [
            {
                file: pkg.main,
                format: "cjs",
                // Required only with peerDepsExternal enable
                /*paths: {
                    "react/jsx-runtime": "react/jsx-runtime.js",
                },*/
            },
            {
                file: pkg.module,
                format: "esm",
                // Required only with peerDepsExternal enable
                /*paths: {
                    "react/jsx-runtime": "react/jsx-runtime.js",
                },*/
            }
        ],
        plugins: [
            del({ targets: 'lib/*' }),
            //peerDepsExternal(), // We need to specify what external to include
            resolve({ browser: true }),
            commonjs(),
            typescript({ tsconfig: "./tsconfig.json" }),
            terser(), // Comment to disable minification
            json()
        ],
        external: [
            "axios",
            "compare-versions",
            "jwt-decode",
            "universal-base64url"
        ]
    },
    {
        input: "lib/esm/index.d.ts",
        output: [{ file: "lib/index.d.ts", format: "esm" }],
        plugins: [dts()],
        external: [/\.s?css$/]
    },
];