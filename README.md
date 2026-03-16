# HTML幻灯片展示工具

一个基于HTML/CSS/JavaScript的幻灯片展示工具，支持8-bit像素风格设计，可从Word文档内容创建交互式网页幻灯片。

## ✨ 特性

- 🎨 **8-bit像素风格设计**：锐利边缘、渐变填充、高对比度文字
- 📱 **16:9响应式布局**：自动适应不同屏幕尺寸
- ⌨️ **键盘导航**：左右箭头键、空格键翻页
- 🖥️ **一键全屏**：支持F11快捷键
- 🎭 **主题切换**：5种预定义主题方案
- ⏱️ **自动前进**：可配置的自动播放功能
- 📊 **进度指示**：显示当前进度和页码
- 📄 **Word文档支持**：从.docx文件提取内容
- 🎯 **可视化组件**：时间线、流程图、架构图

## 🚀 快速开始

### 方法1：直接打开
```bash
# 在浏览器中直接打开
open index.html
# 或双击 index.html 文件
```

### 方法2：本地服务器
```bash
# 使用Python启动HTTP服务器
python -m http.server 8000

# 访问 http://localhost:8000
```

### 方法3：GitHub Pages
1. 将项目推送到GitHub仓库
2. 在仓库设置中启用GitHub Pages
3. 访问生成的URL

## 🎮 使用指南

### 导航控制
- **键盘快捷键**：
  - ← / →：上一页/下一页
  - 空格键：下一页
  - Page Up/Down：上一页/下一页
  - Home/End：第一页/最后一页
  - F11/f：切换全屏
  - a：切换自动播放
  - ESC：退出全屏

- **鼠标控制**：
  - 点击左右箭头按钮翻页
  - 点击进度条跳转到指定位置
  - 点击主题选择器切换主题

- **触摸控制**（移动设备）：
  - 左滑：下一页
  - 右滑：上一页
  - 双击：切换全屏

### 主题切换
1. 点击右上角的主题选择器
2. 选择预定义主题：
   - **Teal Trust** (默认)：科技感蓝绿色系
   - **Midnight Executive**：深色商务风格
   - **Coral Energy**：珊瑚色活力风格
   - **Forest Growth**：森林绿色自然风格
   - **Sunset Harmony**：日落橙色温暖风格

3. 主题会自动保存到本地存储

## 📁 项目结构

```
html-slides-show/
├── index.html              # 主框架页面
├── slides/                 # 幻灯片页面目录 (15个文件)
│   ├── slide1.html        # 封面页
│   ├── slide2.html        # 自我介绍页
│   ├── ...               # 其他13张幻灯片
│   └── slide15.html       # Q&A页
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
│   ├── slides/           # 幻灯片设计文档
│   └── outline.md        # Word文档提取的大纲
├── scripts/              # 辅助脚本
│   ├── extract_docx.py   # Word文档提取
│   └── generate_slides.py # 幻灯片生成
└── skill/                # Skill配置文件
    ├── SKILL.md          # Skill说明
    ├── skill.json        # Skill配置
    ├── templates/        # 模板文件
    └── examples/         # 示例文件
```

## 🛠️ 开发指南

### 从Word文档创建新幻灯片

1. **提取内容**：
   ```bash
   python scripts/extract_docx.py "your_document.docx" > outline.md
   ```

2. **编辑幻灯片内容**：
   ```bash
   # 编辑幻灯片设计文档
   vim docs/slides/slide1.md
   ```

3. **生成HTML幻灯片**：
   ```bash
   python generate_remaining_slides.py
   ```

4. **预览和测试**：
   ```bash
   python -m http.server 8000
   # 访问 http://localhost:8000
   ```

### 自定义样式

1. **修改CSS变量**：
   ```css
   /* 在 assets/css/base.css 中 */
   :root {
     --color-primary: #你的颜色;
     --gradient-primary: linear-gradient(你的渐变);
   }
   ```

2. **添加新组件**：
   ```css
   /* 在 assets/css/slides.css 中 */
   .your-component {
     /* 你的样式 */
   }
   ```

3. **创建新主题**：
   ```json
   // 在 themes/your-theme.json 中
   {
     "name": "Your Theme",
     "colors": {
       "primary": "#你的颜色"
     }
   }
   ```

### 扩展功能

1. **添加新JavaScript模块**：
   ```javascript
   // 在 assets/js/ 中创建新文件
   export function yourFunction() {
     // 你的功能
   }
   ```

2. **在index.html中导入**：
   ```html
   <script type="module">
     import { yourFunction } from './assets/js/your-module.js';
   </script>
   ```

## 🧪 测试

### 运行完整性测试
```bash
python test_slides.py
```

### 检查JavaScript模块
```bash
node test_js_modules.js
```

### 浏览器兼容性测试
- Chrome 60+ ✅ 完全支持
- Firefox 55+ ✅ 完全支持
- Edge 79+ ✅ 完全支持
- Safari 12+ ✅ 基本支持
- iOS Safari 12+ ✅ 基本支持
- Android Chrome 60+ ✅ 完全支持

## 🔧 故障排除

### 常见问题

1. **幻灯片无法加载**
   - 检查文件路径是否正确
   - 验证服务器是否在运行
   - 查看浏览器控制台错误

2. **键盘快捷键无效**
   - 确保页面获得焦点
   - 检查事件监听器是否正确绑定
   - 验证快捷键配置

3. **样式不生效**
   - 检查CSS变量定义
   - 验证主题应用顺序
   - 查看浏览器开发者工具

4. **全屏功能不可用**
   - 检查浏览器权限
   - 验证全屏API支持
   - 查看控制台错误信息

### 调试模式
```javascript
// 在浏览器控制台中启用调试
window.configManager.debug = true;
window.navigationManager.debug = true;
window.slidesManager.debug = true;
```

## 📚 技能使用

本项目已打包为Claude技能，可通过以下方式使用：

### 作为Skill使用
```bash
# 技能已安装在 .claude/skills/html-slides-show
# 可以通过Claude Code直接调用
```

### Skill功能
- 从Word文档自动生成HTML幻灯片
- 支持主题选择和自定义
- 一键部署到GitHub Pages或本地服务
- 提供模板和示例

## 🤝 贡献

欢迎提交Issue和Pull Request！

### 开发流程
1. Fork项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建Pull Request

### 代码规范
- 使用ES6+ JavaScript
- 遵循CSS BEM命名约定
- 添加必要的注释
- 编写测试用例

## 📄 许可证

MIT License - 详见 LICENSE 文件

## 📞 联系方式

- 作者：Rex
- 邮箱：rexhr@yahoo.com
- 项目地址：https://github.com/yourusername/html-slides-show

## 🙏 致谢

- 感谢Claude Code提供的开发环境
- 感谢Google Fonts提供的像素字体
- 感谢所有贡献者和用户

---

**开始使用**：双击 `index.html` 或运行 `python -m http.server 8000`