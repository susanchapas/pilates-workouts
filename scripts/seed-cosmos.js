#!/usr/bin/env node

/**
 * Root Seeding Runner
 * Delegates to api workspace seed script
 */

const { spawn } = require('child_process');
const path = require('path');

const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run') || args.includes('-d');

const scriptName = isDryRun ? 'seed:dry-run' : 'seed';
const child = spawn('npm', ['run', scriptName, '--workspace=api'], {
  stdio: 'inherit',
  cwd: path.resolve(__dirname, '..'),
  env: process.env,
});

child.on('close', (code) => {
  process.exit(code || 0);
});
