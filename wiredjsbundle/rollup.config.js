import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import { terser } from "rollup-plugin-terser";

function stopDynamicImport () {
    return {
      name: 'stop-dynamic-import', 
      resolveDynamicImport ( source ) {
        return false
      }
    };
  }

export default {
    input: 'src/index.js', 
    output: {
        file: 'public/wiredjs.js',
        format: 'esm'
    },

    plugins: [
        resolve(),
        stopDynamicImport (),
        commonjs({
            include: 'node_modules/**',
            namedExports: {
            }
         }),
         babel({
            exclude: "node_modules/**"
        }),
        replace({
            "process.env.NODE_ENV": "'production'",
        }),
        terser(),
    ]
};