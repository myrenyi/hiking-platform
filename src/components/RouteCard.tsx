"use client";
import Image from "next/image";
import Link from "next/link";
import { Star, Clock, MapPin } from "@phosphor-icons/react";

interface RouteCardProps {
  id: string;
  name: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  days: number;
  location: string;
  highlight: string;
  rating: number;
  image: string;
  price?: number;
}

function DifficultyStars({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={12}
          weight={s <= level ? "fill" : "regular"}
          className={s <= level ? "text-earth" : "text-gray-300"}
        />
      ))}
    </div>
  );
}

export default function RouteCard({
  id,
  name,
  difficulty,
  days,
  location,
  highlight,
  rating,
  image,
  price,
}: RouteCardProps) {
  return (
    <Link
      href={`/routes/${id}`}
      className="group block rounded-3xl overflow-hidden bg-white border border-surface hover:border-forest-deep/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Difficulty badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full">
          <DifficultyStars level={difficulty} />
          <span className="text-xs font-medium text-muted">
            {difficulty === 1
              ? "入门"
              : difficulty === 2
              ? "简单"
              : difficulty === 3
              ? "进阶"
              : difficulty === 4
              ? "困难"
              : "探险"}
          </span>
        </div>
        {/* Price badge */}
        {price !== undefined && (
          <div className="absolute top-3 right-3 px-3 py-1.5 bg-earth/90 backdrop-blur-sm text-white text-sm font-semibold rounded-full">
            {price === 0 ? "免费" : `¥${price}`}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <h3 className="font-bold text-lg text-forest-deep group-hover:text-forest transition-colors line-clamp-1">
          {name}
        </h3>

        <div className="flex items-center gap-4 text-sm text-muted">
          <div className="flex items-center gap-1">
            <Clock size={14} weight="duotone" />
            <span>{days}天</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin size={14} weight="duotone" className="text-sky" />
            <span className="line-clamp-1">{location}</span>
          </div>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
          {highlight}
        </p>

        {/* Rating */}
        <div className="flex items-center justify-between pt-2 border-t border-surface">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={13}
                weight={s <= Math.round(rating) ? "fill" : "regular"}
                className={s <= Math.round(rating) ? "text-earth" : "text-gray-200"}
              />
            ))}
            <span className="ml-1.5 text-sm font-medium text-gray-700">
              {rating.toFixed(1)}
            </span>
          </div>
          <span className="text-sm text-forest font-medium group-hover:underline">
            查看详情 →
          </span>
        </div>
      </div>
    </Link>
  );
}
