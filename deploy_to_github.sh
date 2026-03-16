#!/bin/bash
# HTML幻灯片展示工具 - GitHub部署脚本
# 使用说明：在项目根目录运行此脚本

echo "================================"
echo "HTML幻灯片展示工具 - GitHub部署脚本"
echo "================================"

# 检查是否在项目根目录
if [ ! -f "index.html" ] || [ ! -d "slides" ]; then
    echo "错误：请确保在项目根目录运行此脚本"
    echo "当前目录：$(pwd)"
    exit 1
fi

echo "1. 检查GitHub CLI登录状态..."
gh auth status > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "   ❌ GitHub CLI未登录"
    echo "   请运行以下命令登录："
    echo "   gh auth login"
    echo ""
    echo "   或手动执行以下步骤："
    echo "   1. 访问 https://github.com/new 创建新仓库"
    echo "   2. 运行：git remote add origin https://github.com/用户名/html-slides-show.git"
    echo "   3. 运行：git push -u origin master"
    echo "   4. 在GitHub仓库设置中启用GitHub Pages"
    exit 1
fi

echo "   ✅ GitHub CLI已登录"

echo ""
echo "2. 创建GitHub仓库..."
echo "   仓库名称：html-slides-show"
echo "   描述：HTML幻灯片展示工具：8-bit像素风格，支持键盘导航、全屏功能、主题切换"
echo "   可见性：公开"

gh repo create html-slides-show --public --description "HTML幻灯片展示工具：8-bit像素风格，支持键盘导航、全屏功能、主题切换" --confirm

if [ $? -eq 0 ]; then
    echo "   ✅ 仓库创建成功"
else
    echo "   ⚠️  仓库可能已存在或创建失败"
    echo "   尝试直接推送代码..."
fi

echo ""
echo "3. 推送代码到GitHub..."
git push -u origin master

if [ $? -eq 0 ]; then
    echo "   ✅ 代码推送成功"
else
    echo "   ❌ 代码推送失败"
    echo "   请检查远程仓库配置："
    echo "   git remote -v"
    echo "   如需添加远程仓库，运行："
    echo "   git remote add origin https://github.com/用户名/html-slides-show.git"
    exit 1
fi

echo ""
echo "4. 启用GitHub Pages..."
echo "   请手动完成以下步骤："
echo "   1. 访问：https://github.com/$(gh api user --jq '.login')/html-slides-show/settings/pages"
echo "   2. 在 'Source' 部分："
echo "      - Branch: 选择 'master'"
echo "      - Folder: 选择 '/ (root)'"
echo "   3. 点击 'Save'"
echo ""
echo "   或者使用GitHub CLI（如果支持）："
echo "   gh api repos/$(gh api user --jq '.login')/html-slides-show/pages --method POST --field source=@<(echo '{\"branch\":\"master\",\"path\":\"/\"}') 2>/dev/null || echo 'Pages可能需要手动配置'"

echo ""
echo "5. 等待部署..."
echo "   部署完成后，您的幻灯片将在以下地址可用："
echo "   https://$(gh api user --jq '.login').github.io/html-slides-show"
echo ""
echo "   部署状态："
echo "   https://github.com/$(gh api user --jq '.login')/html-slides-show/deployments"

echo ""
echo "6. 测试部署..."
echo "   等待约2分钟后，访问以下链接测试："
echo "   curl -s -o /dev/null -w \"%{http_code}\" https://$(gh api user --jq '.login').github.io/html-slides-show"
echo ""
echo "   预期结果：200（成功）"

echo ""
echo "================================"
echo "部署完成！"
echo "================================"
echo ""
echo "📚 详细文档："
echo "   - 项目文档：README.md"
echo "   - 部署指南：DEPLOYMENT_GUIDE.md"
echo ""
echo "🌐 在线演示："
echo "   https://$(gh api user --jq '.login').github.io/html-slides-show"
echo ""
echo "🔧 后续更新："
echo "   git add ."
echo "   git commit -m \"更新内容\""
echo "   git push"
echo ""
echo "🚀 开始使用您的在线幻灯片展示工具吧！"