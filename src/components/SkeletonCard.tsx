"use client";

import { motion } from "framer-motion";

interface SkeletonCardProps {
  variant?: "route" | "activity" | "news" | "forum";
  className?: string;
}

export default function SkeletonCard({ variant = "route", className = "" }: SkeletonCardProps) {
  const shimmer = {
    backgroundImage: "linear-gradient(90deg, #f0ede8 25%, #e8e4de 50%, #f0ede8 75%)",
    backgroundSize: "200% 100%",
  };

  const animate = {
    backgroundPosition: ["200% 0", "-200% 0"],
  };

  if (variant === "route") {
    return (
      <div className={`rounded-3xl overflow-hidden bg-white border border-surface ${className}`}>
        {/* Image */}
        <motion.div
          className="h-48 bg-surface"
          animate={animate}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          style={shimmer}
        />
        {/* Content */}
        <div className="p-5 space-y-3">
          <motion.div
            className="h-5 bg-surface rounded-lg w-3/4"
            animate={animate}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.1 }}
            style={shimmer}
          />
          <div className="flex gap-4">
            <motion.div
              className="h-4 bg-surface rounded w-16"
              animate={animate}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.2 }}
              style={shimmer}
            />
            <motion.div
              className="h-4 bg-surface rounded w-20"
              animate={animate}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.25 }}
              style={shimmer}
            />
          </div>
          <motion.div
            className="h-3 bg-surface rounded w-full"
            animate={animate}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.3 }}
            style={shimmer}
          />
          <motion.div
            className="h-3 bg-surface rounded w-2/3"
            animate={animate}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.35 }}
            style={shimmer}
          />
          <div className="flex justify-between items-center pt-2 border-t border-surface">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <motion.div
                  key={s}
                  className="w-3 h-3 bg-surface rounded"
                  animate={animate}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.4 + s * 0.05 }}
                  style={shimmer}
                />
              ))}
            </div>
            <motion.div
              className="h-4 bg-surface rounded w-16"
              animate={animate}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.5 }}
              style={shimmer}
            />
          </div>
        </div>
      </div>
    );
  }

  if (variant === "activity") {
    return (
      <div className={`flex gap-4 p-4 bg-white rounded-2xl border border-surface ${className}`}>
        <motion.div
          className="w-28 h-28 md:w-36 md:h-36 rounded-xl bg-surface flex-shrink-0"
          animate={animate}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          style={shimmer}
        />
        <div className="flex-1 min-w-0 flex flex-col justify-between py-1 space-y-3">
          <div className="space-y-2">
            <div className="flex gap-2">
              <motion.div
                className="h-4 bg-surface rounded w-16"
                animate={animate}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.1 }}
                style={shimmer}
              />
              <motion.div
                className="h-4 bg-surface rounded w-16"
                animate={animate}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.15 }}
                style={shimmer}
              />
            </div>
            <motion.div
              className="h-5 bg-surface rounded w-full"
              animate={animate}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.2 }}
              style={shimmer}
            />
            <motion.div
              className="h-4 bg-surface rounded w-1/2"
              animate={animate}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.25 }}
              style={shimmer}
            />
          </div>
          <div className="flex items-end justify-between">
            <motion.div
              className="h-1.5 bg-surface rounded-full w-24"
              animate={animate}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.3 }}
              style={shimmer}
            />
            <motion.div
              className="h-6 bg-surface rounded w-16"
              animate={animate}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.35 }}
              style={shimmer}
            />
          </div>
        </div>
      </div>
    );
  }

  if (variant === "news") {
    return (
      <div className={`p-5 rounded-2xl bg-white border border-surface ${className}`}>
        <div className="flex items-start gap-4">
          <motion.div
            className="w-10 h-10 rounded-xl bg-surface flex-shrink-0"
            animate={animate}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            style={shimmer}
          />
          <div className="flex-1 space-y-2">
            <div className="flex gap-2 items-center">
              <motion.div
                className="h-4 bg-surface rounded w-16"
                animate={animate}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.1 }}
                style={shimmer}
              />
              <motion.div
                className="h-3 bg-surface rounded w-20"
                animate={animate}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.15 }}
                style={shimmer}
              />
            </div>
            <motion.div
              className="h-4 bg-surface rounded w-full"
              animate={animate}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.2 }}
              style={shimmer}
            />
            <motion.div
              className="h-3 bg-surface rounded w-4/5"
              animate={animate}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.25 }}
              style={shimmer}
            />
            <motion.div
              className="h-3 bg-surface rounded w-2/3"
              animate={animate}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.3 }}
              style={shimmer}
            />
          </div>
        </div>
      </div>
    );
  }

  if (variant === "forum") {
    return (
      <div className={`p-6 bg-surface rounded-xl border border-surface-200 ${className}`}>
        <div className="flex gap-6">
          <motion.div
            className="w-[60px] h-[60px] rounded-full bg-surface flex-shrink-0"
            animate={animate}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            style={shimmer}
          />
          <div className="flex-1 space-y-3">
            <motion.div
              className="h-4 bg-surface rounded w-3/4"
              animate={animate}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.1 }}
              style={shimmer}
            />
            <motion.div
              className="h-3 bg-surface rounded w-full"
              animate={animate}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.15 }}
              style={shimmer}
            />
            <motion.div
              className="h-3 bg-surface rounded w-2/3"
              animate={animate}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.2 }}
              style={shimmer}
            />
            <div className="flex items-center justify-between pt-2">
              <div className="flex gap-2">
                <motion.div
                  className="h-5 bg-surface rounded-full w-12"
                  animate={animate}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.25 }}
                  style={shimmer}
                />
                <motion.div
                  className="h-5 bg-surface rounded-full w-12"
                  animate={animate}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.3 }}
                  style={shimmer}
                />
              </div>
              <div className="flex gap-4">
                {[1, 2].map((s) => (
                  <motion.div
                    key={s}
                    className="h-4 bg-surface rounded w-8"
                    animate={animate}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.35 + s * 0.05 }}
                    style={shimmer}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
