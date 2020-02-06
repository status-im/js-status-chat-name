import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/main.js',
  output: [
    {
      file: 'dist/status-name-gen.js',
      format: 'cjs'
    },
    {
      file: 'dist/status-name-gen.min.js',
      format: 'iife',
      name: 'version',
      plugins: [terser()]
    }
  ],
}
