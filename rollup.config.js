import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'


const name = 'StatusIm'
const banner = `
/**
 * Name:    ${pkg.name}
 * Version: ${pkg.version}
 * Author:  ${pkg.author}
 * Source:  ${pkg.repository}
 * License: ${pkg.license}
 **/
`;

export default {
  input: 'src/main.js',
  output: [
    {
      name: name,
      banner: banner,
      file: 'dist/status-chat-name.js',
      format: 'iife',
    },
    {
      name: name,
      banner: banner,
      file: 'dist/status-chat-name.min.js',
      format: 'iife',
      plugins: [terser()]
    }
  ],
}
