#!/usr/bin/env node

/**
 * Deployment Preparation Script
 * This script helps prepare your ROI Calculator for deployment
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 ROI Calculator - Deployment Preparation\n');

// Check if required files exist
const checks = [
  {
    name: 'Backend package.json',
    path: './backend/package.json',
    required: true
  },
  {
    name: 'Frontend package.json',
    path: './frontend/package.json',
    required: true
  },
  {
    name: 'Backend .env',
    path: './backend/.env',
    required: true
  },
  {
    name: 'Frontend .env.production',
    path: './frontend/.env.production',
    required: true
  },
  {
    name: 'Frontend .env.development',
    path: './frontend/.env.development',
    required: false
  },
  {
    name: '.gitignore',
    path: './.gitignore',
    required: true
  }
];

let allPassed = true;

console.log('📋 Checking required files...\n');

checks.forEach(check => {
  const exists = fs.existsSync(path.join(__dirname, check.path));
  const status = exists ? '✅' : (check.required ? '❌' : '⚠️');
  const message = exists ? 'Found' : (check.required ? 'MISSING (Required)' : 'Missing (Optional)');
  
  console.log(`${status} ${check.name}: ${message}`);
  
  if (!exists && check.required) {
    allPassed = false;
  }
});

console.log('\n' + '='.repeat(60) + '\n');

// Check .gitignore content
console.log('🔍 Checking .gitignore configuration...\n');

if (fs.existsSync('./.gitignore')) {
  const gitignoreContent = fs.readFileSync('./.gitignore', 'utf8');
  const requiredPatterns = [
    'node_modules',
    '.env',
    'backend/.env'
  ];
  
  requiredPatterns.forEach(pattern => {
    const included = gitignoreContent.includes(pattern);
    const status = included ? '✅' : '❌';
    console.log(`${status} ${pattern} ${included ? 'ignored' : 'NOT IGNORED (Add to .gitignore!)'}`);
    
    if (!included) {
      allPassed = false;
    }
  });
} else {
  console.log('❌ .gitignore file not found!');
  allPassed = false;
}

console.log('\n' + '='.repeat(60) + '\n');

// Check environment variables
console.log('🔐 Checking environment variables...\n');

if (fs.existsSync('./backend/.env')) {
  const envContent = fs.readFileSync('./backend/.env', 'utf8');
  const requiredVars = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME', 'DB_PORT'];
  
  requiredVars.forEach(varName => {
    const exists = envContent.includes(varName);
    const status = exists ? '✅' : '❌';
    console.log(`${status} ${varName} ${exists ? 'configured' : 'MISSING'}`);
    
    if (!exists) {
      allPassed = false;
    }
  });
}

console.log('\n' + '='.repeat(60) + '\n');

// Check if Git is initialized
console.log('📦 Checking Git repository...\n');

if (fs.existsSync('./.git')) {
  console.log('✅ Git repository initialized');
} else {
  console.log('❌ Git not initialized. Run: git init');
  allPassed = false;
}

console.log('\n' + '='.repeat(60) + '\n');

// Final summary
if (allPassed) {
  console.log('✅ All checks passed! Your project is ready for deployment.\n');
  console.log('📚 Next steps:');
  console.log('   1. Commit your changes: git add . && git commit -m "Ready for deployment"');
  console.log('   2. Push to GitHub: git push');
  console.log('   3. Follow DEPLOYMENT_GUIDE.md for detailed instructions');
  console.log('   4. Use DEPLOYMENT_CHECKLIST.md to track progress\n');
} else {
  console.log('❌ Some checks failed. Please fix the issues above before deploying.\n');
  console.log('📚 Resources:');
  console.log('   - See DEPLOYMENT_GUIDE.md for setup instructions');
  console.log('   - Check .env.example for required environment variables');
  console.log('   - Ensure all dependencies are installed: npm install\n');
}

console.log('🎯 Deployment Resources:');
console.log('   - Full Guide: DEPLOYMENT_GUIDE.md');
console.log('   - Checklist: DEPLOYMENT_CHECKLIST.md');
console.log('   - Quick Start: QUICK_START.md\n');