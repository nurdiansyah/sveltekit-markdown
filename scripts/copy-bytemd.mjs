import { execSync } from 'child_process'

execSync('cp -R ../bytemd/src/* src/lib', { stdio: 'inherit' })
execSync('cp -R ../bytemd/locales src/lib', { stdio: 'inherit' })
execSync('fd -t d __tests__ -x rm -Rf {}', { stdio: 'inherit' })
execSync('fd --glob *.svelte.ts -x rm {}', { stdio: 'inherit' })
execSync(
  "gsed -i 's+../locales/en.json+./locales/en.json+g' src/lib/editor.svelte",
  { stdio: 'inherit' }
)
