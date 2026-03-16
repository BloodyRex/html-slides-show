#!/usr/bin/env python3
"""
修复幻灯片中的内联样式问题
1. 移除进度条的内联样式，改用JavaScript动态设置
2. 为特定幻灯片添加CSS类
"""

import os
import re
import sys

def fix_progress_bar_inline_styles():
    """修复所有幻灯片中进度条的内联样式"""
    print("=== 修复进度条内联样式 ===")

    # 修复所有15个幻灯片文件
    for i in range(1, 16):
        filename = f"slides/slide{i}.html"
        if not os.path.exists(filename):
            print(f"[ERROR] {filename} 不存在")
            continue

        with open(filename, "r", encoding="utf-8") as f:
            content = f.read()

        # 查找进度条内联样式
        pattern = r'<div class="slide-progress-bar" style="width: ([\d\.]+)%;"></div>'
        match = re.search(pattern, content)

        if match:
            # 获取进度百分比
            width_percent = match.group(1)

            # 替换为id，移除内联样式
            new_progress_bar = '<div class="slide-progress-bar" id="progress-bar"></div>'
            content = re.sub(pattern, new_progress_bar, content)

            # 查找script标签，添加进度条设置代码
            script_pattern = r'(<script>\s*document\.addEventListener\(\'DOMContentLoaded\', \(\) => \{)(.*?)(\}\s*\);\s*</script>)'
            script_match = re.search(script_pattern, content, re.DOTALL)

            if script_match:
                script_start = script_match.group(1)
                script_body = script_match.group(2)
                script_end = script_match.group(3)

                # 添加进度条设置代码
                progress_code = f"""
      // 设置进度条宽度
      const progressBar = document.getElementById('progress-bar');
      if (progressBar) {{
        const slideId = {i};
        const progress = (slideId / 15) * 100;
        progressBar.style.width = `${{progress}}%`;
      }}
"""
                new_script_body = progress_code + script_body
                new_script = script_start + new_script_body + script_end
                content = re.sub(script_pattern, new_script, content, flags=re.DOTALL)

                print(f"[OK] {filename}: 修复进度条内联样式 (原宽度: {width_percent}%)")
            else:
                print(f"[WARN] {filename}: 未找到script标签，手动添加")
                # 在</body>前添加script
                body_end_pattern = r'(</body>)'
                progress_code = f"""
  <script>
    document.addEventListener('DOMContentLoaded', () => {{
      // 设置进度条宽度
      const progressBar = document.getElementById('progress-bar');
      if (progressBar) {{
        const slideId = {i};
        const progress = (slideId / 15) * 100;
        progressBar.style.width = `${{progress}}%`;
      }}
    }});
  </script>
</body>"""
                content = re.sub(body_end_pattern, progress_code, content)
        else:
            # 检查是否已经修复（使用id）
            id_pattern = r'<div class="slide-progress-bar" id="progress-bar"></div>'
            if re.search(id_pattern, content):
                print(f"[INFO] {filename}: 已修复")
            else:
                print(f"[WARN] {filename}: 未找到进度条或格式不匹配")

        # 写回文件
        with open(filename, "w", encoding="utf-8") as f:
            f.write(content)

    print()

def fix_slide14_styles():
    """修复slide14.html中的内联样式"""
    print("=== 修复slide14.html内联样式 ===")

    filename = "slides/slide14.html"
    if not os.path.exists(filename):
        print(f"[ERROR] {filename} 不存在")
        return

    with open(filename, "r", encoding="utf-8") as f:
        content = f.read()

    # 修复内联样式为CSS类
    replacements = [
        (r'<div class="content-section" style="text-align: center; margin-top: 100px;">',
         '<div class="content-section center-top-100">'),
        (r'<div class="highlight-text" style="font-size: 2\.5rem; margin-top: var\(--spacing-md\);">',
         '<div class="highlight-text highlight-large">'),
        (r'<p style="margin-top: var\(--spacing-xl\); font-size: 1\.5rem;">',
         '<p class="quote-large">')
    ]

    changes_made = 0
    for pattern, replacement in replacements:
        if re.search(pattern, content):
            content = re.sub(pattern, replacement, content)
            changes_made += 1

    if changes_made > 0:
        print(f"[OK] {filename}: 修复了 {changes_made} 处内联样式")
    else:
        print(f"[INFO] {filename}: 无需修复")

    # 写回文件
    with open(filename, "w", encoding="utf-8") as f:
        f.write(content)

    print()

