"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MagnifyingGlass,
  Backpack,
  TShirt,
  Tent,
  Shield,
  Flashlight,
  CookingPot,
  Tag,
  Star,
} from "@phosphor-icons/react";
import { staggerContainer, staggerItem } from "@/components/MotionWrapper";

const categoryIcons: Record<string, React.ElementType> = {
  core: Backpack,
  clothing: TShirt,
  shelter: Tent,
  protection: Shield,
  electronics: Flashlight,
  food: CookingPot,
};

const tagColors: Record<string, string> = {
  "必选": "bg-earth text-white",
  "强烈推荐": "bg-sky text-white",
  "推荐": "bg-forest text-white",
  "视路线": "bg-muted text-white",
  "露营必选": "bg-earth text-white",
  "视季节": "bg-sky text-white",
  "进阶": "bg-forest text-white",
};

const categories = [
  { id: "core", name: "核心装备" },
  { id: "clothing", name: "衣物装备" },
  { id: "shelter", name: "露营装备" },
  { id: "protection", name: "防护装备" },
  { id: "electronics", name: "电子装备" },
  { id: "food", name: "食品补给" },
];

const gearCategories = [
  {
    id: "core",
    name: "核心装备",
    items: [
      {
        name: "登山背包",
        specs: "容量：30-80L视路线而定",
        price: "300-2000元",
        highlight: "背负系统最重要，选购时试背",
        tag: "必选",
      },
      {
        name: "登山鞋",
        specs: "建议防水 GTX 版本",
        price: "400-2000元",
        highlight: "磨合后再上山，切勿穿新鞋徒步",
        tag: "必选",
      },
      {
        name: "登山杖",
        specs: "铝合金/碳纤维，可调节",
        price: "100-800元",
        highlight: "正确使用可节省30%体力",
        tag: "强烈推荐",
      },
    ],
  },
  {
    id: "clothing",
    name: "衣物装备",
    items: [
      {
        name: "冲锋衣",
        specs: "防水透气，GTX面料",
        price: "500-3000元",
        highlight: "三层穿衣法核心层，防风防雨防失温",
        tag: "必选",
      },
      {
        name: "速干衣裤",
        specs: "化纤/美利奴羊毛",
        price: "100-800元",
        highlight: "纯棉内衣禁止徒步！",
        tag: "必选",
      },
      {
        name: "保暖层",
        specs: "抓绒/排骨羽绒",
        price: "200-1500元",
        highlight: "高海拔必备，3000米以上需要羽绒服",
        tag: "视路线",
      },
    ],
  },
  {
    id: "shelter",
    name: "露营装备",
    items: [
      {
        name: "帐篷",
        specs: "三季帐/四季帐视季节",
        price: "400-3000元",
        highlight: "轻量化与耐用性平衡",
        tag: "露营必选",
      },
      {
        name: "睡袋",
        specs: "温标：舒适温度-5℃至-15℃",
        price: "200-2000元",
        highlight: "根据露营点最低温度选温标",
        tag: "露营必选",
      },
      {
        name: "防潮垫",
        specs: "泡沫/充气，R值>3",
        price: "50-500元",
        highlight: "隔绝地面冷气，救命装备",
        tag: "必选",
      },
    ],
  },
  {
    id: "protection",
    name: "防护装备",
    items: [
      {
        name: "登山手套",
        specs: "防风保暖，防滑",
        price: "50-300元",
        highlight: "防止滑坠划伤，冬季必选",
        tag: "视季节",
      },
      {
        name: "防晒帽",
        specs: "宽檐/渔夫帽",
        price: "30-200元",
        highlight: "防晒防风，防止中暑",
        tag: "必选",
      },
      {
        name: "防晒霜",
        specs: "SPF50+，防水",
        price: "30-100元",
        highlight: "高海拔紫外线极强，SPF不够需补涂",
        tag: "必选",
      },
    ],
  },
  {
    id: "electronics",
    name: "电子装备",
    items: [
      {
        name: "头灯",
        specs: "100-500流明，续航10h+",
        price: "80-500元",
        highlight: "必带！走夜路、找营地、应急全靠它",
        tag: "必选",
      },
      {
        name: "充电宝",
        specs: "10000mAh以上",
        price: "80-300元",
        highlight: "高海拔低温耗电快，多备一个",
        tag: "必选",
      },
      {
        name: "GPS/对讲机",
        specs: "有地图下载功能",
        price: "300-2000元",
        highlight: "无信号山区必备导航工具",
        tag: "进阶",
      },
    ],
  },
  {
    id: "food",
    name: "食品补给",
    items: [
      {
        name: "路餐",
        specs: "能量棒、坚果、牛肉干",
        price: "计重",
        highlight: "选择高热量小体积，每日500kcal以上",
        tag: "必选",
      },
      {
        name: "水袋/水壶",
        specs: "容量2L以上",
        price: "50-300元",
        highlight: "徒步过程随时补水",
        tag: "必选",
      },
      {
        name: "电解质粉",
        specs: "补充钠钾镁",
        price: "30-100元",
        highlight: "大量出汗后补充，防止抽筋",
        tag: "推荐",
      },
    ],
  },
];

