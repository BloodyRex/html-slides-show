// HTML幻灯片展示工具 - 配置系统
// 基于ppt_optimization/config.js改造，适配8-bit像素风格

// 默认配置
const defaultConfig = {
  // 幻灯片设置
  slides: {
    total: 16,
    aspectRatio: '16:9',
    autoAdvance: false,
    autoAdvanceDelay: 30000, // 30秒
    loop: false,
    startAt: 1
  },

  // 8-bit风格配置
  style: {
    // 颜色方案
    colors: {
      primary: '#6B5B95',     // 紫色调
      secondary: '#88B04B',   // 绿色调
      accent: '#FF6F61',      // 珊瑚色
      light: '#F7CAC9',       // 浅粉色
      dark: '#2A3B47',        // 深蓝灰
      white: '#FFFFFF',
      black: '#000000'
    },

    // 字体设置
    fonts: {
      main: "'Segoe UI', system-ui, sans-serif",
      pixel: "'Press Start 2P', 'Courier New', monospace",
      code: "'JetBrains Mono', 'Fira Code', monospace"
    },

    // 8-bit设计元素
    pixel: {
      size: '4px',
      border: '4px solid #2A3B47',
      shadow: '4px 4px 0 rgba(0, 0, 0, 0.2)',
      shadowLarge: '8px 8px 0 rgba(0, 0, 0, 0.3)'
    },

    // 渐变定义
    gradients: {
      primary: 'linear-gradient(135deg, #6B5B95, #88B04B)',
      accent: 'linear-gradient(135deg, #FF6F61, #FFD166)',
      light: 'linear-gradient(135deg, #F7CAC9, #FFFFFF)',
      dark: 'linear-gradient(135deg, #2A3B47, #6B7280)'
    }
  },

  // 导航设置
  navigation: {
    keyboard: true,
    mouse: true,
    touch: true,
    arrows: true,
    progressBar: true,
    slideNumbers: true,
    shortcuts: {
      next: ['ArrowRight', 'Space', 'PageDown'],
      prev: ['ArrowLeft', 'PageUp'],
      first: ['Home'],
      last: ['End'],
      toggleFullscreen: ['F11', 'f'],
      toggleAutoAdvance: ['a']
    }
  },

  // 全屏设置
  fullscreen: {
    enabled: true,
    hideControls: false,
    exitOnEsc: true
  },

  // 主题设置
  themes: {
    active: 'teal-trust',
    switchable: true,
    persist: true
  }
};

// 预定义主题方案
const predefinedThemes = {
  'teal-trust': {
    name: 'Teal Trust',
    description: '科技感蓝绿色系，适合AI/技术主题',
    colors: {
      primary: '#028090',
      secondary: '#00A896',
      accent: '#02C39A',
      light: '#F1F3F4',
      dark: '#212121',
      medium: '#666666'
    }
  },
  'midnight-executive': {
    name: 'Midnight Executive',
    description: '午夜行政风格，深蓝色系，商务感强',
    colors: {
      primary: '#1E2761',
      secondary: '#CADCFC',
      accent: '#FFFFFF',
      light: '#F5F5F5',
      dark: '#212121',
      medium: '#666666'
    }
  },
  'forest-moss': {
    name: 'Forest & Moss',
    description: '森林与苔藓风格，绿色系，适合环保/教育主题',
    colors: {
      primary: '#2C5F2D',
      secondary: '#97BC62',
      accent: '#F5F5F5',
      light: '#F1F3F4',
      dark: '#212121',
      medium: '#666666'
    }
  },
  'coral-energy': {
    name: 'Coral Energy',
    description: '珊瑚能量风格，暖色调，活力创意',
    colors: {
      primary: '#F96167',
      secondary: '#F9E795',
      accent: '#2F3C7E',
      light: '#F5F5F5',
      dark: '#212121',
      medium: '#666666'
    }
  },
  'warm-terracotta': {
    name: 'Warm Terracotta',
    description: '温暖陶土风格，大地色系，温暖亲和',
    colors: {
      primary: '#B85042',
      secondary: '#E7E8D1',
      accent: '#A7BEAE',
      light: '#F5F5F5',
      dark: '#212121',
      medium: '#666666'
    }
  },
  '8-bit-purple': {
    name: '8-bit Purple',
    description: '8-bit像素风格，紫色系，复古游戏感',
    colors: {
      primary: '#6B5B95',
      secondary: '#88B04B',
      accent: '#FF6F61',
      light: '#F7CAC9',
      dark: '#2A3B47',
      medium: '#6B7280'
    }
  }
};