def fix_slide15_styles():
    """修复slide15.html中的内联样式"""
    print("=== 修复slide15.html内联样式 ===")

    filename = "slides/slide15.html"
    if not os.path.exists(filename):
        print(f"[ERROR] {filename} 不存在")
        return

    with open(filename, "r", encoding="utf-8") as f:
        content = f.read()

    # 修复内联样式为CSS类
    replacements = [
        (r'<div class="content-section" style="text-align: center; margin-top: 150px;">',
         '<div class="content-section center-top-150">'),
        (r'<p style="font-size: 2\.5rem; margin-bottom: var\(--spacing-xl\);">',
         '<p class="thank-you-text">'),
        (r'<p style="font-size: 1\.2rem; color: var\(--color-secondary\);">',
         '<p class="qa-subtitle">'),
        (r'<div class="content-section" style="position: absolute; bottom: 100px; left: 0; right: 0; text-align: center;">',
         '<div class="content-section footer-contact">'),
        (r'<p style="font-size: 0\.9rem; color: var\(--color-medium\);">',
         '<p class="contact-info">')
    ]

    changes_made = 0
    for pattern, replacement in replacements:
        if re.search(pattern, content):
            content = re.sub(pattern, replacement, content)
            changes_made += 1

    if changes_made > 0:
        print(f"[OK] {filename}: 修复了 {changes_made} 处内联样式")
    else:
        print(f"[INFO] {filename}: 无需修复")

    # 写回文件
    with open(filename, "w", encoding="utf-8") as f:
        f.write(content)

    print()

def fix_slide7_styles():
    """修复slide7.html中的内联样式"""
    print("=== 修复slide7.html内联样式 ===")

    filename = "slides/slide7.html"
    if not os.path.exists(filename):
        print(f"[ERROR] {filename} 不存在")
        return

    with open(filename, "r", encoding="utf-8") as f:
        content = f.read()

    # 修复内联样式为CSS类
    replacements = [
        (r'<h2 class="section-title" style="color: var\(--color-error\); margin-top: var\(--spacing-lg\);">',
         '<h2 class="section-title section-error">'),
        (r'<h2 class="section-title" style="color: var\(--color-success\);">',
         '<h2 class="section-title section-success">')
    ]

    changes_made = 0
    for pattern, replacement in replacements:
        if re.search(pattern, content):
            content = re.sub(pattern, replacement, content)
            changes_made += 1

    if changes_made > 0:
        print(f"[OK] {filename}: 修复了 {changes_made} 处内联样式")
    else:
        print(f"[INFO] {filename}: 无需修复")

    # 写回文件
    with open(filename, "w", encoding="utf-8") as f:
        f.write(content)

    print()

def check_css_classes():
    """检查CSS类是否已定义"""
    print("=== 检查CSS类定义 ===")

    css_file = "assets/css/slides.css"
    if not os.path.exists(css_file):
        print(f"[ERROR] {css_file} 不存在")
        return False

    with open(css_file, "r", encoding="utf-8") as f:
        css_content = f.read()

    required_classes = [
        ".center-top-100",
        ".highlight-large",
        ".quote-large",
        ".center-top-150",
        ".thank-you-text",
        ".qa-subtitle",
        ".footer-contact",
        ".contact-info",
        ".section-error",
        ".section-success"
    ]

    missing_classes = []
    for css_class in required_classes:
        if css_class not in css_content:
            missing_classes.append(css_class)

    if missing_classes:
        print(f"[ERROR] 缺少CSS类: {', '.join(missing_classes)}")
        return False
    else:
        print("[OK] 所有必需的CSS类都已定义")
        return True

def main():
    print("HTML幻灯片展示工具 - 内联样式修复")
    print("=" * 50)

    # 切换到脚本所在目录
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)

    # 检查CSS类
    if not check_css_classes():
        print("\n[ERROR] 请先确保CSS类已定义")
        sys.exit(1)

    # 执行修复
    fix_progress_bar_inline_styles()
    fix_slide14_styles()
    fix_slide15_styles()
    fix_slide7_styles()

    print("=" * 50)
    print("[SUCCESS] 内联样式修复完成")
    print("\n注意: 进度条宽度通过JavaScript动态设置，这是必要的")

    return True

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)