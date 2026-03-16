# HTML幻灯片展示工具Skill

## 概述
一个基于HTML/CSS/JavaScript的幻灯片展示工具，支持8-bit像素风格设计，可用于将Word文档内容转换为交互式网页幻灯片。

## 功能特性

### 核心功能
- **8-bit像素风格设计**：锐利边缘、渐变填充、高对比度文字
- **16:9响应式布局**：自动适应不同屏幕尺寸
- **键盘导航**：左右箭头键、空格键翻页
- **一键全屏**：支持F11快捷键
- **主题切换**：5种预定义主题方案
- **自动前进**：可配置的自动播放功能
- **进度指示**：显示当前进度和页码

### 内容支持
- 从Word文档提取大纲内容
- 支持15张标准幻灯片结构
- 可视化组件：时间线、流程图、架构图
- 响应式图片和图表

### 技术架构
- **前端**：HTML5 + CSS3 + Vanilla JavaScript (ES6+)
- **样式**：CSS Grid/Flexbox + CSS变量主题系统
- **交互**：原生JavaScript事件处理
- **构建**：无构建步骤，直接文件部署

## 文件结构

```
html-slides-show/
├── index.html              # 主框架页面
├── slides/                 # 幻灯片页面目录 (15个文件)
├── assets/                 # 静态资源
│   ├── css/               # 样式文件
│   │   ├── base.css      # 基础设计系统
│   │   └── slides.css    # 幻灯片组件样式
│   ├── js/                # JavaScript模块
│   │   ├── config.js     # 配置系统
│   │   ├── navigation.js # 导航控制
│   │   └── slides.js     # 幻灯片管理
│   └── images/           # 图片资源 (可选)
├── themes/                # 主题JSON配置文件
├── docs/                  # 文档
│   └── slides/           # 幻灯片设计文档
├── skill/                 # Skill配置文件
│   ├── SKILL.md          # 本文档
│   ├── skill.json        # Skill配置
│   ├── templates/        # 模板文件
│   └── examples/         # 示例文件
└── scripts/              # 辅助脚本
    ├── extract_docx.py   # Word文档提取
    └── generate_slides.py # 幻灯片生成
```

## 使用场景

### 1. 从Word文档创建幻灯片
```bash
# 提取Word文档内容
python scripts/extract_docx.py "path/to/document.docx" > outline.md

# 基于大纲生成幻灯片
python scripts/generate_slides.py --outline outline.md --output slides/
```

### 2. 自定义内容
1. 编辑 `docs/slides/slide1.md` 到 `slide15.md` 文件
2. 运行生成脚本重新生成HTML幻灯片
3. 在浏览器中打开 `index.html` 预览

### 3. 主题定制
1. 编辑 `themes/` 目录下的主题配置文件
2. 在 `index.html` 中选择新主题
3. 保存配置到本地存储

### 4. 部署选项
- **本地文件**：直接双击 `index.html`
- **GitHub Pages**：推送到GitHub仓库并启用Pages
- **静态服务器**：使用 `python -m http.server 8000`

## 配置选项

### 主题配置
```json
{
  "active": "teal-trust",
  "switchable": true,
  "persist": true
}
```

### 幻灯片配置
```json
{
  "total": 15,
  "aspectRatio": "16:9",
  "autoAdvance": false,
  "autoAdvanceDelay": 30000,
  "loop": false,
  "startAt": 1
}
```

### 导航配置
```json
{
  "keyboard": true,
  "mouse": true,
  "touch": true,
  "arrows": true,
  "progressBar": true,
  "slideNumbers": true
}
```

## 键盘快捷键

| 快捷键 | 功能 |
|--------|------|
| ← / → | 上一页 / 下一页 |
| 空格键 | 下一页 |
| Page Up/Down | 上一页 / 下一页 |
| Home / End | 第一页 / 最后一页 |
| F11 / f | 切换全屏 |
| a | 切换自动播放 |
| ESC | 退出全屏 |

## 开发指南

### 添加新幻灯片
1. 创建 `docs/slides/slide{N}.md` 文档
2. 定义内容和布局需求
3. 运行生成脚本更新HTML

### 自定义样式
1. 编辑 `assets/css/base.css` 中的CSS变量
2. 添加新组件到 `assets/css/slides.css`
3. 创建新主题到 `themes/` 目录

### 扩展功能
1. 编辑JavaScript模块 (`assets/js/*.js`)
2. 添加新事件监听器
3. 扩展配置系统

## 性能优化

### 加载优化
- 按需加载iframe内容
- CSS和JavaScript最小化
- 图片懒加载

### 渲染优化
- CSS硬件加速
- 减少重绘和回流
- 使用CSS transform代替position

### 内存管理
- 清理未使用的iframe
- 事件监听器解绑
- 本地存储清理

## 浏览器兼容性

| 浏览器 | 版本 | 支持状态 |
|--------|------|----------|
| Chrome | 60+ | ✅ 完全支持 |
| Firefox | 55+ | ✅ 完全支持 |
| Edge | 79+ | ✅ 完全支持 |
| Safari | 12+ | ✅ 基本支持 |
| iOS Safari | 12+ | ✅ 基本支持 |
| Android Chrome | 60+ | ✅ 完全支持 |

## 已知限制

1. **文件协议限制**：某些浏览器在file://协议下限制JavaScript模块
2. **跨域限制**：iframe加载本地文件可能有安全限制
3. **存储限制**：本地存储有5MB大小限制
4. **字体加载**：需要网络连接加载Google Fonts

## 故障排除

### 常见问题
1. **幻灯片无法加载**：检查文件路径和服务器配置
2. **键盘快捷键无效**：检查浏览器焦点和事件监听器
3. **主题不生效**：检查CSS变量和应用顺序
4. **全屏不可用**：检查浏览器权限和API支持

### 调试模式
```javascript
// 在浏览器控制台中启用调试
window.configManager.debug = true;
window.navigationManager.debug = true;
```

## 许可证
MIT License - 可自由使用、修改和分发

## 作者
Rex - rex@example.com

## 版本历史
- v1.0.0 (2026-03-16): 初始版本，包含15张幻灯片和完整功能