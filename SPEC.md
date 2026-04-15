# SPEC.md — 踏遍山河 · 户外徒步登山平台

## 1. Concept & Vision

一个让城市人重新看见山野的平台。不是冰冷的工具，而是一个有温度的户外入口——专业但不晦涩，克制但有感染力。用户第一次打开，应该感受到山风扑面而来。

设计哲学：**自然的力量感 + 都市的效率感**。大山大水但操作简洁，沉浸感与实用性并存。

## 2. Design Language

### 色彩（自然色系，严守 taste-skill 规范）
```
--color-forest-deep:    #1a3a2a   /* 森林主色，导航/按钮 */
--color-forest:         #2d5a3d   /* 苔藓绿，hover/强调 */
--color-earth:          #c4a35a   /* 土黄色，难度徽章/CTA */
--color-sky:            #4a90b8   /* 天蓝色，安全提示/链接 */
--color-bg:             #faf9f7   /* 暖白背景 */
--color-surface:        #f0ede8   /* 卡片/分区背景 */
--color-text:           #1f2937   /* 主文字，Zinc-800 */
--color-muted:          #6b7280   /* 辅助文字 */
```

**禁止：** 霓虹色/紫色系、Inter 字体、纯黑背景

### 字体
- **Display/Slogan:** `Satoshi` Bold, tracking-tight, 有力量感
- **正文:** `Satoshi` Regular, text-base, leading-relaxed
- **数字/标签:** `JetBrains Mono`

### 三维参数
```
DESIGN_VARIANCE:   6   (不对称布局为主，Split Hero)
MOTION_INTENSITY:  5   (滚动视差 + spring 动效，克制)
VISUAL_DENSITY:    4   (大量留白，艺术感为主)
```

### 动效哲学
- 入场：staggerChildren，100ms 间隔，fade + slide-up
- 悬停：`scale-[0.98]` 按压感 + `-translate-y-1` 抬起
- 滚动：背景图片 parallax 0.3x，主内容 1x
- 过渡：spring physics `stiffness:100 damping:20`
- **禁止：** 线性动画、过长加载、复杂 JS 动画

## 3. Layout & Structure

### 页面节奏
```
首页 Hero       → 大画幅沉浸（80vh）
↓ scroll
核心入口区      → 4宫格，高效导航
↓ scroll
热门路线        → 不等宽 Bento Grid
↓ scroll
近期活动        → 横向卡片滑动
↓ scroll
最新资讯        → 左图右文列表
↓ scroll
页脚            → 4列信息+公益提示
```

### 响应式策略
- Desktop: 12-column grid, max-w-[1400px] mx-auto
- Tablet: 8-column, 调整侧边栏
- Mobile: 单列，触摸优化（按钮 ≥ 44px），汉堡菜单

## 4. Features & Interactions

### 首页
- 固定导航栏（滚动不消失）
- 全屏 Hero 轮播（3-5张山野图，自动播放+手动拖拽）
- Split Screen 布局（非居中）
- 4快捷入口：新手路线/热门活动/装备清单/安全指南
- 热门路线（Bento Grid 不等宽卡片）
- 近期活动（横向滚动卡片）
- 资讯列表（左图右文）
- 页脚（联系/免责/环保提示）

### 路线推荐
- 多维筛选（难度/天数/地区/类型/免费/亲子）
- 路线卡片：缩略图+名称+难度星级+天数+亮点
- 详情页：概览/行程/亮点/装备建议/安全提示/用户评价

### 活动报名
- 分类标签（新手/进阶/团建/赛事/露营）
- 活动卡片：封面+名称+时间+地点+人数+费用
- 详情页：概览/行程/报名要求/费用说明/报名流程
- 团建定制表单

### 装备指南
- 分类导航（核心/衣物/露营/防护/电子/食品）
- 分级推荐（新手中的/进阶专业）
- 装备攻略图文

### 安全科普
- 场景分类（新手入门/高海拔/恶劣天气/急救/迷路/野生动物）
- 应急资源（一键拨打）
- 事故案例分析
- 环保无痕理念

### 社群互动
- 帖子列表（分类/点赞/评论）
- 结伴同行（发布+筛选）
- 用户主页

### 个人中心
- 信息管理
- 报名/收藏/帖子记录
- 消息通知

## 5. Component Inventory

| 组件 | 状态 |
|------|------|
| `Navigation` | 固定顶部，滚动阴影，响应式 |
| `HeroCarousel` | 全屏，drag/swipe，split布局 |
| `QuickEntry` | 4宫格，hover缩放 |
| `RouteCard` | 难度星级，天数，悬浮高亮 |
| `ActivityCard` | 横向滚动，报名人数进度条 |
| `BentoGrid` | 不等宽，stagger入场 |
| `SafetySection` | 图标+文案，紧急电话高亮 |
| `GearCard` | 分类标签，价格，星级 |
| `ForumPost` | 点赞动画，评论气泡 |
| `CompanionCard` | 头像+路线+时间，联系按钮 |
| `UserProfile` | 徒步经历徽章墙 |
| `FilterPanel` | 多选标签，平铺筛选 |
| `ActivitySignup` | 步骤条，进度追踪 |
| `Footer` | 4列，公益提示，社交图标 |

## 6. Technical Approach

### 框架 & 工具
- **Next.js 14** (App Router, RSC 优先)
- **Tailwind CSS v3** (no v4 syntax)
- **Framer Motion** (动画)
- **@phosphor-icons/react** (图标，strokeWidth=1.5)
- **Zustand** (全局状态)

### 图标策略
- 全部用 Phosphor Icons（不用 emoji）
- strokeWidth 统一为 1.5
- 特定 SVG：登山杖/指南针/路线等户外元素自绘

### 性能
- `next/image` + 懒加载
- `next/font` 字体优化
- Framer Motion `layoutId` 做列表动画
- 骨架屏 loading states

### 无障碍
- WCAG 对比度达标
- 屏幕阅读器支持
- 键盘导航
- focus ring 清晰可见
