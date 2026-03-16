#!/usr/bin/env python3
"""
测试幻灯片系统完整性
"""

import os
import sys

def check_slide_files():
    """检查所有幻灯片文件是否存在"""
    slides_dir = "slides"
    required_files = [f"slide{i}.html" for i in range(1, 16)]

    print("=== 检查幻灯片文件 ===")

    missing_files = []
    for filename in required_files:
        filepath = os.path.join(slides_dir, filename)
        if os.path.exists(filepath):
            size = os.path.getsize(filepath)
            print(f"[OK] {filename}: {size} bytes")
        else:
            missing_files.append(filename)
            print(f"[ERROR] {filename}: 文件不存在")

    if missing_files:
        print(f"\n错误: 缺少 {len(missing_files)} 个文件")
        return False

    print(f"\n成功: 所有 {len(required_files)} 个幻灯片文件都存在")
    return True

def check_assets():
    """检查资源文件"""
    print("\n=== 检查资源文件 ===")

    required_dirs = ["assets/css", "assets/js"]
    required_files = [
        "assets/css/base.css",
        "assets/css/slides.css",
        "assets/js/config.js",
        "assets/js/navigation.js",
        "assets/js/slides.js",
        "index.html"
    ]

    all_good = True

    # 检查目录
    for dir_path in required_dirs:
        if os.path.isdir(dir_path):
            print(f"[OK] 目录: {dir_path}")
        else:
            print(f"[ERROR] 目录不存在: {dir_path}")
            all_good = False

    # 检查文件
    for file_path in required_files:
        if os.path.exists(file_path):
            size = os.path.getsize(file_path)
            print(f"[OK] {file_path}: {size} bytes")
        else:
            print(f"[ERROR] 文件不存在: {file_path}")
            all_good = False

    return all_good

def check_html_syntax():
    """简单检查HTML文件语法"""
    print("\n=== 检查HTML语法 ===")

    # 检查index.html是否有基本的HTML结构
    index_path = "index.html"
    try:
        with open(index_path, 'r', encoding='utf-8') as f:
            content = f.read()

        if "<!DOCTYPE html>" in content and "<html" in content and "</html>" in content:
            print(f"[OK] {index_path}: 基本HTML结构完整")

            # 检查是否加载了必要的JS文件
            required_js = ["config.js", "navigation.js", "slides.js"]
            for js_file in required_js:
                if js_file in content:
                    print(f"[OK] 加载了 {js_file}")
                else:
                    print(f"[WARN] 未找到 {js_file} 引用")
        else:
            print(f"[ERROR] {index_path}: HTML结构不完整")
            return False

    except Exception as e:
        print(f"[ERROR] 读取 {index_path} 时出错: {e}")
        return False

    return True

def main():
    print("HTML幻灯片展示工具 - 完整性测试")
    print("=" * 50)

    # 切换到脚本所在目录
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)

    # 执行检查
    tests = [
        ("幻灯片文件", check_slide_files),
        ("资源文件", check_assets),
        ("HTML语法", check_html_syntax)
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
        print("[SUCCESS] 所有测试通过！系统完整性良好")
        print("\n下一步: 在浏览器中打开 index.html 进行功能测试")
    else:
        print("[ERROR] 部分测试失败，请检查上述错误")
        sys.exit(1)

if __name__ == "__main__":
    main()