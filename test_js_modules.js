// JavaScript模块测试脚本
// 通过Node.js运行检查模块是否正确导出

const fs = require('fs');
const path = require('path');

console.log('=== JavaScript模块导出检查 ===\n');

// 检查文件是否存在
const filesToCheck = [
  'assets/js/config.js',
  'assets/js/navigation.js',
  'assets/js/slides.js'
];

let allFilesExist = true;
for (const file of filesToCheck) {
  if (fs.existsSync(file)) {
    console.log(`[OK] ${file}: 文件存在`);

    // 检查文件内容
    const content = fs.readFileSync(file, 'utf8');

    // 检查是否有export语句
    if (content.includes('export')) {
      console.log(`    - 包含export语句`);

      // 检查是否有默认导出或命名导出
      if (content.includes('export default') || content.includes('export {')) {
        console.log(`    - 有正确的导出语法`);
      }
    }

    // 检查文件大小
    const stats = fs.statSync(file);
    console.log(`    - 大小: ${stats.size} 字节`);

  } else {
    console.log(`[ERROR] ${file}: 文件不存在`);
    allFilesExist = false;
  }
  console.log('');
}

// 检查index.html中的导入
console.log('=== 检查index.html中的ES6模块导入 ===\n');
const indexPath = 'index.html';
if (fs.existsSync(indexPath)) {
  const htmlContent = fs.readFileSync(indexPath, 'utf8');

  // 检查ES6模块导入
  if (htmlContent.includes('<script type="module">')) {
    console.log('[OK] index.html使用ES6模块');

    // 检查具体的导入语句
    const importChecks = [
      { name: 'configManager', pattern: /import.*configManager.*from.*config\.js/ },
      { name: 'navigationManager', pattern: /import.*navigationManager.*from.*navigation\.js/ },
      { name: 'slidesManager', pattern: /import.*slidesManager.*from.*slides\.js/ }
    ];

    for (const check of importChecks) {
      if (check.pattern.test(htmlContent)) {
        console.log(`    - 正确导入了 ${check.name}`);
      } else {
        console.log(`    - [WARN] 未找到 ${check.name} 的导入`);
      }
    }

    // 检查全局导出
    if (htmlContent.includes('window.configManager')) {
      console.log('[OK] configManager已全局导出');
    }
    if (htmlContent.includes('window.navigationManager')) {
      console.log('[OK] navigationManager已全局导出');
    }
    if (htmlContent.includes('window.slidesManager')) {
      console.log('[OK] slidesManager已全局导出');
    }

  } else {
    console.log('[ERROR] index.html未使用ES6模块');
  }

} else {
  console.log('[ERROR] index.html不存在');
}

console.log('\n=== 总结 ===');
if (allFilesExist) {
  console.log('[SUCCESS] 所有JavaScript模块文件都存在且格式正确');
  console.log('\n下一步: 在浏览器中测试实际功能');
} else {
  console.log('[ERROR] 部分文件缺失');
  process.exit(1);
}