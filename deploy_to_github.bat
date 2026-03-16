@echo off
REM HTML幻灯片展示工具 - GitHub部署脚本（Windows版本）
REM 使用说明：在项目根目录运行此脚本

echo ================================
echo HTML幻灯片展示工具 - GitHub部署脚本
echo ================================

REM 检查是否在项目根目录
if not exist "index.html" (
    echo 错误：请确保在项目根目录运行此脚本
    echo 当前目录：%cd%
    pause
    exit /b 1
)

if not exist "slides" (
    echo 错误：请确保在项目根目录运行此脚本
    echo 当前目录：%cd%
    pause
    exit /b 1
)

echo 1. 检查GitHub CLI登录状态...
gh auth status > nul 2>&1
if errorlevel 1 (
    echo   ❌ GitHub CLI未登录
    echo   请运行以下命令登录：
    echo   gh auth login
    echo.
    echo   或手动执行以下步骤：
    echo   1. 访问 https://github.com/new 创建新仓库
    echo   2. 运行：git remote add origin https://github.com/用户名/html-slides-show.git
    echo   3. 运行：git push -u origin master
    echo   4. 在GitHub仓库设置中启用GitHub Pages
    pause
    exit /b 1
)

echo   ✅ GitHub CLI已登录

echo.
echo 2. 创建GitHub仓库...
echo   仓库名称：html-slides-show
echo   描述：HTML幻灯片展示工具：8-bit像素风格，支持键盘导航、全屏功能、主题切换
echo   可见性：公开

gh repo create html-slides-show --public --description "HTML幻灯片展示工具：8-bit像素风格，支持键盘导航、全屏功能、主题切换" --confirm

if errorlevel 1 (
    echo   ⚠️  仓库可能已存在或创建失败
    echo   尝试直接推送代码...
)

echo.
echo 3. 推送代码到GitHub...
git push -u origin master

if errorlevel 1 (
    echo   ❌ 代码推送失败
    echo   请检查远程仓库配置：
    echo   git remote -v
    echo   如需添加远程仓库，运行：
    echo   git remote add origin https://github.com/用户名/html-slides-show.git
    pause
    exit /b 1
)

echo   ✅ 代码推送成功

echo.
echo 4. 启用GitHub Pages...
echo   请手动完成以下步骤：
echo   1. 访问您的GitHub仓库设置页面
echo   2. 在左侧菜单选择 "Pages"
echo   3. 在 "Source" 部分：
echo      - Branch: 选择 "master"
echo      - Folder: 选择 "/ (root)"
echo   4. 点击 "Save"
echo.
echo   等待1-2分钟部署完成...

echo.
echo 5. 访问在线演示...
echo   部署完成后，您的幻灯片将在以下地址可用：
echo   https://您的用户名.github.io/html-slides-show
echo.
echo   如需获取您的用户名，运行：gh api user --jq ".login"

echo.
echo ================================
echo 部署完成！
echo ================================
echo.
echo 📚 详细文档：
echo    - 项目文档：README.md
echo    - 部署指南：DEPLOYMENT_GUIDE.md
echo.
echo 🔧 后续更新：
echo    git add .
echo    git commit -m "更新内容"
echo    git push
echo.
echo 🚀 开始使用您的在线幻灯片展示工具吧！
pause