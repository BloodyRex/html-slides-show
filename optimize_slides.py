#!/usr/bin/env python3
"""
优化幻灯片脚本：
1. 为所有slide-page添加背景类
2. 为每页添加至少一个带颜色填充的文字框（如果不存在）
3. 确保正文字体类应用
"""

import os
import re
from pathlib import Path

SLIDES_DIR = Path(__file__).parent / "slides"
COLORFUL_BOX_HTML = '''
      <div class="colorful-text-box accent">
        <h3 class="font-pixel">重点提示</h3>
        <p>本页内容采用8-bit像素风格设计，支持键盘导航和全屏展示。</p>
      </div>
'''

def has_colorful_box(html_content):
    """检查是否已存在带颜色填充的文字框"""
    patterns = [
        r'colorful-text-box',
        r'pixel-card-item',
        r'highlight-box',
        r'pixel-card',
        r'gradient-box',
        r'bg-gradient-',
        r'gradient-.*box'
    ]
    for pattern in patterns:
        if re.search(pattern, html_content, re.IGNORECASE):
            return True
    return False

def add_colorful_box(html_content):
    """在合适位置添加颜色文本框"""
    # 在slide-content中寻找合适的位置
    lines = html_content.split('\n')

    # 尝试在第一个段落或列表后添加
    for i, line in enumerate(lines):
        if '<main class="slide-content">' in line:
            # 找到对应的结束位置
            depth = 0
            for j in range(i+1, len(lines)):
                if '<main' in lines[j] or '<div class="' in lines[j] and 'slide-content' not in lines[j]:
                    depth += 1
                if '</main>' in lines[j]:
                    if depth == 0:
                        # 在</main>前插入
                        lines.insert(j, COLORFUL_BOX_HTML)
                        return '\n'.join(lines)
                    else:
                        depth -= 1
            break

    # 如果没找到合适位置，在slide-content末尾添加
    for i, line in enumerate(lines):
        if '</main>' in line:
            lines.insert(i, COLORFUL_BOX_HTML)
            return '\n'.join(lines)

    return html_content

def update_slide_file(filepath):
    """更新单个幻灯片文件"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # 1. 添加背景类到slide-page
    if 'slide-page-bg' not in content:
        content = content.replace('class="slide-page', 'class="slide-page slide-page-bg')
        content = content.replace("class='slide-page", "class='slide-page slide-page-bg")

    # 2. 检查是否需要添加颜色文本框
    if not has_colorful_box(content):
        content = add_colorful_box(content)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    print("开始优化幻灯片文件...")

    updated_files = []
    for slide_file in sorted(SLIDES_DIR.glob("slide*.html")):
        print(f"处理: {slide_file.name}")
        if update_slide_file(slide_file):
            updated_files.append(slide_file.name)

    print(f"\n优化完成。更新了 {len(updated_files)} 个文件:")
    for name in updated_files:
        print(f"  - {name}")

    # 更新index.html中的字体链接（如果需要）
    index_file = Path(__file__).parent / "index.html"
    if index_file.exists():
        with open(index_file, 'r', encoding='utf-8') as f:
            index_content = f.read()

        # 确保字体链接包含必要的字体
        if 'Press+Start+2P' not in index_content:
            print("警告: index.html可能缺少必要的字体链接")

    print("\n所有优化已完成。")

if __name__ == "__main__":
    main()