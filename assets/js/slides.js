// 幻灯片管理器
// 处理幻灯片加载、过渡和状态管理

import { configManager } from './config.js';

class SlidesManager {
  constructor() {
    this.slides = [];
    this.currentSlide = null;
    this.preloadedSlides = new Map();
    this.transitionDuration = 300;

    this.init();
  }

  // 初始化
  async init() {
    await this.loadSlidesData();
    this.preloadSlides();
    this.setupSlideEvents();
  }

  // 加载幻灯片数据
  async loadSlidesData() {
    try {
      const slidesData = configManager.getSlidesData();
      this.slides = slidesData.map(slide => ({
        ...slide,
        loaded: false,
        element: null
      }));

      console.log(`Loaded ${this.slides.length} slides`);
    } catch (error) {
      console.error('Failed to load slides data:', error);
    }
  }

  // 预加载幻灯片
  preloadSlides() {
    // 预加载当前幻灯片和相邻幻灯片
    const currentIndex = configManager.getCurrentSlideIndex();
    const preloadIndices = [
      currentIndex,
      Math.max(0, currentIndex - 1),
      Math.min(this.slides.length - 1, currentIndex + 1)
    ];

    preloadIndices.forEach(index => {
      if (index >= 0 && index < this.slides.length) {
        this.preloadSlide(index);
      }
    });
  }

