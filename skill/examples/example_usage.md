# HTML幻灯片展示工具使用示例

## 快速开始

### 1. 启动本地服务器
```bash
# 使用Python启动简单HTTP服务器
python -m http.server 8000

# 然后在浏览器中访问
# http://localhost:8000
```

### 2. 导航控制
- **键盘**: 使用左右箭头键翻页
- **鼠标**: 点击界面上的导航按钮
- **触摸**: 在移动设备上滑动

### 3. 主题切换
1. 点击右上角的主题选择器
2. 选择预定义主题：
   - Teal Trust (默认)
   - Midnight Executive
   - Coral Energy
   - Forest Growth
   - Sunset Harmony
3. 主题会自动保存到本地存储

## 从Word文档创建新幻灯片

### 步骤1: 提取内容
```bash
# 使用提取脚本
python scripts/extract_docx.py "your_document.docx" > outline.md

# 查看生成的大纲
cat outline.md
```

### 步骤2: 编辑幻灯片内容
```bash
# 编辑第一张幻灯片
vim docs/slides/slide1.md

# 内容示例:
# 标题: "项目介绍"
# 主要内容: 项目背景、目标、团队成员
# 布局: 单栏布局
# 可视化: 时间线图表
```

### 步骤3: 生成HTML
```bash
# 运行生成脚本
python generate_remaining_slides.py

# 输出示例:
# 已生成: slide1.html - 项目介绍
# 已生成: slide2.html - 问题分析
# ...
```

### 步骤4: 预览和调整
1. 在浏览器中打开 `index.html`
2. 浏览所有幻灯片
3. 检查布局和内容
4. 返回步骤2进行调整

## 自定义主题

### 创建新主题
1. 在 `themes/` 目录创建新JSON文件
2. 定义颜色方案
3. 应用到幻灯片

```json
{
  "name": "Custom Theme",
  "description": "我的自定义主题",
  "colors": {
    "primary": "#FF6F61",
    "secondary": "#88B04B",
    "accent": "#6B5B95",
    "light": "#F7CAC9",
    "dark": "#2A3B47",
    "medium": "#666666"
  }
}
```

### 应用自定义主题
```javascript
// 在浏览器控制台中
window.configManager.switchTheme('custom-theme');
```

## 扩展功能示例

### 添加新幻灯片组件
1. 在 `assets/css/slides.css` 中添加新样式
2. 在JavaScript中添加交互逻辑
3. 在模板中使用新组件

### 集成API数据
```javascript
// 示例: 动态加载数据
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => {
    // 更新幻灯片内容
    document.getElementById('data-container').innerHTML =
      `<pre>${JSON.stringify(data, null, 2)}</pre>`;
  });
```

### 添加演讲者视图
1. 创建 `speaker.html` 文件
2. 显示当前幻灯片和下一张幻灯片
3. 添加计时器和备注功能

## 部署选项

### GitHub Pages
```bash
# 1. 创建GitHub仓库
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/html-slides-show.git
git push -u origin main

# 2. 启用GitHub Pages
# 在仓库设置中，选择 "main" 分支作为源
```

### Netlify
1. 拖放项目文件夹到Netlify
2. 自动部署完成
3. 获得永久链接

### Vercel
```bash
# 安装Vercel CLI
npm i -g vercel

# 部署
vercel
```

## 性能优化技巧

### 图片优化
- 使用WebP格式
- 压缩图片大小
- 实现懒加载

### 代码优化
- 压缩CSS和JavaScript
- 移除未使用的代码
- 使用ES6模块

### 缓存策略
- 设置适当的缓存头
- 使用Service Worker
- 实现离线支持

## 故障排除

### 幻灯片无法加载
- 检查文件路径是否正确
- 验证服务器是否在运行
- 查看浏览器控制台错误

### 键盘快捷键无效
- 确保页面获得焦点
- 检查事件监听器是否正确绑定
- 验证快捷键配置

### 样式不生效
- 检查CSS变量定义
- 验证主题应用顺序
- 查看浏览器开发者工具

## 联系方式
如有问题或建议，请联系：rex@example.com

## 更新日志
- 2026-03-16: 初始版本发布
- 未来计划: 添加导出功能、演讲者视图、远程控制