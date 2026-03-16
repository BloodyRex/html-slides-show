# GitHub发布指南

本指南将帮助您将HTML幻灯片展示工具发布到GitHub，并通过GitHub Pages实现外部网页访问。

## 1. GitHub CLI登录

在终端中运行以下命令登录GitHub：

```bash
gh auth login
```

按提示操作：
1. 选择GitHub.com
2. 选择HTTPS或SSH（推荐HTTPS）
3. 完成浏览器登录认证

## 2. 创建GitHub仓库

### 方法A：使用GitHub CLI（推荐）
```bash
cd "E:\Antigravity-Claude_agent\html-slides-show"
gh repo create html-slides-show --public --description "HTML幻灯片展示工具：8-bit像素风格，支持键盘导航、全屏功能、主题切换"
```

### 方法B：手动在GitHub网站创建
1. 访问 https://github.com/new
2. 填写仓库信息：
   - Repository name: `html-slides-show`
   - Description: `HTML幻灯片展示工具：8-bit像素风格，支持键盘导航、全屏功能、主题切换`
   - Public（公开）
   - 不添加README、.gitignore或license（已包含）

## 3. 推送代码到GitHub

### 如果使用GitHub CLI创建（方法A）：
GitHub CLI会自动添加远程仓库。只需推送代码：

```bash
cd "E:\Antigravity-Claude_agent\html-slides-show"
git push -u origin master
```

### 如果手动创建（方法B）：
需要手动添加远程仓库：

```bash
cd "E:\Antigravity-Claude_agent\html-slides-show"

# 添加远程仓库（将 YOUR_USERNAME 替换为您的GitHub用户名）
git remote add origin https://github.com/YOUR_USERNAME/html-slides-show.git

# 推送代码
git push -u origin master
```

## 4. 启用GitHub Pages

GitHub Pages将静态网站托管在 `https://YOUR_USERNAME.github.io/html-slides-show`

### 启用步骤：
1. 访问仓库页面：`https://github.com/YOUR_USERNAME/html-slides-show`
2. 点击 Settings（设置）
3. 左侧菜单选择 Pages（页面）
4. 在 Source 部分：
   - 选择 Branch: `master`
   - 选择 Folder: `/ (root)`
5. 点击 Save（保存）

### 等待部署完成：
- GitHub Pages通常需要1-2分钟构建
- 页面顶部会显示构建状态
- 成功后会出现绿色提示和访问链接

## 5. 访问您的在线演示

GitHub Pages URL格式：
```
https://YOUR_USERNAME.github.io/html-slides-show
```

**注意**：URL区分大小写，确保仓库名完全匹配。

## 6. 测试在线功能

访问您的在线演示，测试以下功能：

### 基础功能
- ✅ 页面加载：https://YOUR_USERNAME.github.io/html-slides-show
- ✅ 16:9比例：适应不同屏幕尺寸
- ✅ 内容显示：所有15张幻灯片正常加载

### 交互功能
- ✅ 键盘导航：左右箭头键翻页
- ✅ 全屏功能：F11或全屏按钮
- ✅ 主题切换：右上角主题选择器
- ✅ 进度指示：底部进度条和页码

### 移动设备
- ✅ 触摸滑动：左滑/右滑翻页
- ✅ 响应式布局：自适应屏幕大小
- ✅ 字体缩放：清晰可读

## 7. 自定义域名（可选）

如需使用自定义域名：

1. 在仓库 Settings → Pages → Custom domain
2. 输入您的域名（如 `slides.yourdomain.com`）
3. 在DNS提供商处添加CNAME记录：
   ```
   slides.yourdomain.com CNAME YOUR_USERNAME.github.io
   ```

## 8. 更新内容

如需更新幻灯片内容：

```bash
cd "E:\Antigravity-Claude_agent\html-slides-show"

# 编辑文件...
# 例如：修改 slides/slide1.html

# 提交更改
git add .
git commit -m "更新幻灯片内容"

# 推送到GitHub
git push

# GitHub Pages会自动重新部署（约1-2分钟）
```

## 故障排除

### 常见问题

1. **404错误**
   - 检查仓库名称大小写
   - 确认GitHub Pages已正确配置
   - 等待部署完成（刷新页面）

2. **样式/脚本不加载**
   - 检查控制台错误（F12 → Console）
   - 确认文件路径正确（相对路径使用 `./`）
   - 确保所有资源文件已提交

3. **键盘快捷键无效**
   - 确认页面获得焦点
   - 检查控制台JavaScript错误

4. **移动设备问题**
   - 测试响应式设计
   - 检查视口设置

### 验证部署

运行测试脚本验证部署：
```bash
python test_slides.py
```

## 项目结构说明

```
html-slides-show/
├── index.html              # 主框架页面
├── slides/                 # 15张幻灯片HTML文件
├── assets/                 # 样式和脚本资源
│   ├── css/
│   │   ├── base.css      # 8-bit设计系统
│   │   └── slides.css    # 幻灯片组件样式
│   └── js/
│       ├── config.js     # 主题配置
│       ├── navigation.js # 键盘/触摸导航
│       └── slides.js     # 幻灯片管理
└── skill/                 # Claude技能配置
```

## 技术支持

如需帮助：
1. 检查GitHub Pages文档：https://docs.github.com/pages
2. 查看项目README.md文件
3. 在GitHub仓库创建Issue

---
**发布完成**：现在您的HTML幻灯片展示工具已在线可用，可以通过外部网页直接访问！