"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import ActivityCard from "./ActivityCard";
import { staggerContainer, staggerItem } from "./MotionWrapper";

const mockActivities = [
  {
    id: "act-001",
    title: "周末轻徒 | 四姑娘山双桥沟入门行",
    date: "2026-04-20",
    location: "四川·阿坝",
    difficulty: "入门",
    participants: 12,
    maxParticipants: 15,
    price: 680,
    image:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80",
    tags: ["周末", "入门"],
  },
  {
    id: "act-002",
    title: "端午特辑 | 青海湖环湖徒步+露营",
    date: "2026-05-01",
    location: "青海·海北",
    difficulty: "进阶",
    participants: 20,
    maxParticipants: 25,
    price: 1880,
    image:
      "https://images.unsplash.com/photo-1504280506541-aca1b1df0bde?w=600&q=80",
    tags: ["节假日", "露营"],
  },
  {
    id: "act-003",
    title: "企业团建定制 | 莫干山定向穿越",
    date: "随时出发",
    location: "浙江·湖州",
    difficulty: "团建",
    participants: 8,
    maxParticipants: 50,
    price: 380,
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80",
    tags: ["团建", "定制"],
  },
  {
    id: "act-004",
    title: "新手体验营 | 杭州十里琅珰亲子徒步",
    date: "2026-04-26",
    location: "浙江·杭州",
    difficulty: "入门",
    participants: 15,
    maxParticipants: 20,
    price: 0,
    image:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80",
    tags: ["亲子", "免费"],
  },
];

export default function ActivitiesSection() {
  return (
    <section className="py-20 md:py-28 bg-surface">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <span className="text-sm font-semibold text-earth tracking-wider uppercase mb-3 block">
              活动报名
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-forest-deep tracking-tight">
              近期活动
            </h2>
          </div>
          <Link
            href="/activities"
            className="hidden md:flex items-center gap-2 text-sm font-medium text-forest hover:text-forest-deep transition-colors group"
          >
            查看全部活动
            <ArrowRight
              size={16}
              weight="bold"
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {mockActivities.map((act) => (
            <motion.div key={act.id} variants={staggerItem}>
              <ActivityCard {...act} />
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="mt-8 md:hidden text-center"
        >
          <Link
            href="/activities"
            className="inline-flex items-center gap-2 px-6 py-3 bg-forest-deep text-white font-medium rounded-full"
          >
            查看全部活动
            <ArrowRight size={16} weight="bold" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
