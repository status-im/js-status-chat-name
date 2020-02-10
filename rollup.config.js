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
    { /* NodeJS */
      name: name,
      banner: banner,
      file: 'dist/status-chat-name.node.js',
      format: 'cjs',
    },
    { /* Browser */
      name: name,
      banner: banner,
      file: 'dist/status-chat-name.js',
      format: 'iife',
    },
    { /* Browser Minified */
      name: name,
      banner: `/* Meta: ${pkg.name} ${pkg.version} */`,
      file: 'dist/status-chat-name.min.js',
      format: 'iife',
      plugins: [ terser({output: {comments: /Meta:/}}) ]
    }
  ],
}
