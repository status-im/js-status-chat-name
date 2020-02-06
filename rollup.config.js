import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/main.js',
  output: [
    {
      name: 'StatusIm',
      file: 'dist/status-chat-name.js',
      format: 'iife',
    },
    {
      name: 'StatusIm',
      file: 'dist/status-chat-name.min.js',
      format: 'iife',
      plugins: [terser()]
    }
  ],
}
