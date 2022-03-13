import bundle from '@nurdiansyah/rollup/configs/module.config'
import path from 'path'
import fs from 'fs-extra'
import alias from '@rollup/plugin-alias'


const config = bundle(
  {
    input: 'src/index.ts',
    output: 'index.js',
    isPublish: true,
  },
  {
    nodeResolveOptions: {
      preferBuiltins: true,
    },
  }
)

config.plugins = [
  alias({
    entries: [
      {
        find: 'bytemd',
        replacement: '@deboxsoft/bytemd',
      },
      {
        find: /@bytemd\/plugin-(.*)/,
        replacement: '@deboxsoft/bytemd-plugin-$1',
      },
    ],
  }),
  ...config.plugins,
]

config.output = {
  file: "index.js",
  format: "esm",
  sourcemap: true
}

const pkg = fs.readJsonSync(path.resolve('package.json'))
const externalDependencies = {
  ...(pkg.peerDependencies || {}),
  ...(pkg.optionalDependencies || {}),
}
config.external = Object.keys(externalDependencies)
export default config