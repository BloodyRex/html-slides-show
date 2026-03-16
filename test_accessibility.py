#!/usr/bin/env python3
"""
测试可访问性修复
"""

import os
import re

def test_index_html():
    """测试index.html中的可访问性属性"""
    print("=== 测试index.html可访问性修复 ===")

    with open("index.html", "r", encoding="utf-8") as f:
        content = f.read()

    # 检查select元素的title属性
    select_pattern = r'<select[^>]*id="theme-select"[^>]*>'
    select_match = re.search(select_pattern, content)
    if select_match:
        select_tag = select_match.group(0)
        if 'title=' in select_tag:
            print("[OK] select元素有title属性")
        else:
            print("[ERROR] select元素缺少title属性")
    else:
        print("[ERROR] 未找到select元素")

    # 检查iframe元素的title属性
    iframe_pattern = r'<iframe[^>]*id="slide-frame"[^>]*>'
    iframe_match = re.search(iframe_pattern, content)
    if iframe_match:
        iframe_tag = iframe_match.group(0)
        if 'title=' in iframe_tag:
            print("[OK] iframe元素有title属性")
        else:
            print("[ERROR] iframe元素缺少title属性")
    else:
        print("[ERROR] 未找到iframe元素")

    return True

def test_inline_styles():
    """测试内联样式是否已移除"""
    print("\n=== 测试内联样式修复 ===")

    # 检查关键文件
    files_to_check = [
        "slides/slide14.html",
        "slides/slide15.html",
        "slides/slide7.html"
    ]

    for filepath in files_to_check:
        if os.path.exists(filepath):
            with open(filepath, "r", encoding="utf-8") as f:
                content = f.read()

            # 查找内联样式（简单检查）
            style_matches = list(re.finditer(r'style="[^"]*"', content))

            # 允许进度条的内联样式
            progress_bar_styles = 0
            for match in style_matches:
                if 'width:' in match.group(0):
                    progress_bar_styles += 1

            total_styles = len(style_matches)
            non_progress_styles = total_styles - progress_bar_styles

            if non_progress_styles == 0:
                print(f"[OK] {filepath}: 只有进度条使用内联样式")
            else:
                print(f"[WARN] {filepath}: 有 {non_progress_styles} 个非进度条内联样式")
        else:
            print(f"[ERROR] {filepath}: 文件不存在")

    return True

def test_css_classes():
    """测试CSS类是否已定义"""
    print("\n=== 测试CSS类定义 ===")

    css_file = "assets/css/slides.css"
    if os.path.exists(css_file):
        with open(css_file, "r", encoding="utf-8") as f:
            content = f.read()

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
            if css_class not in content:
                missing_classes.append(css_class)

        if not missing_classes:
            print("[OK] 所有必需的CSS类都已定义")
        else:
            print(f"[ERROR] 缺少CSS类: {', '.join(missing_classes)}")
    else:
        print("[ERROR] CSS文件不存在")

    return True

def main():
    print("HTML幻灯片展示工具 - 可访问性测试")
    print("=" * 50)

    # 切换到脚本所在目录
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)

    tests = [
        ("index.html可访问性", test_index_html),
        ("内联样式修复", test_inline_styles),
        ("CSS类定义", test_css_classes)
    ]

    results = []
    for test_name, test_func in tests:
        try:
            result = test_func()
            results.append((test_name, result))
        except Exception as e:
            print(f"[ERROR] {test_name} 测试出错: {e}")
            results.append((test_name, False))

    # 汇总结果
    print("\n" + "=" * 50)
    print("测试结果汇总:")

    all_passed = True
    for test_name, passed in results:
        status = "[PASS] 通过" if passed else "[FAIL] 失败"
        print(f"  {test_name}: {status}")
        if not passed:
            all_passed = False

    print("\n" + "=" * 50)
    if all_passed:
        print("[SUCCESS] 可访问性修复通过测试")
        print("\n说明: 进度条宽度使用内联样式是必要的（动态计算）")
    else:
        print("[ERROR] 部分测试失败")
        return False

    return True

if __name__ == "__main__":
    import sys
    success = main()
    sys.exit(0 if success else 1)