import { copyFile } from 'fs/promises'
import { resolve } from 'path'
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  clean: true,
  declaration: true,
  rollup: {
    emitCJS: true,
  },
  entries: [
    { input: 'src/index' },
  ],
  externals: [
    'vue-demi',
  ],
  hooks: {
    'build:done': async () => {
      await copyFile(resolve(__dirname, 'style.css'), resolve(__dirname, 'dist/style.css'))
    },
  },
})
