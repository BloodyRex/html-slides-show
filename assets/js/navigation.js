// 幻灯片导航控制系统
// 处理键盘、鼠标、触摸和程序化导航

import { configManager } from './config.js';

class NavigationManager {
  constructor() {
    this.currentSlideIndex = 0;
    this.totalSlides = 0;
    this.slidesData = [];
    this.isTransitioning = false;
    this.autoAdvanceTimer = null;
    this.isAutoAdvance = false;

    // 绑定方法
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleWheel = this.handleWheel.bind(this);
    this.handleClick = this.handleClick.bind(this);

    // 触摸相关变量
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchEndX = 0;
    this.touchEndY = 0;
    this.minSwipeDistance = 50;

    this.init();
  }

  // 初始化
  init() {
    this.slidesData = configManager.getSlidesData();
    this.totalSlides = this.slidesData.length;
    this.currentSlideIndex = configManager.getCurrentSlideIndex();

    this.loadConfig();
    this.setupEventListeners();
    this.updateURL();
    this.updateSlideFrame();
    this.updateProgress();
    this.updateControls();

    if (this.isAutoAdvance) {
      this.startAutoAdvance();
    }
  }

  // 加载配置
  loadConfig() {
    const config = configManager.config;
    this.isAutoAdvance = config.slides.autoAdvance;
    this.autoAdvanceDelay = config.slides.autoAdvanceDelay;
  }

  // 设置事件监听器
  setupEventListeners() {
    const config = configManager.config.navigation;

    if (config.keyboard) {
      document.addEventListener('keydown', this.handleKeyDown);
    }

    if (config.mouse) {
      document.addEventListener('wheel', this.handleWheel, { passive: false });
      document.addEventListener('click', this.handleClick);
    }

    if (config.touch) {
      document.addEventListener('touchstart', this.handleTouchStart, { passive: true });
      document.addEventListener('touchmove', this.handleTouchMove, { passive: false });
      document.addEventListener('touchend', this.handleTouchEnd, { passive: true });
    }

    // 箭头按钮
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const firstBtn = document.getElementById('first-btn');
    const lastBtn = document.getElementById('last-btn');

    if (prevBtn) prevBtn.addEventListener('click', () => this.prevSlide());
    if (nextBtn) nextBtn.addEventListener('click', () => this.nextSlide());
    if (firstBtn) firstBtn.addEventListener('click', () => this.goToSlide(0));
    if (lastBtn) lastBtn.addEventListener('click', () => this.goToSlide(this.totalSlides - 1));

    // 幻灯片选择器
    const slideSelect = document.getElementById('slide-select');
    if (slideSelect) {
      slideSelect.addEventListener('change', (e) => {
        const index = parseInt(e.target.value);
        if (!isNaN(index)) {
          this.goToSlide(index);
        }
      });
    }

    // 自动前进切换
    const autoAdvanceToggle = document.getElementById('auto-advance-toggle');
    if (autoAdvanceToggle) {
      autoAdvanceToggle.addEventListener('change', (e) => {
        this.toggleAutoAdvance(e.target.checked);
      });
    }

    // 窗口哈希变化监听
    window.addEventListener('hashchange', () => {
      const newIndex = configManager.getCurrentSlideIndex();
      if (newIndex !== this.currentSlideIndex) {
        this.goToSlide(newIndex, false); // 不更新URL，因为哈希已变化
      }
    });
  }

