import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Users, CurrencyDollar } from "@phosphor-icons/react/dist/ssr";

interface ActivityCardProps {
  id: string;
  title: string;
  date: string;
  location: string;
  difficulty: string;
  participants: number;
  maxParticipants: number;
  price: number;
  image: string;
  tags?: string[];
}

export default function ActivityCard({
  id,
  title,
  date,
  location,
  difficulty,
  participants,
  maxParticipants,
  price,
  image,
  tags,
}: ActivityCardProps) {
  const isFull = participants >= maxParticipants;
  const fillPercent = Math.min((participants / maxParticipants) * 100, 100);

  return (
    <Link
      href={`/activities/${id}`}
      className="group flex gap-4 md:gap-6 p-3 md:p-4 bg-white rounded-2xl border border-surface hover:border-forest-deep/10 transition-all duration-300 hover:shadow-lg"
    >
      {/* Image */}
      <div className="relative w-28 h-28 md:w-36 md:h-36 flex-shrink-0 rounded-xl overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {isFull && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white text-xs font-semibold bg-red-600 px-2 py-1 rounded-full">
              已满员
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
        <div>
          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-2">
              {tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-xs bg-surface text-muted rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h3 className="font-bold text-base md:text-lg text-forest-deep group-hover:text-forest transition-colors line-clamp-2 leading-snug">
            {title}
          </h3>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-muted">
            <div className="flex items-center gap-1">
              <Calendar size={13} weight="duotone" className="text-earth" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={13} weight="duotone" className="text-sky" />
              <span className="line-clamp-1">{location}</span>
            </div>
          </div>

          {/* Difficulty */}
          <div className="mt-2">
            <span className="inline-block px-2.5 py-1 text-xs font-semibold bg-forest-deep/8 text-forest-deep rounded-full">
              {difficulty}
            </span>
          </div>
        </div>

        {/* Bottom: participants + price */}
        <div className="flex items-end justify-between mt-3">
          <div className="space-y-1 min-w-0">
            {/* Progress bar */}
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-surface rounded-full overflow-hidden max-w-[100px]">
                <div
                  className={`h-full rounded-full transition-all ${
                    isFull ? "bg-red-500" : "bg-forest"
                  }`}
                  style={{ width: `${fillPercent}%` }}
                />
              </div>
              <div className="flex items-center gap-1 text-xs text-muted whitespace-nowrap">
                <Users size={12} weight="duotone" />
                <span>
                  {participants}/{maxParticipants}
                </span>
              </div>
            </div>
          </div>

          <div className="text-right flex-shrink-0 ml-3">
            <div className="flex items-center gap-1">
              {price === 0 ? (
                <span className="text-sm font-bold text-forest">免费</span>
              ) : (
                <>
                  <CurrencyDollar size={14} weight="bold" className="text-earth" />
                  <span className="text-lg font-bold text-earth">{price}</span>
                  <span className="text-xs text-muted">/人</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