const articles = [
  {
    id: 1,
    title: "入门级徒步装备清单：1000元搞定基础装备",
    category: "入门攻略",
    image:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&q=80",
    date: "2026-04-12",
  },
  {
    id: 2,
    title: "如何选择适合自己的登山背包",
    category: "装备选购",
    image:
      "https://images.unsplash.com/photo-1504280506541-aca1b1df0bde?w=400&q=80",
    date: "2026-04-08",
  },
  {
    id: 3,
    title: "高海拔徒步：三层穿衣法的正确理解",
    category: "高海拔",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80",
    date: "2026-04-05",
  },
];

export default function GearPage() {
  const [selectedCategory, setSelectedCategory] = useState("core");
  const [searchQuery, setSearchQuery] = useState("");

  const selectedCategoryData = gearCategories.find(
    (c) => c.id === selectedCategory
  );

  return (
    <div className="min-h-screen bg-bg">
      {/* Page Header */}
      <div className="bg-forest-deep text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h1 className="text-4xl font-bold tracking-tight mb-2">装备中心</h1>
            <p className="text-white/60 text-base">
              精选装备推荐，从入门到专业，帮你选对不选贵
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-6 -mt-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative"
        >
          <MagnifyingGlass
            size={20}
            weight="light"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            type="text"
            placeholder="搜索装备名称..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border border-surface rounded-xl text-sm font-sans placeholder:text-muted focus:outline-none focus:border-earth transition-colors shadow-md"
          />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* Left Sidebar */}
          <aside className="space-y-2">
            <h2 className="text-sm font-bold text-muted uppercase tracking-wider px-4 mb-4">
              装备分类
            </h2>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="space-y-2"
            >
              {categories.map((cat) => {
                const Icon = categoryIcons[cat.id] || Backpack;
                return (
                  <motion.div key={cat.id} variants={staggerItem}>
                    <button
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        selectedCategory === cat.id
                          ? "bg-forest-deep text-white"
                          : "bg-surface hover:bg-forest-deep/10 text-forest-deep"
                      }`}
                    >
                      <Icon
                        size={20}
                        weight="light"
                        strokeWidth={1.5}
                      />
                      <span className="text-sm font-medium">{cat.name}</span>
                    </button>
                  </motion.div>
                );
              })}
            </motion.div>
          </aside>

          {/* Right Content */}
          <main>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {selectedCategoryData?.items.map((item, index) => (
                    <motion.article
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.08,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                      className="bg-surface rounded-xl overflow-hidden border border-surface-200 hover:border-earth transition-all group"
                    >
                      <div className="p-5">
                        <div className="flex items-start justify-between gap-3 mb-4">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base font-bold text-forest-deep group-hover:text-earth transition-colors">
                              {item.name}
                            </h3>
                            <p className="text-xs text-muted mt-1">{item.specs}</p>
                          </div>
                          <span
                            className={`flex-shrink-0 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              tagColors[item.tag] || "bg-muted text-white"
                            }`}
                          >
                            {item.tag}
                          </span>
                        </div>
                        <div className="space-y-2 pt-3 border-t border-surface-200">
                          <p className="text-sm text-muted leading-relaxed">
                            {item.highlight}
                          </p>
                          <div className="flex items-center gap-2">
                            <Tag
                              size={14}
                              weight="light"
                              className="text-earth"
                            />
                            <span className="text-sm font-medium text-earth">
                              {item.price}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* 装备攻略 Section */}
            <section className="mt-12 pt-8 border-t border-surface-200">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-xl font-bold text-forest-deep mb-6"
              >
                装备攻略
              </motion.h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {articles.map((article, i) => (
                  <motion.article
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.1,
                    }}
                    className="bg-surface rounded-xl overflow-hidden border border-surface-200 hover:border-earth transition-all group cursor-pointer"
                  >
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <span className="inline-block px-2 py-0.5 bg-forest/10 text-forest text-xs rounded mb-2">
                        {article.category}
                      </span>
                      <h3 className="text-sm font-bold text-forest-deep leading-snug group-hover:text-earth transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-xs text-muted mt-2">{article.date}</p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