  // 处理键盘事件
  handleKeyDown(event) {
    const shortcuts = configManager.config.navigation.shortcuts;

    // 防止默认行为
    if (shortcuts.next.includes(event.key) ||
        shortcuts.prev.includes(event.key) ||
        shortcuts.first.includes(event.key) ||
        shortcuts.last.includes(event.key) ||
        shortcuts.toggleFullscreen.includes(event.key) ||
        shortcuts.toggleAutoAdvance.includes(event.key)) {
      event.preventDefault();
    }

    // 导航快捷键
    if (shortcuts.next.includes(event.key)) {
      this.nextSlide();
    } else if (shortcuts.prev.includes(event.key)) {
      this.prevSlide();
    } else if (shortcuts.first.includes(event.key)) {
      this.goToSlide(0);
    } else if (shortcuts.last.includes(event.key)) {
      this.goToSlide(this.totalSlides - 1);
    } else if (shortcuts.toggleFullscreen.includes(event.key)) {
      this.toggleFullscreen();
    } else if (shortcuts.toggleAutoAdvance.includes(event.key)) {
      this.toggleAutoAdvance(!this.isAutoAdvance);
    }

    // ESC退出全屏
    if (event.key === 'Escape' && configManager.config.fullscreen.exitOnEsc) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    }
  }

  // 处理触摸事件
  handleTouchStart(event) {
    this.touchStartX = event.changedTouches[0].screenX;
    this.touchStartY = event.changedTouches[0].screenY;
  }

  handleTouchMove(event) {
    // 阻止默认滚动行为
    event.preventDefault();
  }

  handleTouchEnd(event) {
    this.touchEndX = event.changedTouches[0].screenX;
    this.touchEndY = event.changedTouches[0].screenY;

    this.handleSwipe();
  }

  // 处理滑动手势
  handleSwipe() {
    const deltaX = this.touchEndX - this.touchStartX;
    const deltaY = this.touchEndY - this.touchStartY;

    // 确保主要是水平滑动
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > this.minSwipeDistance) {
      if (deltaX > 0) {
        // 向右滑动 - 上一页
        this.prevSlide();
      } else {
        // 向左滑动 - 下一页
        this.nextSlide();
      }
    }
  }

  // 处理滚轮事件
  handleWheel(event) {
    // 阻止默认滚动行为
    event.preventDefault();

    // 根据滚轮方向导航
    if (event.deltaY > 0) {
      this.nextSlide();
    } else if (event.deltaY < 0) {
      this.prevSlide();
    }
  }

  // 处理点击事件（左右边缘点击）
  handleClick(event) {
    const windowWidth = window.innerWidth;
    const clickX = event.clientX;
    const edgeThreshold = 100; // 边缘点击区域宽度

    if (clickX < edgeThreshold) {
      // 点击左边缘 - 上一页
      this.prevSlide();
    } else if (clickX > windowWidth - edgeThreshold) {
      // 点击右边缘 - 下一页
      this.nextSlide();
    }
  }

  // 导航到下一张幻灯片
  nextSlide() {
    if (this.isTransitioning) return;

    if (this.currentSlideIndex < this.totalSlides - 1) {
      this.goToSlide(this.currentSlideIndex + 1);
    } else if (configManager.config.slides.loop) {
      this.goToSlide(0);
    }
  }

  // 导航到上一张幻灯片
  prevSlide() {
    if (this.isTransitioning) return;

    if (this.currentSlideIndex > 0) {
      this.goToSlide(this.currentSlideIndex - 1);
    } else if (configManager.config.slides.loop) {
      this.goToSlide(this.totalSlides - 1);
    }
  }

  // 跳转到指定幻灯片
  goToSlide(index, updateURL = true) {
    if (this.isTransitioning) return;
    if (index < 0 || index >= this.totalSlides) return;

    this.isTransitioning = true;

    // 停止自动前进计时器
    if (this.autoAdvanceTimer) {
      clearTimeout(this.autoAdvanceTimer);
    }

    // 更新当前索引
    const oldIndex = this.currentSlideIndex;
    this.currentSlideIndex = index;

    // 更新URL哈希
    if (updateURL) {
      this.updateURL();
    }

    // 更新幻灯片iframe
    this.updateSlideFrame();

    // 更新进度和控件
    this.updateProgress();
    this.updateControls();

    // 触发过渡完成
    setTimeout(() => {
      this.isTransitioning = false;

      // 重新启动自动前进计时器
      if (this.isAutoAdvance) {
        this.startAutoAdvance();
      }
    }, 300); // 匹配CSS过渡时间
  }

  // 更新URL哈希
  updateURL() {
    window.location.hash = `slide${this.currentSlideIndex + 1}`;
  }

  // 更新幻灯片iframe
  updateSlideFrame() {
    const slideFrame = document.getElementById('slide-frame');
    if (slideFrame && this.slidesData[this.currentSlideIndex]) {
      slideFrame.src = `slides/${this.slidesData[this.currentSlideIndex].file}`;
    }
  }

  // 更新进度显示
  updateProgress() {
    const progressBar = document.getElementById('progress-bar');
    const slideNumber = document.getElementById('slide-number');
    const progressText = document.getElementById('progress-text');

    if (progressBar) {
      const progress = ((this.currentSlideIndex + 1) / this.totalSlides) * 100;
      progressBar.style.width = `${progress}%`;
    }

    if (slideNumber) {
      slideNumber.textContent = `${this.currentSlideIndex + 1} / ${this.totalSlides}`;
    }

    if (progressText) {
      progressText.textContent = `${this.currentSlideIndex + 1} of ${this.totalSlides}`;
    }

    // 更新幻灯片选择器
    const slideSelect = document.getElementById('slide-select');
    if (slideSelect) {
      slideSelect.value = this.currentSlideIndex;
    }
  }

  // 更新控件状态
  updateControls() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const firstBtn = document.getElementById('first-btn');
    const lastBtn = document.getElementById('last-btn');

    if (prevBtn) {
      prevBtn.disabled = this.currentSlideIndex === 0 && !configManager.config.slides.loop;
    }

    if (nextBtn) {
      nextBtn.disabled = this.currentSlideIndex === this.totalSlides - 1 && !configManager.config.slides.loop;
    }

    if (firstBtn) {
      firstBtn.disabled = this.currentSlideIndex === 0;
    }

    if (lastBtn) {
      lastBtn.disabled = this.currentSlideIndex === this.totalSlides - 1;
    }
  }

  // 切换自动前进
  toggleAutoAdvance(enabled) {
    this.isAutoAdvance = enabled;

    if (enabled) {
      this.startAutoAdvance();
    } else {
      this.stopAutoAdvance();
    }

    // 更新UI
    const autoAdvanceToggle = document.getElementById('auto-advance-toggle');
    if (autoAdvanceToggle) {
      autoAdvanceToggle.checked = enabled;
    }

    const autoAdvanceStatus = document.getElementById('auto-advance-status');
    if (autoAdvanceStatus) {
      autoAdvanceStatus.textContent = enabled ? 'ON' : 'OFF';
      autoAdvanceStatus.className = `auto-advance-status ${enabled ? 'enabled' : 'disabled'}`;
    }
  }

  // 启动自动前进
  startAutoAdvance() {
    this.stopAutoAdvance(); // 清除现有计时器

    this.autoAdvanceTimer = setTimeout(() => {
      this.nextSlide();
    }, this.autoAdvanceDelay);
  }

  // 停止自动前进
  stopAutoAdvance() {
    if (this.autoAdvanceTimer) {
      clearTimeout(this.autoAdvanceTimer);
      this.autoAdvanceTimer = null;
    }
  }

  // 切换全屏
  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  }

  // 获取当前幻灯片信息
  getCurrentSlide() {
    return this.slidesData[this.currentSlideIndex];
  }

  // 获取幻灯片总数
  getTotalSlides() {
    return this.totalSlides;
  }

  // 清理资源
  destroy() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('wheel', this.handleWheel);
    document.removeEventListener('click', this.handleClick);
    document.removeEventListener('touchstart', this.handleTouchStart);
    document.removeEventListener('touchmove', this.handleTouchMove);
    document.removeEventListener('touchend', this.handleTouchEnd);

    this.stopAutoAdvance();
  }
}

// 创建全局导航管理器实例
const navigationManager = new NavigationManager();

// 导出
export { navigationManager };