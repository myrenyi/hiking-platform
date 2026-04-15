'use client';

import { useState } from 'react';
import {
  Heart,
  ChatCircle,
  MapPin,
  CalendarBlank,
  Users,
  Plus,
  MagnifyingGlass,
  TrendUp,
  Compass,
  MapTrifold,
} from '@phosphor-icons/react';

const forumPosts = [
  {
    id: 1,
    user: '山野追风',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    title: '分享：秦岭太白山三月份穿越实录（附详细路书）',
    excerpt: '刚从太白山回来，这次走的是铁甲树到汤峪的传统穿越路线...',
    tags: ['秦岭', '穿越', '攻略'],
    likes: 128,
    comments: 45,
    date: '2026-04-14',
  },
  {
    id: 2,
    user: '徒步爱好者小李',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    title: '新手请教：两日轻徒需要准备哪些装备？',
    excerpt: '准备下周末去莫干山走走，两天一夜的路线，新手第一次露营...',
    tags: ['新手', '装备', '问答'],
    likes: 34,
    comments: 67,
    date: '2026-04-13',
  },
  {
    id: 3,
    user: '云端漫步',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    title: '雨崩村实地考察：神瀑、冰湖、 神湖三条线怎么选',
    excerpt: '在雨崩待了一周，把三条主线都走了一遍，给大家做个对比...',
    tags: ['云南', '雨崩', '对比'],
    likes: 256,
    comments: 89,
    date: '2026-04-12',
  },
  {
    id: 4,
    user: '行者无疆',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
    title: '探讨：户外领队应该具备哪些素质？',
    excerpt: '最近参加了几次商业队，发现领队的水平参差不齐...',
    tags: ['领队', '安全', '讨论'],
    likes: 89,
    comments: 123,
    date: '2026-04-11',
  },
];

const companionPosts = [
  {
    id: 1,
    user: '户外新人小王',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80',
    route: '婺源石城 - 篁岭古道',
    location: '江西·婺源',
    date: '2026-04-20',
    days: 3,
    peopleNeeded: 2,
    currentPeople: 1,
    difficulty: '入门',
    contact: 'wx: outdoor_wang',
    note: '寻找有徒步经验的伙伴，新手友好路线',
  },
  {
    id: 2,
    user: '摄影背包客',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&q=80',
    route: '大理苍山 - 洗马潭',
    location: '云南·大理',
    date: '2026-04-25',
    days: 2,
    peopleNeeded: 1,
    currentPeople: 2,
    difficulty: '进阶',
    contact: 'tel: 138****8888',
    note: '重装轻徒摄影，招募会拍照的伙伴',
  },
  {
    id: 3,
    user: '老驴阿杰',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80',
    route: '黄山光明顶 - 北海景区',
    location: '安徽·黄山',
    date: '2026-05-01',
    days: 2,
    peopleNeeded: 3,
    currentPeople: 2,
    difficulty: '入门',
    contact: 'wx: laolv_jie',
    note: '避开旺季人流，探索小众路线',
  },
  {
    id: 4,
    user: '高原探险者',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80',
    route: '四姑娘山双桥沟',
    location: '四川·阿坝',
    date: '2026-05-10',
    days: 3,
    peopleNeeded: 2,
    currentPeople: 1,
    difficulty: '进阶',
    contact: 'tel: 139****6677',
    note: '高原徒步，需要有一定高海拔经验',
  },
];

