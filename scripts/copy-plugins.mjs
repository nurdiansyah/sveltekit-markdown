import { execSync } from 'child_process'
import fs from 'fs-extra'
import path from 'path'

function copyPlugin(name, opts = {}) {
  console.log(`start plugin: ${name}`)
  const _start = process.hrtime()
  const pluginsSrcPath = path.join(`../plugin-${name}`)
  const pluginsDestPath = path.join('src', 'lib', 'plugins', name)
  if (!fs.pathExistsSync(pluginsDestPath)) {
    fs.mkdirpSync(pluginsDestPath)
  }
  execSync(`cp -R ${pluginsSrcPath}/src/* ${pluginsDestPath}/`, {
    stdio: 'inherit',
  })
  if (opts.locales) {
    execSync(
      `gsed -i "s+../locales/en.json+./locales/en.json+g" ${pluginsDestPath}/index.ts`,
      { stdio: 'inherit' }
    )
    execSync(`cp -R ${pluginsSrcPath}/locales ${pluginsDestPath}`, {
      stdio: 'inherit',
    })
  }
  if (Array.isArray(opts.seds)) {
    opts.seds.forEach(({ pattern, file }) => {
      execSync(`gsed -i "${pattern}" ${pluginsDestPath}/${file}`, {
        stdio: 'inherit',
      })
    })
  }
  const stop = process.hrtime(_start)
  console.log(`done ${stop[0] * 1000 + stop[1] / 1000000} ms`)
}
;[
  {
    name: 'breaks',
    opts: {
      seds: [
        {
          pattern: "s+'bytemd'+'\\$lib'+g",
          file: 'index.ts',
        },
      ],
    },
  },
  {
    name: 'footnotes',
    opts: {
      seds: [
        {
          pattern: "s+'bytemd'+'\\$lib'+g",
          file: 'index.ts',
        },
      ],
    },
  },
  {
    name: 'frontmatter',
    opts: {
      seds: [
        {
          pattern: "s+'bytemd'+'\\$lib'+g",
          file: 'index.ts',
        },
      ],
    },
  },
  {
    name: 'gemoji',
    opts: {
      seds: [
        {
          pattern: "s+'bytemd'+'\\$lib'+g",
          file: 'index.ts',
        },
      ],
    },
  },
  {
    name: 'gfm',
    opts: {
      locales: true,
      seds: [
        {
          pattern: "s+'bytemd'+'\\$lib'+g",
          file: 'index.ts',
        },
      ],
    },
  },
  {
    name: 'highlight',
    opts: {
      seds: [
        {
          pattern: "s+'bytemd'+'\\$lib'+g",
          file: 'index.ts',
        },
      ],
    },
  },
  {
    name: 'math',
    opts: {
      locales: true,
      seds: [
        {
          pattern: "s+'bytemd'+'\\$lib'+g",
          file: 'index.ts',
        },
        {
          pattern: "s+'\\@bytemd/plugin-math-common'+'../math-common'+g",
          file: 'index.ts',
        },
      ],
    },
  },
  {
    name: 'math-common',
    opts: {
      seds: [
        {
          pattern: "s+'bytemd'+'\\$lib'+g",
          file: 'index.ts',
        },
      ],
    },
  },
  {
    name: 'medium-zoom',
    opts: {
      seds: [
        {
          pattern: "s+'bytemd'+'\\$lib'+g",
          file: 'index.ts',
        },
      ],
    },
  },
  {
    name: 'mermaid',
    opts: {
      locales: true,
      seds: [
        {
          pattern: "s+'bytemd'+'\\$lib'+g",
          file: 'index.ts',
        },
      ],
    },
  },
].forEach(({ name, opts }) => {
  copyPlugin(name, opts)
})
