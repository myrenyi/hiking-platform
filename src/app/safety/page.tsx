"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Mountains,
  CloudRain,
  FirstAid,
  Compass,
  Leaf,
  Phone,
  CaretDown,
  CaretUp,
  MapTrifold,
} from "@phosphor-icons/react";
import { staggerContainer, staggerItem } from "@/components/MotionWrapper";

const safetyCategories = [
  { id: "newbie", name: "新手入门", icon: ShieldCheck, desc: "10项必查清单" },
  { id: "highalt", name: "高海拔安全", icon: Mountains, desc: "高原反应应对" },
  { id: "weather", name: "恶劣天气", icon: CloudRain, desc: "极端天气决策" },
  { id: "firstaid", name: "急救技巧", icon: FirstAid, desc: "止血包扎CPR" },
  { id: "lost", name: "迷路应对", icon: Compass, desc: "STOP原则" },
  { id: "wildlife", name: "野生动物", icon: Leaf, desc: "动物冲突预防" },
];

const emergencyContacts = [
  { name: "全国紧急救援", number: "400-600-0120", available: "24小时" },
  { name: "蓝天救援队", number: "400-600-9958", available: "24小时" },
  { name: "急救中心", number: "120", available: "24小时" },
  { name: "登山协会", number: "010-6710-0114", available: "工作日9:00-17:00" },
];

const safetyTips = [
  {
    title: "出发前的10项检查",
    category: "新手入门",
    icon: ShieldCheck,
    content: [
      "1. 天气：查看目的地未来3天的天气预报，雷雨天气避免出行",
      "2. 路线：提前研究路线轨迹，下载离线地图，告知家人行程",
      "3. 装备：检查装备完整性，穿着合适衣物和登山鞋",
      "4. 食物：准备足够的路餐和应急食品，至少备有1天的额外补给",
      "5. 水源：了解沿途水源情况，携带足够的水或净水设备",
      "6. 通讯：手机充满电，携带充电宝，必要时准备对讲机",
      "7. 药品：携带创可贴、绷带、消毒药水、止血粉等基础急救用品",
      "8. 保险：购买专业户外保险，确认保险覆盖所选路线类型",
      "9. 结伴：尽量结伴同行，避免单独进入荒野区域",
      "10. 报备：向信任的人报告行程计划和预计返回时间",
    ],
  },
  {
    title: "高原反应预防与应对",
    category: "高海拔安全",
    icon: Mountains,
    content: [
      "预防措施：",
      "- 出发前1周开始服用红景天（每日2次，每次2粒）",
      "- 到达高原后避免剧烈运动，给身体2-3天适应时间",
      "- 保证充足睡眠，多喝水（每日2-3L），避免饮酒",
      "- 穿着保暖衣物，高海拔地区体温下降快",
      "",
      "应对措施：",
      "- 轻度症状（头痛、心悸）：停止上升，原地休息，补充水分",
      "- 中度症状（呼吸困难、恶心）：立即下撤至低海拔，切勿硬撑",
      "- 重度症状（意识模糊、肺水肿）：立即拨打急救电话，就近寻求救援",
      "- 永远记住：没有哪座山峰值得用生命去冒险",
    ],
  },
  {
    title: "暴雨、大风、高温：极端天气下的户外决策",
    category: "恶劣天气",
    icon: CloudRain,
    content: [
      "暴雨天气：",
      "- 立即停止前进，寻找安全庇护点，避免在河谷和低洼地带停留",
      "- 远离溪流和河道，暴雨可能引发山洪和泥石流",
      "- 保持体温干燥，湿衣服会加速体温流失导致失温",
      "",
      "大风天气：",
      "- 避免在悬崖边、山脊上停留，风力可能超过你的体重",
      "- 降低重心缓慢行进，避免被大风吹落",
      "- 保护好头部和眼睛，避免被飞石击中",
      "",
      "高温天气：",
      "- 增加休息频率，避免在最热时段（12:00-15:00）行进",
      "- 多补充水分和电解质，感知口渴时已轻度脱水",
      "- 注意防晒，佩戴遮阳帽和墨镜，穿着透气衣物",
    ],
  },
  {
    title: "迷路时的正确做法：STOP原则",
    category: "迷路应对",
    icon: Compass,
    content: [
      "S - Stop（停下来）：",
      "发现迷路后立即停止前进，继续走动只会让你更加迷失",
      "",
      "T - Think（思考）：",
      "回顾走过的路，回想是否有明显地标，尝试确定当前位置",
      "",
      "O - Observe（观察）：",
      "寻找水源（下游通常通向村庄）、空地、高点观察四周",
      "",
      "P - Plan（计划）：",
      "根据观察结果制定行动计划，优先选择安全下撤路线",
      "",
      "其他建议：",
      "- 使用GPS定位功能，记录迷路前的最后位置",
      "- 在空旷处利用衣物搭建醒目信号等待救援",
      "- 保持手机电量，仅在必要时使用以节省电量",
    ],
  },
];

const leaveNoTraceTips = [
  { rule: "1", text: "提前计划并准备：了解目的地的法规和注意事项" },
  { rule: "2", text: "在坚实的地面上行走：使用已有步道，避免踩踏植被" },
  { rule: "3", text: "减少营火影响：使用便携炉具，不在野外生火" },
  { rule: "4", text: "妥善处理垃圾：带走所有垃圾，包括厨余和塑料" },
  { rule: "5", text: "留下自然物品：只带走照片和回忆，不取走任何自然物" },
  { rule: "6", text: "保护水源：远离水源洗漱，不在水源中洗涤物品" },
  { rule: "7", text: "尊重野生动物：远距离观察，不投喂不接近" },
];