  // 预加载单个幻灯片
  async preloadSlide(index) {
    if (this.preloadedSlides.has(index)) {
      return this.preloadedSlides.get(index);
    }

    const slide = this.slides[index];
    if (!slide) return null;

    try {
      const response = await fetch(`slides/${slide.file}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const html = await response.text();
      this.preloadedSlides.set(index, html);
      slide.loaded = true;

      return html;
    } catch (error) {
      console.error(`Failed to preload slide ${index}:`, error);
      return null;
    }
  }

  // 设置幻灯片事件
  setupSlideEvents() {
    // 监听iframe加载完成
    const slideFrame = document.getElementById('slide-frame');
    if (slideFrame) {
      slideFrame.addEventListener('load', () => {
        this.onSlideLoaded();
      });
    }

    // 监听全屏变化
    document.addEventListener('fullscreenchange', () => {
      this.onFullscreenChange();
    });

    // 监听键盘事件（传递到当前幻灯片）
    document.addEventListener('keydown', (event) => {
      this.forwardKeyEvent(event);
    });
  }

  // 幻灯片加载完成回调
  onSlideLoaded() {
    const slideFrame = document.getElementById('slide-frame');
    if (!slideFrame) return;

    try {
      // 尝试访问iframe内容
      const iframeDoc = slideFrame.contentDocument || slideFrame.contentWindow.document;

      // 添加基础样式
      this.injectIframeStyles(iframeDoc);

      // 初始化iframe内交互
      this.setupIframeInteractions(iframeDoc);

      // 触发自定义事件
      this.dispatchSlideChangeEvent();
    } catch (error) {
      // 跨域限制，无法访问iframe内容
      console.log('Cannot access iframe content due to CORS');
    }
  }

  // 注入iframe样式
  injectIframeStyles(iframeDoc) {
    if (!iframeDoc) return;

    // 添加基础CSS链接
    const baseLink = iframeDoc.createElement('link');
    baseLink.rel = 'stylesheet';
    baseLink.href = '../assets/css/base.css';
    iframeDoc.head.appendChild(baseLink);

    const slidesLink = iframeDoc.createElement('link');
    slidesLink.rel = 'stylesheet';
    slidesLink.href = '../assets/css/slides.css';
    iframeDoc.head.appendChild(slidesLink);

    // 添加8-bit像素字体
    const fontLink = iframeDoc.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap';
    iframeDoc.head.appendChild(fontLink);
  }

  // 设置iframe内交互
  setupIframeInteractions(iframeDoc) {
    if (!iframeDoc) return;

    // 添加点击事件传递
    iframeDoc.addEventListener('click', (event) => {
      // 如果点击了链接，在父窗口打开
      if (event.target.tagName === 'A' && event.target.href) {
        event.preventDefault();
        window.open(event.target.href, '_blank');
      }
    });

    // 添加键盘事件传递
    iframeDoc.addEventListener('keydown', (event) => {
      // 将事件冒泡到父窗口
      const newEvent = new KeyboardEvent('keydown', event);
      document.dispatchEvent(newEvent);
    });
  }

  // 转发键盘事件
  forwardKeyEvent(event) {
    // 如果事件来自iframe，不需要转发
    if (event.source === window) return;

    // 检查是否是需要传递的键
    const key = event.key;
    const shortcuts = configManager.config.navigation.shortcuts;

    const shouldForward =
      shortcuts.next.includes(key) ||
      shortcuts.prev.includes(key) ||
      shortcuts.first.includes(key) ||
      shortcuts.last.includes(key) ||
      shortcuts.toggleFullscreen.includes(key) ||
      shortcuts.toggleAutoAdvance.includes(key);

    if (shouldForward) {
      // 阻止默认行为
      event.preventDefault();

      // 创建新事件（如果需要）
      // 导航管理器会处理这些事件
    }
  }

  // 全屏变化回调
  onFullscreenChange() {
    const isFullscreen = !!document.fullscreenElement;

    // 更新全屏相关样式
    document.body.classList.toggle('fullscreen', isFullscreen);

    // 更新控件可见性
    this.updateControlsVisibility(isFullscreen);

    // 触发自定义事件
    this.dispatchFullscreenChangeEvent(isFullscreen);
  }

  // 更新控件可见性
  updateControlsVisibility(isFullscreen) {
    const controls = document.querySelector('.controls');
    const hideControls = isFullscreen && configManager.config.fullscreen.hideControls;

    if (controls) {
      controls.style.opacity = hideControls ? '0' : '1';
      controls.style.pointerEvents = hideControls ? 'none' : 'auto';
    }
  }

  // 切换到指定幻灯片
  async goToSlide(index) {
    if (index < 0 || index >= this.slides.length) {
      console.error(`Invalid slide index: ${index}`);
      return false;
    }

    const slide = this.slides[index];
    this.currentSlide = slide;

    // 预加载相邻幻灯片
    this.preloadAdjacentSlides(index);

    // 更新当前幻灯片状态
    this.updateCurrentSlideState(index);

    return true;
  }

  // 预加载相邻幻灯片
  preloadAdjacentSlides(currentIndex) {
    const indicesToPreload = [
      Math.max(0, currentIndex - 2),
      Math.max(0, currentIndex - 1),
      currentIndex,
      Math.min(this.slides.length - 1, currentIndex + 1),
      Math.min(this.slides.length - 1, currentIndex + 2)
    ];

    indicesToPreload.forEach(index => {
      if (!this.preloadedSlides.has(index)) {
        this.preloadSlide(index);
      }
    });
  }

  // 更新当前幻灯片状态
  updateCurrentSlideState(index) {
    // 更新所有幻灯片的active状态
    this.slides.forEach((slide, i) => {
      slide.active = i === index;
    });

    // 更新文档标题
    const slide = this.slides[index];
    if (slide && slide.title) {
      document.title = `${slide.title} - HTML Slides Show`;
    }

    // 触发幻灯片变化事件
    this.dispatchSlideChangeEvent();
  }

  // 获取当前幻灯片
  getCurrentSlide() {
    return this.currentSlide;
  }

  // 获取幻灯片总数
  getTotalSlides() {
    return this.slides.length;
  }

  // 获取幻灯片信息
  getSlideInfo(index) {
    if (index >= 0 && index < this.slides.length) {
      return this.slides[index];
    }
    return null;
  }

  // 获取所有幻灯片信息
  getAllSlidesInfo() {
    return [...this.slides];
  }

  // 分发幻灯片变化事件
  dispatchSlideChangeEvent() {
    const event = new CustomEvent('slidechange', {
      detail: {
        slide: this.currentSlide,
        index: this.slides.findIndex(s => s === this.currentSlide)
      }
    });
    document.dispatchEvent(event);
  }

  // 分发全屏变化事件
  dispatchFullscreenChangeEvent(isFullscreen) {
    const event = new CustomEvent('fullscreenchange', {
      detail: { isFullscreen }
    });
    document.dispatchEvent(event);
  }

  // 获取幻灯片内容（用于导出等功能）
  async getSlideContent(index) {
    if (this.preloadedSlides.has(index)) {
      return this.preloadedSlides.get(index);
    }

    return await this.preloadSlide(index);
  }

  // 清理资源
  destroy() {
    this.preloadedSlides.clear();
    this.slides = [];
    this.currentSlide = null;
  }
}

// 创建全局幻灯片管理器实例
const slidesManager = new SlidesManager();

// 导出
export { slidesManager };