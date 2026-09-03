/**
 * The Daily Diff / VectorShift Diff Design System Tokens
 * Grounded in editorial newsprint aesthetics, burgundy accents, disciplined typography,
 * and high-finance publishing integrity.
 */

export const DESIGN_TOKENS = {
  // Editions (Themes)
  themes: {
    morning: {
      name: 'Morning Edition',
      description: 'Warm archival newsprint paper with deep soot ink',
      paperBg: '#f4efe6',
      paperSurface: '#eae4d6',
      paperSurfaceAlt: '#e3dccb',
      paperSurfaceHover: '#ddd5c2',
      paperSunken: '#ded6c3',
      inkPrimary: '#1f1e1d',
      inkSecondary: '#4a4742',
      inkMuted: '#6e6a63',
      inkDim: '#948f86',
      ruleThick: '#1f1e1d',
      ruleMedium: '#2b2927',
      ruleSubtle: '#d6cebf',
      topRibbon: '#8b1d3b',
      accentBurgundy: '#801414',
      accentBurgundyHover: '#691010',
      accentCrimson: '#9b1c31',
      accentEmerald: '#15803d',
      accentGold: '#b45309',
      accentNavy: '#1e3a8a',
      codeBg: '#e6dfd1',
      codeBorder: '#d4ccbd'
    },
    evening: {
      name: 'Evening Edition',
      description: 'Midnight broadsheet with bone paper highlights and glowing rubrics',
      paperBg: '#131418',
      paperSurface: '#1b1d24',
      paperSurfaceAlt: '#22252e',
      paperSurfaceHover: '#2a2e3a',
      paperSunken: '#0d0e12',
      inkPrimary: '#f2eee6',
      inkSecondary: '#b0aaa0',
      inkMuted: '#757169',
      inkDim: '#4d4a44',
      ruleThick: '#f2eee6',
      ruleMedium: '#3a3834',
      ruleSubtle: '#2b2a28',
      topRibbon: '#5a0f23',
      accentBurgundy: '#a82020',
      accentBurgundyHover: '#8f1818',
      accentCrimson: '#d12e47',
      accentEmerald: '#22c55e',
      accentGold: '#d97706',
      accentNavy: '#3b82f6',
      codeBg: '#22242c',
      codeBorder: '#323542'
    }
  },

  // Flattened light default for backwards compatibility
  colors: {
    paperBg: '#f4efe6',
    paperSurface: '#eae4d6',
    paperSurfaceAlt: '#e3dccb',
    paperSurfaceHover: '#ddd5c2',
    paperSunken: '#ded6c3',

    inkPrimary: '#1f1e1d',
    inkSecondary: '#4a4742',
    inkMuted: '#6e6a63',
    inkDim: '#948f86',

    inkRuleThick: '#1f1e1d',
    inkRuleMedium: '#2b2927',
    inkRuleSubtle: '#d6cebf',

    topRibbon: '#8b1d3b',
    burgundyPill: '#801414',
    burgundyHover: '#691010',
    crimsonKicker: '#9b1c31',
    emeraldSuccess: '#15803d',
    goldWarning: '#b45309',
    navyInfo: '#1e3a8a',

    codeBg: '#e6dfd1',
    codeBorder: '#d4ccbd'
  },

  typography: {
    fonts: {
      displayHeadline: "'Playfair Display', Georgia, serif",
      storyHeadline: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      editorialBody: "'Newsreader', Garamond, 'Times New Roman', serif",
      dataMonospace: "'JetBrains Mono', Courier, monospace",
      uiSans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    },
    scale: {
      heroMasthead: { size: '4rem', lineHeight: '1', weight: 900, tracking: '-0.025em' },
      sectionHeadline: { size: '2.35rem', lineHeight: '1.18', weight: 800, tracking: '-0.025em' },
      subHeadline: { size: '1.5rem', lineHeight: '1.25', weight: 700, tracking: '-0.015em' },
      articleTitle: { size: '1.2rem', lineHeight: '1.3', weight: 700, tracking: '-0.01em' },
      bodyEditorial: { size: '1.06rem', lineHeight: '1.7', weight: 400, tracking: 'normal' },
      bodyUi: { size: '0.88rem', lineHeight: '1.5', weight: 400, tracking: 'normal' },
      kicker: { size: '0.75rem', lineHeight: '1.4', weight: 800, tracking: '0.08em', transform: 'uppercase' },
      byline: { size: '0.74rem', lineHeight: '1.4', weight: 500, tracking: '0.05em', transform: 'uppercase' },
      caption: { size: '0.74rem', lineHeight: '1.35', weight: 400, italic: true },
      dataCode: { size: '0.82rem', lineHeight: '1.4', weight: 500, font: 'mono' },
      badge: { size: '0.68rem', lineHeight: '1', weight: 800, tracking: '0.06em', transform: 'uppercase' },
      micro: { size: '0.62rem', lineHeight: '1', weight: 700, tracking: '0.04em' }
    }
  },

  spacing: {
    '2xs': '0.25rem',  // 4px
    xs: '0.5rem',      // 8px
    sm: '0.75rem',     // 12px
    md: '1rem',        // 16px
    lg: '1.5rem',      // 24px
    xl: '2rem',        // 32px
    '2xl': '3rem',     // 48px
    '3xl': '4rem'      // 64px
  },

  radii: {
    none: '0px',
    xs: '2px',
    sm: '4px',
    md: '6px',
    lg: '8px',
    full: '9999px'
  },

  rules: {
    hairline: '1px solid var(--ink-rule-subtle)',
    standard: '1px solid var(--ink-rule)',
    thick: '2px solid var(--ink-rule-thick)',
    double: '3px double var(--ink-rule)'
  },

  shadows: {
    none: 'none',
    editorial: '0 2px 8px rgba(31, 30, 29, 0.08)',
    hover: '0 4px 14px rgba(31, 30, 29, 0.12)',
    overlay: '0 8px 32px rgba(0, 0, 0, 0.35)'
  },

  transitions: {
    fast: 'all 0.12s ease',
    standard: 'all 0.2s ease',
    smooth: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
  }
};

