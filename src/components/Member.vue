<template>
  <div class="rounded-[20px] bg-white p-3 pb-4 relative overflow-hidden group">
    <img
      src="https://picsum.photos/400/400"
      alt="photo"
      class="mb-4 aspect-square w-full rounded-2xl object-cover"
    />
    <div class="item-center flex flex-col gap-y-2 text-center">
      <p class="text-lg font-semibold leading-tight text-[#201B17] sm:text-xl">
        Jon Doe
      </p>
      <p class="text-sm leading-tight text-[#696969] sm:text-base">
        Retail Director
      </p>
    </div>
    <div
      class="absolute size-full bg-white top-0 left-0 translate-y-1/2 invisible opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:visible group-hover:opacity-100"
    >
      <div class="size-full p-4 flex flex-col items-center gap-4">
        <div class="flex flex-col items-center gap-1 text-center">
          <p
            class="text-lg font-semibold leading-136 text-[#201B17] sm:text-xl"
          >
            Jon Doe
          </p>
          <p class="text-sm leading-136 text-[#696969] sm:text-base">
            Retail Director
          </p>
        </div>
        <p class="text-sm text-[#030303] text-center">
          Alisher Navoiy (1441-1501) - buyuk shoir va mutafakkir, davlat arbobi.
          To‘liq ismi Nizomiddin Mir Alisher. Navoiy tahallusi ostida chig‘atoy
          (eki o‘zbek tili) hamda forsiyda (fors tilidagi asarlarida) ijod
          qilgan.
        </p>
        <div>
          <p class="text-sm font-medium text-[#030303] text-center">
            +998 99 123 45 67
          </p>
        </div>
        <div class="mt-auto flex items-center gap-2">
          <div
            v-for="i in 5"
            :key="i"
            class="size-8 rounded-full bg-[#030303]/10 transition-colors duration-200 hover:bg-[#030303]"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
