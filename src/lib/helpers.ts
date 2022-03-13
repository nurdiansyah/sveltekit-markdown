import type { Root, Element } from 'hast'
import type { VFile } from 'vfile'
import type { Plugin } from 'unified'

import { throttle, debounce } from 'lodash-es'
// @ts-ignore
import wordCount from 'word-count'
import { visit } from 'unist-util-visit'
import { delegate, DelegateInstance } from 'tippy.js'

import factory from 'codemirror-ssr'
import usePlaceholder from 'codemirror-ssr/addon/display/placeholder.js'
import useOverlay from 'codemirror-ssr/addon/mode/overlay.js'
import useXml from 'codemirror-ssr/mode/xml/xml.js'
import useMarkdown from 'codemirror-ssr/mode/markdown/markdown.js'
import useGfm from 'codemirror-ssr/mode/gfm/gfm.js'
import useYaml from 'codemirror-ssr/mode/yaml/yaml.js'
import useYamlFrontmatter from 'codemirror-ssr/mode/yaml-frontmatter/yaml-frontmatter.js'
import { icons } from './icons'

export type { DelegateInstance, Root, Element, VFile, Plugin }

export {
  debounce,
  throttle,
  wordCount,
  visit,
  delegate,
  //
  factory,
  usePlaceholder,
  useOverlay,
  useXml,
  useMarkdown,
  useGfm,
  useYaml,
  useYamlFrontmatter,
  //
  icons,
}

export * from './editor'
export * from './viewer'
export * from './types'
