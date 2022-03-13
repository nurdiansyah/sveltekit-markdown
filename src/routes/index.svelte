<script lang="ts">
  import {
    Editor,
    footnotes,
    frontmatter,
    breaks,
    gfm,
    highlight,
    math,
    mediumZoom,
    mermaid,
    gemoji,
  } from '$lib'

  import '$lib/index.scss'
  import 'github-markdown-css'
  import 'highlight.js/styles/vs.css'
  import 'katex/dist/katex.css'
  import en from '$lib/locales/en.json'

  // console.log(localeMap)

  let value = ''
  let mode = 'auto'
  let maxLength

  $: currentLocale = en

  function handleChange(e) {
    value = e.detail.value
  }

  function uploadImages(files) {
    return Promise.all(
      files.map((file) => {
        // TODO:
        return {
          url: 'https://picsum.photos/300',
        }
      })
    )
  }

  let enabled = {
    breaks: false,
    footnotes: true,
    frontmatter: true,
    gemoji: true,
    gfm: true,
    highlight: true,
    math: true,
    'medium-zoom': true,
    mermaid: true,
  }

  $: plugins = [
    // {
    //   remark: (p) => p.use(lintConsistent),
    //   viewerEffect(ctx) {
    //     console.log(ctx.file.messages);
    //   },
    // },
    enabled.breaks && breaks(),
    enabled.footnotes && footnotes(),
    enabled.frontmatter && frontmatter(),
    enabled.gemoji && gemoji(),
    enabled.gfm && gfm({ locale: currentLocale['plugin-gfm'] }),
    enabled.highlight && highlight(),
    enabled.math &&
      math({
        locale: currentLocale['plugin-math'],
        katexOptions: { output: 'html' }, // https://github.com/KaTeX/KaTeX/issues/2796
      }),
    enabled['medium-zoom'] && mediumZoom(),
    enabled.mermaid && mermaid({ locale: currentLocale['plugin-mermaid'] }),
  ].filter((x) => x)
</script>

<div class="container">
  <div class="line">
    Mode:
    {#each ['auto', 'split', 'tab'] as m}
      <label> <input type="radio" bind:group={mode} value={m} />{m}</label>
    {/each}
    , Max length:
    <input bind:value={maxLength} type="number" />
  </div>
  <div class="line">
    Plugins:
    {#each Object.keys(enabled) as p}
      {' '}
      <label> <input type="checkbox" bind:checked={enabled[p]} />{p}</label>
    {/each}
  </div>

  <Editor
    {value}
    {mode}
    {plugins}
    {maxLength}
    placeholder={'Start writing with ByteMD'}
    locale={en}
    {uploadImages}
    on:change={handleChange}
  />
</div>

<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
  .line {
    margin: 10px 0;
    text-align: center;
  }
  :global(body) {
    margin: 0 10px;
    font-size: 14px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
      sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
  }
  :global(.bytemd) {
    height: calc(100vh - 100px);
  }
  :global(.medium-zoom-overlay) {
    z-index: 100;
  }
  :global(.medium-zoom-image--opened) {
    z-index: 101;
  }
</style>
