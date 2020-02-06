import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/main.js',
  output: [
    {
      file: 'dist/status-chat-name.js',
      format: 'cjs'
    },
    {
      file: 'dist/status-chat-name.min.js',
      format: 'iife',
      name: 'version',
      plugins: [terser()]
    }
  ],
}