export default function SafetyPage() {
  const [expandedTip, setExpandedTip] = useState<number | null>(null);
  const [showAllTips, setShowAllTips] = useState(false);

  const displayedTips = showAllTips ? safetyTips : safetyTips.slice(0, 2);

  return (
    <div className="min-h-screen bg-bg">
      {/* Hero Banner */}
      <section className="relative h-[400px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80"
          alt="Mountain safety"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest-deep/40 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-6 pb-12 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="max-w-2xl"
            >
              <h1 className="text-4xl font-bold text-white">安全出行</h1>
              <p className="text-lg text-white/80 leading-relaxed mt-4">
                户外的美，值得我们用安全的方式去探索。每一次出发，都应平安归来。
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-3 md:grid-cols-6 gap-4"
        >
          {safetyCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <motion.div key={cat.id} variants={staggerItem}>
                <button className="w-full bg-surface rounded-xl p-5 border border-surface-200 hover:border-earth transition-all group text-center">
                  <div className="space-y-3">
                    <Icon
                      size={32}
                      weight="light"
                      strokeWidth={1.5}
                      className="text-forest mx-auto group-hover:text-earth transition-colors"
                    />
                    <h3 className="text-sm font-bold text-forest-deep">{cat.name}</h3>
                    <p className="text-xs text-muted">{cat.desc}</p>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Safety Tips Accordion */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xl font-bold text-forest-deep mb-6"
        >
          安全知识
        </motion.h2>
        <div className="grid grid-cols-1 gap-4">
          {displayedTips.map((tip, index) => {
            const Icon = tip.icon;
            const isExpanded = expandedTip === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-surface rounded-xl border border-surface-200 overflow-hidden">
                  <button
                    onClick={() => setExpandedTip(isExpanded ? null : index)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-white/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <Icon
                        size={24}
                        weight="light"
                        strokeWidth={1.5}
                        className="text-forest"
                      />
                      <div>
                        <span className="text-xs text-muted block mb-1">
                          {tip.category}
                        </span>
                        <h3 className="text-base font-bold text-forest-deep">
                          {tip.title}
                        </h3>
                      </div>
                    </div>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={isExpanded ? "up" : "down"}
                        initial={{ opacity: 0, rotate: -90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 90 }}
                        transition={{ duration: 0.2 }}
                      >
                        {isExpanded ? (
                          <CaretUp size={20} weight="light" className="text-muted" />
                        ) : (
                          <CaretDown size={20} weight="light" className="text-muted" />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </button>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 border-t border-surface-200">
                          <div className="pt-4 space-y-2">
                            {tip.content.map((line, lineIndex) => (
                              <p
                                key={lineIndex}
                                className={`text-sm leading-relaxed ${
                                  line === ""
                                    ? "h-2"
                                    : line.endsWith("：")
                                    ? "text-forest-deep font-medium"
                                    : "text-muted"
                                }`}
                              >
                                {line}
                              </p>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
        {safetyTips.length > 2 && (
          <div className="mt-4 text-center">
            <button
              onClick={() => setShowAllTips(!showAllTips)}
              className="inline-flex items-center gap-2 px-6 py-2 text-sm font-medium text-forest hover:text-earth transition-colors"
            >
              {showAllTips ? "收起" : "展开更多"}
              <CaretDown
                size={16}
                weight="light"
                className={`transition-transform ${showAllTips ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        )}
      </section>

      {/* Emergency Contacts */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xl font-bold text-forest-deep mb-6"
        >
          紧急联络
        </motion.h2>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {emergencyContacts.map((contact, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="bg-surface rounded-xl p-5 border border-surface-200 hover:border-earth transition-all"
            >
              <div className="space-y-3">
                <Phone size={24} weight="light" strokeWidth={1.5} className="text-earth" />
                <div>
                  <h3 className="text-sm font-bold text-forest-deep">{contact.name}</h3>
                  <p className="text-xl font-bold text-earth mt-1">{contact.number}</p>
                  <p className="text-xs text-muted mt-1">{contact.available}</p>
                </div>
                <a
                  href={`tel:${contact.number}`}
                  className="mt-2 w-full block text-center py-2.5 bg-earth text-white text-sm font-medium rounded-lg hover:bg-earth-light transition-colors"
                >
                  一键拨打
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Environmental Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xl font-bold text-forest-deep mb-6"
        >
          无痕山野
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-forest-deep rounded-2xl p-8 text-white"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 items-center">
            <div className="space-y-4">
              <MapTrifold
                size={48}
                weight="light"
                strokeWidth={1.5}
                className="text-earth"
              />
              <h3 className="text-lg font-bold">Leave No Trace</h3>
              <p className="text-sm text-white/70 leading-relaxed">
                我们走进山野，山野也在心中留下痕迹。带走一切，带走记忆，不留痕迹。
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {leaveNoTraceTips.map((tip) => (
                <div key={tip.rule} className="flex gap-3 items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-earth text-forest-deep text-xs font-bold flex-shrink-0">
                    {tip.rule}
                  </span>
                  <p className="text-sm text-white/80 leading-relaxed">{tip.text}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
