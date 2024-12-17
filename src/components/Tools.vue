<template>
  <section
    class="w-full flex flex-col items-center lg:max-w-none max-w-md mx-auto mb-8 text-white"
  >
    <div class="lg:w-5/12 w-full">
      <h3 class="text-lg font-semibold max-w-nav w-full relative z-10">
        Apps I like using
      </h3>
      <div class="flex items-center relative">
        <!-- Gradient Blurs -->
        <div
          class="gradient-blur pointer-events-none w-1/2 ml-auto z-10 -right-16 absolute inset-0 -mr-10 hidden lg:block"
        >
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
        <div
          class="gradient-blur pointer-events-none z-10 w-1/2 -left-16 absolute inset-0 rotate-180 -ml-10 hidden lg:block"
        >
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
        <!-- Scrolling Icons -->
        <div
          class="w-full inline-flex pt-12 pb-20 flex-nowrap overflow-hidden"
          style="
            mask-image: linear-gradient(
              to right,
              transparent 0,
              black 128px,
              black calc(100% - 128px),
              transparent 100%
            );
          "
        >
          <ul
            ref="icons"
            class="flex items-center justify-center md:justify-start [&_li]:mx-6 [&_img]:max-w-none animate-infinite-scroll"
          >
            <li
              v-for="tool in tools"
              :key="tool.name"
              class="group relative flex-shrink-0"
            >
              <img
                :src="tool.icon"
                :alt="tool.name"
                class="w-16 h-16 rounded-2xl border border-neutral-200 cursor-alias hover:shadow-lg hover:shadow-black/5 transition-all dark:border-neutral-800"
                @click="handleIconClick(tool.link)"
              />
              <CustomTooltip position="top" class="-translate-y-3.5 z-20">
                {{ tool.name }}
              </CustomTooltip>
            </li>
          </ul>
          <!-- Duplicate for Infinite Scroll -->
          <ul
            aria-hidden="true"
            class="flex items-center justify-center md:justify-start [&_li]:mx-6 [&_img]:max-w-none animate-infinite-scroll"
          >
            <li
              v-for="tool in tools"
              :key="'duplicate-' + tool.name"
              class="group relative flex-shrink-0"
            >
              <img
                :src="tool.icon"
                :alt="tool.name"
                class="w-16 h-16 rounded-2xl border border-neutral-200 cursor-alias hover:shadow-lg hover:shadow-black/5 transition-all dark:border-neutral-800"
                @click="handleIconClick(tool.link)"
              />
              <CustomTooltip position="top" class="-translate-y-3.5 z-20">
                {{ tool.name }}
              </CustomTooltip>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import CustomTooltip from '@/components/CustomTooltip.vue'

const tools = ref([
  {
    name: 'Notion',
    icon: '/images/apps/app_notion.jpg',
    link: 'https://apps.apple.com/us/app/notion-notes-docs-tasks/id1232780281',
  },
  {
    name: 'Expedia',
    icon: '/images/apps/app_expedia.jpg',
    link: 'https://apps.apple.com/us/app/expedia-hotels-flights-car/id427916203',
  },
  {
    name: 'X (Twitter)',
    icon: '/images/apps/app_x.jpg',
    link: 'https://apps.apple.com/de/app/x/id333903271',
  },
  // {
  //   name: 'Flighty',
  //   icon: '/images/apps/app_flighty.jpg',
  //   link: 'https://apps.apple.com/us/app/flighty-live-flight-tracker/id1358823008',
  // },
  {
    name: 'Spotify',
    icon: '/images/apps/app_spotify.jpg',
    link: 'https://apps.apple.com/us/app/spotify-music-and-podcasts/id324684580',
  },
  {
    name: 'Notes',
    icon: '/images/apps/app_notes.jpg',
    link: 'https://apps.apple.com/us/app/finanzguru-konten-vertr%C3%A4ge/id1214803607',
  },
  {
    name: 'Messages',
    icon: '/images/apps/app_messages.jpg',
    link: 'https://apps.apple.com/us/app/messages/id1146560473',
  },
  {
    name: 'Reddit',
    icon: '/images/apps/app_reddit.jpg',
    link: 'https://apps.apple.com/us/app/cron-calendar/id1607562761',
  },
])

const handleIconClick = (link: string) => {
  if (typeof window !== 'undefined' && window.innerWidth > 768) {
    window.open(link, '_blank')
  }
}
</script>
