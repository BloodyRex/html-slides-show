#!/usr/bin/env python3
"""
生成剩余幻灯片HTML文件的脚本
用于快速创建slide8.html到slide15.html
"""

import os

# 幻灯片数据
slides = [
    {
        "id": 8,
        "title": "第四阶段：创造智能技能",
        "filename": "slide8.html",
        "duration": 55,
        "content": """
        <h1 class="slide-title">第五部分：第三次跃迁——从"工作流"到"智能技能"</h1>
        <div class="content-section">
          <h2 class="content-title">新的灵感：Claude 的编程超能力</h2>
          <p>Claude写代码的能力远超其他模型</p>
          <p>小白也能直接告诉它要的功能，让它解决具体编程工作</p>
        </div>
        <div class="content-section">
          <h2 class="content-title">关键组合：Claude + 反重力（Anti Gravity）</h2>
          <p>反重力：谷歌开源AI工具，让AI可以自动生成和运行代码</p>
          <p>Claude写代码 + 反重力执行代码 = 各种自定义工具</p>
        </div>
        """
    },
    {
        "id": 9,
        "title": "Skill使用效果",
        "filename": "slide9.html",
        "duration": 50,
        "content": """
        <h1 class="slide-title">打造专属"剧本创作Skill"</h1>
        <div class="content-section">
          <h2 class="content-title">操作步骤：</h2>
          <div class="pixel-list">
            <div class="pixel-list-item">1. 整理数据库：过去两年的所有往期剧本打包成"记忆库"</div>
            <div class="pixel-list-item">2. 编写说明文件：用Claude写"剧本创作指南"，拆解流程</div>
            <div class="pixel-list-item">3. 封装成技能：喂给反重力里的AI，建立自动调用流程</div>
          </div>
        </div>
        <div class="content-section">
          <h2 class="content-title">使用效果：</h2>
          <p>说'我想写一个关于分享的剧本' → AI自动确认细节</p>
          <p>检索往期剧本数据库 → 输出稳定质量大纲</p>
          <p>几乎不用大改</p>
        </div>
        """
    },
    {
        "id": 10,
        "title": "延伸案例1：个人主页",
        "filename": "slide10.html",
        "duration": 40,
        "content": """
        <h1 class="slide-title">案例1：我的个人主页——把浏览器收藏夹变成网站</h1>
        <div class="content-section">
          <h2 class="content-title">痛点：</h2>
          <p>收藏网址太多，不同设备收藏夹不互通</p>
        </div>
        <div class="content-section">
          <h2 class="content-title">操作：</h2>
          <p>用反重力让AI设计个人导航主页，部署到GitHub Pages</p>
        </div>
        <div class="content-section">
          <h2 class="content-title">效果：</h2>
          <p>任何设备访问GitHub域名即可，不用翻收藏夹</p>
        </div>
        """
    },
    {
        "id": 11,
        "title": "延伸案例2：每日新闻推送",
        "filename": "slide11.html",
        "duration": 40,
        "content": """
        <h1 class="slide-title">案例2：每日新闻推送——我的专属情报站</h1>
        <div class="content-section">
          <h2 class="content-title">痛点：</h2>
          <p>没时间挨个刷App关注新闻</p>
        </div>
        <div class="content-section">
          <h2 class="content-title">操作：</h2>
          <p>GitHub Actions定时抓取，AI去重摘要，发到邮箱</p>
        </div>
        <div class="content-section">
          <h2 class="content-title">效果：</h2>
          <p>每天接收定制简报，快速掌握核心要闻</p>
        </div>
        """
    },
    {
        "id": 12,
        "title": "总结：进化路径回顾",
        "filename": "slide12.html",
        "duration": 45,
        "content": """
        <h1 class="slide-title">总结——给你的可复制建议</h1>
        <div class="content-section">
          <h2 class="content-title">回顾我的进化路径</h2>
          <div class="timeline-container">
            <div class="timeline-track"></div>
            <div class="timeline-items">
              <div class="timeline-item">学会提问</div>
              <div class="timeline-item">流程封装</div>
              <div class="timeline-item">多模态扩展</div>
              <div class="timeline-item">创造技能</div>
              <div class="timeline-item">玩转自动化</div>
            </div>
          </div>
        </div>
        <div class="content-section">
          <h2 class="content-title">三步行动建议：</h2>
          <div class="pixel-list">
            <div class="pixel-list-item">第一步（梳理）：找出工作中重复性最强的环节</div>
            <div class="pixel-list-item">第二步（封装）：用现成工具或自己动手把流程打包成"技能"</div>
            <div class="pixel-list-item">第三步（积累）：不断积累小技能，构建"数字资产"</div>
          </div>
        </div>
        """
    },
    {
        "id": 13,
        "title": "行动建议页",
        "filename": "slide13.html",
        "duration": 40,
        "content": """
        <h1 class="slide-title">行动建议</h1>
        <div class="content-section">
          <h2 class="content-title">具体实施步骤</h2>
          <div class="pixel-card-grid">
            <div class="pixel-card-item">
              <div class="card-title">第一步：梳理</div>
              <p>分析工作流程，识别重复环节</p>
            </div>
            <div class="pixel-card-item">
              <div class="card-title">第二步：封装</div>
              <p>使用工具或代码将流程自动化</p>
            </div>
            <div class="pixel-card-item">
              <div class="card-title">第三步：积累</div>
              <p>构建个人数字资产库</p>
            </div>
          </div>
        </div>
        <div class="content-section">
          <h2 class="content-title">工具推荐</h2>
          <p>Dify、Claude、反重力、GitHub Actions</p>
        </div>
        """
    },
    {
        "id": 14,
        "title": "金句收尾页",
        "filename": "slide14.html",
        "duration": 35,
        "content": """
        <h1 class="slide-title">金句收尾</h1>
        <div class="content-section" style="text-align: center; margin-top: 100px;">
          <div class="highlight-box">
            <div class="highlight-text">
              AI不会替代你，但会用AI并且会造工具的人，
            </div>
            <div class="highlight-text" style="font-size: 2.5rem; margin-top: var(--spacing-md);">
              正在替代只会用AI的人。
            </div>
          </div>
          <p style="margin-top: var(--spacing-xl); font-size: 1.5rem;">
            把你手头最烦琐的那件小事，变成AI的一个固定"技能"。
          </p>
        </div>
        """
    },
    {
        "id": 15,
        "title": "Q&A页",
        "filename": "slide15.html",
        "duration": 30,
        "content": """
        <h1 class="slide-title">Q&A</h1>
        <div class="content-section" style="text-align: center; margin-top: 150px;">
          <p style="font-size: 2.5rem; margin-bottom: var(--spacing-xl);">谢谢聆听！</p>
          <p style="font-size: 1.2rem; color: var(--color-secondary);">
            有任何问题？现在开始问答环节
          </p>
        </div>
        <div class="content-section" style="position: absolute; bottom: 100px; left: 0; right: 0; text-align: center;">
          <p style="font-size: 0.9rem; color: var(--color-medium);">
            联系方式：Rex - rex@example.com
          </p>
        </div>
        """
    }
]