// 幻灯片数据
const slidesData = [
  { id: 1, file: 'slide1.html', title: '从"写剧本"到"造工具"', duration: 30 },
  { id: 2, file: 'slide2.html', title: '分享人介绍', duration: 45 },
  { id: 3, file: 'slide3.html', title: '核心进化路径', duration: 60 },
  { id: 4, file: 'slide4.html', title: '第一阶段：起步痛点', duration: 50 },
  { id: 5, file: 'slide5.html', title: '第一阶段：基础进阶', duration: 55 },
  { id: 6, file: 'slide6.html', title: '第二阶段：工作流构建', duration: 60 },
  { id: 7, file: 'slide7.html', title: '视觉参考图集', duration: 45 },
  { id: 8, file: 'slide8.html', title: '第三阶段：多模态扩展', duration: 50 },
  { id: 9, file: 'slide9.html', title: '第四阶段：创造智能技能', duration: 55 },
  { id: 10, file: 'slide10.html', title: '专属"剧本创作Skill"', duration: 50 },
  { id: 11, file: 'slide11.html', title: '案例1：个人主页', duration: 40 },
  { id: 12, file: 'slide12.html', title: '案例2：情报推送', duration: 40 },
  { id: 13, file: 'slide13.html', title: '进化路径回顾', duration: 45 },
  { id: 14, file: 'slide14.html', title: '下一步行动建议', duration: 40 },
  { id: 15, file: 'slide15.html', title: '结语：正在替代的人', duration: 35 },
  { id: 16, file: 'slide16.html', title: 'Q&A / 谢谢聆听', duration: 30 }
];

// 配置管理器
class ConfigManager {
  constructor() {
    this.config = { ...defaultConfig };
    this.currentTheme = '8-bit-purple'; // 默认使用8-bit风格
    this.loadFromStorage();
  }

  // 从本地存储加载配置
  loadFromStorage() {
    try {
      const savedConfig = localStorage.getItem('htmlSlidesConfig');
      if (savedConfig) {
        const parsed = JSON.parse(savedConfig);
        this.config = { ...this.config, ...parsed };

        if (parsed.themes && parsed.themes.active) {
          this.currentTheme = parsed.themes.active;
        }
      }
    } catch (error) {
      console.warn('Failed to load config from storage:', error);
    }
  }

  // 保存配置到本地存储
  saveToStorage() {
    try {
      localStorage.setItem('htmlSlidesConfig', JSON.stringify(this.config));
    } catch (error) {
      console.warn('Failed to save config to storage:', error);
    }
  }

  // 切换主题
  switchTheme(themeName) {
    if (predefinedThemes[themeName]) {
      this.currentTheme = themeName;
      this.config.themes.active = themeName;
      this.saveToStorage();
      this.applyTheme();
      return true;
    }
    return false;
  }

  // 应用当前主题到CSS变量
  applyTheme() {
    const theme = predefinedThemes[this.currentTheme];
    if (!theme) return;

    const root = document.documentElement;

    // 应用颜色
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    // 更新渐变
    if (theme.colors.primary && theme.colors.secondary) {
      const primaryGradient = `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`;
      root.style.setProperty('--gradient-primary', primaryGradient);
    }

    if (theme.colors.accent && theme.colors.light) {
      const accentGradient = `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.light})`;
      root.style.setProperty('--gradient-accent', accentGradient);
    }

    // 保存主题选择
    this.config.themes.active = this.currentTheme;
    this.saveToStorage();
  }

  // 获取当前主题
  getCurrentTheme() {
    return predefinedThemes[this.currentTheme] || predefinedThemes['8-bit-purple'];
  }

  // 获取所有主题
  getAllThemes() {
    return predefinedThemes;
  }

  // 获取幻灯片数据
  getSlidesData() {
    return slidesData;
  }

  // 获取当前幻灯片索引
  getCurrentSlideIndex() {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#slide')) {
      const slideNum = parseInt(hash.replace('#slide', ''));
      if (!isNaN(slideNum) && slideNum >= 1 && slideNum <= slidesData.length) {
        return slideNum - 1;
      }
    }
    return this.config.slides.startAt - 1;
  }

  // 更新配置
  updateConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
    this.saveToStorage();
  }

  // 重置为默认配置
  resetToDefault() {
    this.config = { ...defaultConfig };
    this.currentTheme = '8-bit-purple';
    this.saveToStorage();
    this.applyTheme();
  }
}

// 创建全局配置管理器实例
const configManager = new ConfigManager();

// 导出
export {
  defaultConfig,
  predefinedThemes,
  slidesData,
  configManager
};