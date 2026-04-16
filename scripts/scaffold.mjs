#!/usr/bin/env node
/**
 * scaffold.mjs — copies a playlist-system template to a destination,
 * injects the chosen theme and replaces placeholders.
 *
 * Usage:
 *   node playlist-system/scripts/scaffold.mjs \
 *     --target web \
 *     --theme playlist \
 *     --dest ./my-prototype
 *
 * Flags:
 *   --target   web | native
 *   --theme    playlist | smartdesk
 *   --dest     absolute or relative path for the new project
 *
 * After scaffold:
 *   cd my-prototype
 *   pnpm install     (or npm / yarn)
 *   pnpm dev
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SKILL_ROOT = path.resolve(__dirname, '..');

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const key = a.slice(2);
      const val = argv[i + 1];
      if (!val || val.startsWith('--')) {
        args[key] = true;
      } else {
        args[key] = val;
        i++;
      }
    }
  }
  return args;
}

function fail(msg) {
  console.error(`\n[scaffold] ERROR: ${msg}\n`);
  console.error(`Usage: node scaffold.mjs --target <web|native> --theme <playlist|smartdesk> --dest <path>\n`);
  process.exit(1);
}

async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

async function walkFiles(dir) {
  const out = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git') continue;
      out.push(...(await walkFiles(full)));
    } else {
      out.push(full);
    }
  }
  return out;
}

async function replaceInFile(file, replacements) {
  const content = await fs.readFile(file, 'utf8');
  let next = content;
  for (const [from, to] of replacements) {
    next = next.split(from).join(to);
  }
  if (next !== content) {
    await fs.writeFile(file, next, 'utf8');
    return true;
  }
  return false;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  const target = args.target;
  const theme = args.theme;
  const dest = args.dest;

  if (!target || !['web', 'native'].includes(target)) {
    fail(`--target must be "web" or "native" (received: ${target ?? 'nothing'})`);
  }
  if (!theme || !['playlist', 'smartdesk'].includes(theme)) {
    fail(`--theme must be "playlist" or "smartdesk" (received: ${theme ?? 'nothing'})`);
  }
  if (!dest) {
    fail(`--dest is required (path for new project)`);
  }

  const templateDir =
    target === 'web'
      ? path.join(SKILL_ROOT, 'templates', 'web-vite')
      : path.join(SKILL_ROOT, 'templates', 'native-expo');

  const destAbs = path.resolve(dest);

  // Security: do not overwrite existing non-empty folder
  try {
    const existing = await fs.readdir(destAbs);
    if (existing.length > 0) {
      fail(`destination "${destAbs}" already exists and is not empty. Choose another path or delete it first.`);
    }
  } catch (e) {
    if (e.code !== 'ENOENT') throw e;
  }

  console.log(`[scaffold] copying ${templateDir} → ${destAbs}`);
  await copyDir(templateDir, destAbs);

  // Replacements in all text files
  const files = await walkFiles(destAbs);
  const textExts = ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.json', '.html', '.md', '.css'];
  const replacements = [
    ['__REPLACE_WITH_THEME__', theme],
  ];

  // Adjustment of theme.ts: comment wrong line and uncomment correct one.
  // Template comes with playlist as default and smartdesk commented.
  let themeTsPatched = 0;
  for (const file of files) {
    if (!textExts.includes(path.extname(file))) continue;
    const isThemeTs = path.basename(file) === 'theme.ts';
    if (isThemeTs) {
      const content = await fs.readFile(file, 'utf8');
      let next = content;
      if (theme === 'smartdesk') {
        // Uncomments smartdesk, comments playlist
        next = next.replace(
          /export \{ playlistTheme as theme \} from '([^']+)';/,
          "// export { playlistTheme as theme } from '$1';"
        );
        next = next.replace(
          /\/\/ export \{ smartdeskTheme as theme \} from '([^']+)';/,
          "export { smartdeskTheme as theme } from '$1';"
        );
      }
      if (next !== content) {
        await fs.writeFile(file, next, 'utf8');
        themeTsPatched++;
      }
      continue;
    }
    await replaceInFile(file, replacements);
  }

  console.log(`[scaffold] ${files.length} file(s) processed, ${themeTsPatched} theme.ts adjusted for theme "${theme}"`);

  // Final output with next steps
  const pkgMgr = await detectPackageManager();
  console.log(`
[scaffold] ready in ${destAbs}

next steps:
  cd ${path.relative(process.cwd(), destAbs) || '.'}
  ${pkgMgr} install
  ${pkgMgr} ${target === 'web' ? 'dev' : 'start'}

active theme: ${theme}
target:       ${target}
`);
}

async function detectPackageManager() {
  // Simple heuristic: if there's pnpm-lock.yaml or yarn.lock in the common
  // parent directory, suggests that manager. Otherwise, pnpm by default (faster).
  try {
    const cwd = process.cwd();
    const up = await fs.readdir(cwd);
    if (up.includes('pnpm-lock.yaml')) return 'pnpm';
    if (up.includes('yarn.lock')) return 'yarn';
    if (up.includes('package-lock.json')) return 'npm';
  } catch {
    // ignore
  }
  return 'pnpm';
}

main().catch((err) => {
  console.error('[scaffold] failed:', err);
  process.exit(1);
});
