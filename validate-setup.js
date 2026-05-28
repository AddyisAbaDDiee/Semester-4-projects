/**
 * APEX Setup Validator
 * Checks all configurations and dependencies
 */

import fs from 'fs';
import path from 'path';

const checks = [];

function check(name, condition, details = '') {
  checks.push({
    name,
    passed: condition,
    details
  });
}

// Check Node version
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
check(
  'Node.js 18+',
  majorVersion >= 18,
  `Found: ${nodeVersion}`
);

// Check npm exists
const npmPath = path.join(path.dirname(process.execPath), 'npm');
check(
  'npm installed',
  fs.existsSync(npmPath) || process.platform === 'win32',
  'npm should be available in PATH'
);

// Check .env file
const envExists = fs.existsSync('.env');
check(
  '.env file exists',
  envExists,
  'Environment configuration file'
);

// Check .env has API key
if (envExists) {
  const envContent = fs.readFileSync('.env', 'utf8');
  const hasApiKey = !envContent.includes('your_key_here') && envContent.includes('ANTHROPIC_API_KEY=');
  check(
    'API key configured',
    hasApiKey,
    hasApiKey ? '✓ API key found' : '❌ Need to add ANTHROPIC_API_KEY'
  );
}

// Check node_modules
const nodeModulesExists = fs.existsSync('node_modules');
check(
  'Dependencies installed',
  nodeModulesExists,
  'node_modules directory'
);

// Check key files exist
const files = [
  'server.js',
  'src/App.jsx',
  'src/main.jsx',
  'src/api/client.js',
  'src/context/AppContext.jsx',
  'vite.config.js',
  'package.json'
];

files.forEach(file => {
  const exists = fs.existsSync(file);
  check(
    `File: ${file}`,
    exists,
    exists ? '✓ Found' : '❌ Missing'
  );
});

// Print results
console.log('\n🔍 APEX Setup Validation\n' + '='.repeat(50) + '\n');

const passed = checks.filter(c => c.passed).length;
const total = checks.length;

checks.forEach(check => {
  const icon = check.passed ? '✅' : '❌';
  console.log(`${icon} ${check.name}`);
  if (check.details) {
    console.log(`   ${check.details}`);
  }
});

console.log('\n' + '='.repeat(50));
console.log(`\nResult: ${passed}/${total} checks passed\n`);

if (passed === total) {
  console.log('✅ All checks passed! You can run:\n');
  console.log('   npm run dev:all\n');
  console.log('Then open: http://localhost:5173\n');
  process.exit(0);
} else {
  console.log('❌ Some checks failed. Please fix the issues above.\n');
  console.log('See GETTING_STARTED.md for help.\n');
  process.exit(1);
}