const difficultyColors: Record<string, string> = {
  '入门': 'bg-forest/10 text-forest',
  '进阶': 'bg-sky/10 text-sky',
  '专业': 'bg-earth/10 text-earth',
};

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<'forum' | 'companion'>('forum');

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-surface border-b border-surface-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="grid grid-cols-1 gap-4 items-center">
            <div className="grid grid-cols-1 gap-4">
              <h1 className="text-2xl font-bold text-forest-deep">社区</h1>
              <div className="relative">
                <MagnifyingGlass
                  size={20}
                  weight="light"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                />
                <input
                  type="text"
                  placeholder="搜索帖子、路线、用户..."
                  className="w-full pl-12 pr-4 py-3 bg-bg border border-surface-200 rounded-lg text-sm font-sans placeholder:text-muted focus:outline-none focus:border-earth transition-colors"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Bar */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 gap-0 border-b border-surface-200">
          <button
            onClick={() => setActiveTab('forum')}
            className={`grid grid-cols-[auto_1fr] gap-2 items-center px-6 py-4 text-sm font-medium transition-colors border-b-2 ${
              activeTab === 'forum'
                ? 'border-earth text-earth'
                : 'border-transparent text-muted hover:text-forest-deep'
            }`}
          >
            <ChatCircle size={18} weight={activeTab === 'forum' ? 'fill' : 'light'} strokeWidth={1.5} />
            徒步论坛
          </button>
          <button
            onClick={() => setActiveTab('companion')}
            className={`grid grid-cols-[auto_1fr] gap-2 items-center px-6 py-4 text-sm font-medium transition-colors border-b-2 ${
              activeTab === 'companion'
                ? 'border-earth text-earth'
                : 'border-transparent text-muted hover:text-forest-deep'
            }`}
          >
            <Users size={18} weight={activeTab === 'companion' ? 'fill' : 'light'} strokeWidth={1.5} />
            结伴同行
          </button>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'forum' ? (
          <div className="grid grid-cols-1 gap-6">
            {/* Forum Stats */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-surface rounded-xl p-4 border border-surface-200">
                <div className="grid grid-cols-[auto_1fr] gap-3 items-center">
                  <TrendUp size={20} weight="light" strokeWidth={1.5} className="text-earth" />
                  <div>
                    <p className="text-xs text-muted">今日新帖</p>
                    <p className="text-lg font-bold text-forest-deep">128</p>
                  </div>
                </div>
              </div>
              <div className="bg-surface rounded-xl p-4 border border-surface-200">
                <div className="grid grid-cols-[auto_1fr] gap-3 items-center">
                  <ChatCircle size={20} weight="light" strokeWidth={1.5} className="text-sky" />
                  <div>
                    <p className="text-xs text-muted">活跃用户</p>
                    <p className="text-lg font-bold text-forest-deep">3,456</p>
                  </div>
                </div>
              </div>
              <div className="bg-surface rounded-xl p-4 border border-surface-200">
                <div className="grid grid-cols-[auto_1fr] gap-3 items-center">
                  <MapTrifold size={20} weight="light" strokeWidth={1.5} className="text-forest" />
                  <div>
                    <p className="text-xs text-muted">精选路线</p>
                    <p className="text-lg font-bold text-forest-deep">89</p>
                  </div>
                </div>
              </div>
              <div className="bg-surface rounded-xl p-4 border border-surface-200">
                <div className="grid grid-cols-[auto_1fr] gap-3 items-center">
                  <Compass size={20} weight="light" strokeWidth={1.5} className="text-earth" />
                  <div>
                    <p className="text-xs text-muted">本周话题</p>
                    <p className="text-lg font-bold text-forest-deep">256</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Post Cards */}
            {forumPosts.map((post) => (
              <article
                key={post.id}
                className="bg-surface rounded-xl p-6 border border-surface-200 hover:border-earth transition-all cursor-pointer"
              >
                <div className="grid grid-cols-[60px_1fr] gap-6">
                  <img
                    src={post.avatar}
                    alt={post.user}
                    className="w-[60px] h-[60px] rounded-full object-cover"
                  />
                  <div className="grid grid-cols-1 gap-3">
                    <div className="grid grid-cols-[1fr_auto] gap-4 items-start">
                      <div>
                        <h3 className="text-base font-bold text-forest-deep hover:text-earth transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-sm text-muted mt-2 leading-relaxed">{post.excerpt}</p>
                      </div>
                      <span className="text-xs text-muted whitespace-nowrap">{post.date}</span>
                    </div>
                    <div className="grid grid-cols-[1fr_auto] gap-4 items-center">
                      <div className="flex gap-2 flex-wrap">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2 py-0.5 bg-forest/10 text-forest text-xs rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-4">
                        <div className="flex items-center gap-1.5 text-muted">
                          <Heart size={16} weight="light" strokeWidth={1.5} />
                          <span className="text-sm">{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-muted">
                          <ChatCircle size={16} weight="light" strokeWidth={1.5} />
                          <span className="text-sm">{post.comments}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6">
            {companionPosts.map((post) => (
              <article
                key={post.id}
                className="bg-surface rounded-xl p-6 border border-surface-200 hover:border-earth transition-all"
              >
                <div className="grid grid-cols-1 gap-4">
                  <div className="grid grid-cols-[60px_1fr] gap-4 items-center">
                    <img
                      src={post.avatar}
                      alt={post.user}
                      className="w-[60px] h-[60px] rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-base font-bold text-forest-deep">{post.user}</h3>
                      <p className="text-sm text-muted">{post.note}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-[1fr_1fr] gap-4">
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex items-center gap-2 text-sm text-muted">
                        <MapTrifold size={14} weight="light" strokeWidth={1.5} />
                        {post.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted">
                        <CalendarBlank size={14} weight="light" strokeWidth={1.5} />
                        {post.date} / {post.days}天
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${difficultyColors[post.difficulty] || 'bg-muted/10 text-muted'}`}>
                          {post.difficulty}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted">
                        <Users size={14} weight="light" strokeWidth={1.5} />
                        还需{post.peopleNeeded}人
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-surface-200">
                    <div className="flex items-center gap-2 mb-3">
                      <MapTrifold size={16} weight="light" strokeWidth={1.5} className="text-earth" />
                      <span className="text-sm font-medium text-forest-deep">{post.route}</span>
                    </div>
                    <div className="grid grid-cols-[1fr_auto] gap-3">
                      <div className="flex items-center gap-2 text-xs text-muted bg-bg px-3 py-2 rounded-lg">
                        {post.contact}
                      </div>
                      <button className="px-6 py-2 bg-earth text-white text-sm font-medium rounded-lg hover:bg-earth-light transition-colors">
                        联系
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* FAB */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-earth text-white rounded-full shadow-lg hover:bg-earth-light transition-all flex items-center justify-center">
        <Plus size={24} weight="bold" strokeWidth={1.5} />
      </button>
    </div>
  );
}
