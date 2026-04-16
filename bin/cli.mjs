#!/usr/bin/env node
/**
 * playlist-system CLI
 *
 * Commands:
 *   npx playlist-system install          → installs the skill in .claude/skills/ of current project
 *   npx playlist-system install --global → installs in ~/.claude/skills/ (available in all projects)
 *   npx playlist-system scaffold ...     → proxy for scripts/scaffold.mjs
 *
 * Works in Claude Code, Cursor, Windsurf, Codex — any environment that
 * reads skills from .claude/skills/.
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import url from 'node:url';
import os from 'node:os';
import { execFileSync } from 'node:child_process';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SKILL_ROOT = path.resolve(__dirname, '..');

// ─── Helpers ────────────────────────────────────────────────────

function log(msg) { console.log(`\x1b[36m[playlist-system]\x1b[0m ${msg}`); }
function warn(msg) { console.warn(`\x1b[33m[playlist-system]\x1b[0m ${msg}`); }
function err(msg) { console.error(`\x1b[31m[playlist-system]\x1b[0m ${msg}`); process.exit(1); }

async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      // Skip folders that are not part of the installed skill
      if (['node_modules', '.git', 'bin'].includes(entry.name)) continue;
      await copyDir(s, d);
    } else {
      // Skip npm/git metadata files
      if (['package-lock.json', '.npmignore', '.gitignore'].includes(entry.name)) continue;
      await fs.copyFile(s, d);
    }
  }
}

async function dirExists(p) {
  try { return (await fs.stat(p)).isDirectory(); } catch { return false; }
}

async function fileExists(p) {
  try { return (await fs.stat(p)).isFile(); } catch { return false; }
}

// ─── install ────────────────────────────────────────────────────

async function install(args) {
  const isGlobal = args.includes('--global') || args.includes('-g');

  let targetBase;
  if (isGlobal) {
    targetBase = path.join(os.homedir(), '.claude', 'skills');
  } else {
    // Walk up until finding .git or package.json to consider project root
    let dir = process.cwd();
    while (dir !== path.dirname(dir)) {
      if (await fileExists(path.join(dir, 'package.json')) || await dirExists(path.join(dir, '.git'))) break;
      dir = path.dirname(dir);
    }
    targetBase = path.join(dir, '.claude', 'skills');
  }

  const dest = path.join(targetBase, 'playlist-system');
  const scope = isGlobal ? 'global (~/.claude/skills/)' : `project (${targetBase})`;

  // If it already exists, ask (but in npx normally non-interactive, so overwrite with warning)
  if (await dirExists(dest)) {
    warn(`already exists at ${dest} — overwriting.`);
    await fs.rm(dest, { recursive: true, force: true });
  }

  log(`installing skill in ${scope}...`);
  await copyDir(SKILL_ROOT, dest);

  // Create minimal package.json at skill root if it doesn't exist (so it can be
  // referenced as dependency of tokens by child projects)
  const pkgPath = path.join(dest, 'package.json');
  if (!(await fileExists(pkgPath))) {
    await fs.writeFile(pkgPath, JSON.stringify({
      name: 'playlist-system',
      version: '1.0.0',
      private: true,
      type: 'module',
    }, null, 2) + '\n');
  }

  log(`installed successfully.`);
  console.log();
  console.log(`  Skill available at: ${dest}`);
  console.log();

  if (isGlobal) {
    console.log(`  The skill is now detected globally in any project.`);
    console.log(`  Claude will activate it automatically in marked projects`);
    console.log(`  (that have PROTOTYPE.md mentioning playlist-system,`);
    console.log(`   theme.ts importing from adapters, or dep in package.json).`);
    console.log(`  In new projects, Claude will ask once if you want to use it.`);
  } else {
    console.log(`  The skill is now detected in this project.`);
    console.log(`  Claude will activate it automatically in UI tasks.`);
  }

  console.log();
  console.log(`  Next step: open Claude Code / Cursor and request a prototype.`);
  console.log(`  Example: "create a CRM dashboard with sidebar, KPIs and leads table"`);
  console.log();
}

// ─── scaffold ───────────────────────────────────────────────────

function scaffold(args) {
  const scriptPath = path.join(SKILL_ROOT, 'scripts', 'scaffold.mjs');
  try {
    execFileSync('node', [scriptPath, ...args], { stdio: 'inherit' });
  } catch (e) {
    process.exit(e.status ?? 1);
  }
}

// ─── main ───────────────────────────────────────────────────────

const [command, ...rest] = process.argv.slice(2);

switch (command) {
  case 'install':
  case 'i':
    install(rest);
    break;

  case 'scaffold':
  case 'new':
    scaffold(rest);
    break;

  case 'help':
  case '--help':
  case '-h':
  case undefined:
    console.log(`
  playlist-system — design system for UI prototypes with MUI v6 + RN Paper

  Commands:

    npx playlist-system install           Installs the skill in .claude/skills/ of current project
    npx playlist-system install --global  Installs in ~/.claude/skills/ (all projects)
    npx playlist-system scaffold          Creates a new prototype from the template
    npx playlist-system help              Shows this help

  Scaffold flags:
    --target <web|native>      Platform
    --theme  <playlist|smartdesk>  Visual theme
    --dest   <path>            New project folder

  Examples:

    npx playlist-system install -g
    npx playlist-system scaffold --target web --theme playlist --dest ./my-crm
    npx playlist-system scaffold --target native --theme smartdesk --dest ./app-mobile

  Docs: https://github.com/<your-user>/playlist-system
`);
    break;

  default:
    err(`unknown command: "${command}". Use "npx playlist-system help" to see options.`);
}
