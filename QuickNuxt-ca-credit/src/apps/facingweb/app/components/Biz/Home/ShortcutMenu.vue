<template>
  <div class="bg-gray-200 dark:bg-gray-700 -m-4 space-y-4 p-4 mb-2 sticky top-0 z-50">
    <BizShareSessionTitle label="รายการโปรด" />
    <UCarousel v-if="data && data.length > 0" v-slot="{ item, index }" :items="data"
      :ui="{ item: 'snap-start w-16', container: 'space-x-4' }">
      <div class="text-center mx-auto" @click="emits(emitName, item)">
        <BizShareImage :chip-color="item.noti ? 'primary' : null" size="sm" :src="item.src" :alt="item.name" />
        <div class="w-16">
          <p class="truncate text-xs">{{ item.name }}</p>
        </div>
      </div>
    </UCarousel>
    <p v-else class="text-center text-gray-400">ไม่มีรายการที่เลือกไว้</p>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    data: {
      name: string,
      src: string,
      endpointUrl: string,
      noti?: boolean
    }[]
  }>(), {}
)
const emitName = "onTapped";
const emits = defineEmits([emitName]);
</script>