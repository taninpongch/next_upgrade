<template>
  <transition name="fade">
    <div v-if="show && !correct" class="bg-red-50 border-l-4 border-red-400 p-4 rounded-md space-y-1 mt-4">
      <BizShareText class="text-red-600" text="❌ คำตอบไม่ถูกต้อง" />
      <BizShareText class="text-green-700" :text="`✅ คำตอบที่ถูกคือ: ${correctAnswer}`" />
      <BizShareText class="text-gray-600" :text="`💡 ${explanation}`" />
    </div>
  </transition>
</template>

<script lang="ts" setup>
defineProps<{
  show: boolean
  correct: boolean
  correctAnswer: string
  explanation: string
}>()
</script>
