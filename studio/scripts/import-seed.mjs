// Loads the starting content (studio/seed/content.ndjson) into the Sanity dataset,
// uploading every photo from /public on the way.
//
// Run once, after `npx sanity login` and after studio/.env has the project ID:
//   cd studio && npm run seed:import
//
// It replaces documents with the same ID, so only run it on a fresh project —
// running it later would overwrite edits made in the admin panel.
import {spawnSync} from 'node:child_process'
import {readFileSync, unlinkSync, writeFileSync} from 'node:fs'
import path from 'node:path'
import {fileURLToPath, pathToFileURL} from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(here, '..', '..')
const rootUrl = pathToFileURL(projectRoot).href // percent-encodes spaces in the path
const source = readFileSync(path.join(here, '..', 'seed', 'content.ndjson'), 'utf8')
const prepared = path.join(here, '..', '.seed-import.ndjson')

writeFileSync(prepared, source.replaceAll('file://{{ROOT}}', rootUrl))

const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
const result = spawnSync('npx', ['sanity', 'dataset', 'import', prepared, '--dataset', dataset, '--replace'], {
  cwd: path.join(here, '..'),
  stdio: 'inherit',
})
unlinkSync(prepared)
process.exit(result.status ?? 1)