# HTML模板
template = """<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title} - 幻灯片{id}</title>
  <link rel="stylesheet" href="../assets/css/base.css">
  <link rel="stylesheet" href="../assets/css/slides.css">
  <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
  <style>
    .slide-page {{
      width: 100%;
      height: 100%;
      padding: var(--spacing-xl);
      background: var(--gradient-light);
      position: relative;
      overflow: hidden;
    }}

    .slide-page::before {{
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image:
        linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
      background-size: 32px 32px;
      background-position: center center;
      z-index: 0;
      opacity: 0.5;
    }}

    .slide-content {{
      position: relative;
      z-index: 1;
      height: calc(100% - 60px);
    }}

    .slide-title {{
      font-family: var(--font-pixel);
      font-size: 2.8rem;
      color: var(--color-primary);
      margin-bottom: var(--spacing-lg);
      text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.1);
    }}
  </style>
</head>
<body>
  <div class="slide-page">
    <div class="slide-content">
{content}
    </div>

    <div class="slide-footer">
      <div class="slide-number">{id} / 15</div>
      <div class="slide-progress">
        <div class="slide-progress-bar" id="progress-bar"></div>
      </div>
      <div class="slide-title">{title}</div>
    </div>
  </div>

  <script>
    document.addEventListener('DOMContentLoaded', () => {{
      // 设置进度条宽度
      const progressBar = document.getElementById('progress-bar');
      if (progressBar) {{
        const slideId = {id};
        const progress = (slideId / 15) * 100;
        progressBar.style.width = `${{progress}}%`;
      }}

      // 自动前进设置
      const slideDuration = {duration};
      setTimeout(() => {{
        if (window.parent.configManager?.config.slides.autoAdvance) {{
          window.parent.navigationManager?.nextSlide();
        }}
      }}, slideDuration);
    }});
  </script>
</body>
</html>
"""

def main():
    slides_dir = "slides"

    # 确保目录存在
    os.makedirs(slides_dir, exist_ok=True)

    # 生成剩余幻灯片
    for slide in slides:
        slide_id = slide["id"]
        filename = slide["filename"]
        title = slide["title"]
        duration = slide["duration"]
        content = slide["content"].strip()

        # 生成HTML
        html = template.format(
            id=slide_id,
            title=title,
            content=content,
            duration=duration * 1000  # 转换为毫秒
        )

        # 写入文件
        filepath = os.path.join(slides_dir, filename)
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(html)

        print(f"已生成: {filename} - {title}")

    print(f"\n总共生成了 {len(slides)} 个幻灯片文件")

if __name__ == "__main__":
    main()