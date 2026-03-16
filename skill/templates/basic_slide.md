# 幻灯片模板

## 基本信息
- **幻灯片编号**: {{slide_number}}
- **标题**: {{title}}
- **持续时间**: {{duration}}秒
- **布局类型**: {{layout_type}}

## 内容设计

### 主标题
```
<h1 class="slide-title">{{main_title}}</h1>
```

### 主要内容
{{#each content_sections}}
#### {{section_title}}
```
<div class="content-section">
  <h2 class="content-title">{{section_title}}</h2>
  {{#each paragraphs}}
  <p>{{this}}</p>
  {{/each}}
</div>
```
{{/each}}

### 可视化需求
{{#if visualization}}
- **图表类型**: {{visualization.type}}
- **数据点**: {{visualization.data_points}}
- **样式要求**: {{visualization.style_requirements}}
{{else}}
- 无特殊可视化需求
{{/if}}

### 特殊样式
{{#if custom_styles}}
```css
/* 自定义样式 */
{{custom_styles}}
```
{{else}}
- 使用默认样式
{{/if}}

## 布局选项

### 单栏布局
适用于单一焦点内容
```html
<div class="single-column-layout">
  <!-- 内容区域 -->
</div>
```

### 两栏对比布局
适用于问题/解决方案对比
```html
<div class="two-column-layout">
  <div class="column-left">
    <!-- 左侧内容 -->
  </div>
  <div class="column-right">
    <!-- 右侧内容 -->
  </div>
</div>
```

### 中心辐射布局
适用于工作流展示
```html
<div class="radial-layout">
  <div class="center-node">
    <!-- 中心节点 -->
  </div>
  <div class="branch-node">
    <!-- 分支节点 -->
  </div>
</div>
```

## 生成指令

1. 根据模板创建 `docs/slides/slide{{slide_number}}.md`
2. 填充具体内容
3. 运行生成脚本：`python generate_remaining_slides.py`
4. 在浏览器中测试：打开 `index.html`

## 备注
- 保持8-bit像素风格的一致性
- 确保文字清晰可读
- 使用CSS变量进行主题化
- 测试键盘导航功能