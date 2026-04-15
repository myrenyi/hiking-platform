"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { CaretLeft, CaretRight, Circle } from "@phosphor-icons/react";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1920&q=80",
    title: "踏遍山川，不负热爱",
    subtitle: "用脚步丈量世界，让山野洗涤心灵",
    cta: "探索路线",
    href: "/routes",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80",
    title: "高海拔挑战，遇见更好的自己",
    subtitle: "从入门到进阶，每一座山都有它的故事",
    cta: "新手入门",
    href: "/routes?difficulty=beginner",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1504280506541-aca1b1df0bde?w=1920&q=80",
    title: "结伴而行，安全归来",
    subtitle: "专业活动报名，完善的安全保障体系",
    cta: "查看活动",
    href: "/activities",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80",
    title: "无痕山野，守护自然",
    subtitle: "传递环保理念，每一次徒步都是一次守护",
    cta: "安全指南",
    href: "/safety",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  return (
    <section
      className="relative h-[100dvh] min-h-[600px] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Image Slides */}
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={i === 0}
          />
          {/* Gradient overlay - split layout: darker on left */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
        </div>
      ))}

      {/* Content - Split Screen, left aligned */}
      <div className="relative z-20 h-full flex items-center">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 w-full">
          <div className="max-w-xl">
            <div
              key={current}
              className="space-y-6"
              style={{
                animation: "fadeUp 0.7s ease-out forwards",
              }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-none text-white">
                {slides[current].title}
              </h1>
              <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                {slides[current].subtitle}
              </p>
              <Link
                href={slides[current].href}
                className="inline-flex items-center gap-2 px-8 py-4 bg-earth text-white font-semibold rounded-full hover:bg-earth-light transition-all duration-300 hover:gap-4 active:scale-[0.98]"
              >
                {slides[current].cta}
                <CaretRight size={20} weight="bold" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        aria-label="上一张"
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all active:scale-90"
      >
        <CaretLeft size={24} weight="bold" />
      </button>
      <button
        onClick={next}
        aria-label="下一张"
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all active:scale-90"
      >
        <CaretRight size={24} weight="bold" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`第${i + 1}张`}
            className="transition-all duration-300"
          >
            <Circle
              size={i === current ? 12 : 8}
              weight={i === current ? "fill" : "regular"}
              className={
                i === current ? "text-earth" : "text-white/50 hover:text-white/80"
              }
            />
          </button>
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 z-30 hidden md:flex flex-col items-center gap-2 text-white/50 text-xs">
        <span className="writing-vertical tracking-widest">向下滚动</span>
        <div
          className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent"
          style={{ animation: "float 2s ease-in-out infinite" }}
        />
      </div>
    </section>
  );
}
