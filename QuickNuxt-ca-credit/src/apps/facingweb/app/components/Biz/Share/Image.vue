<template>
  <UAvatar :src="image" :icon="icon" :size="size" :ui="{
    icon: {
      size: {
        '2xs': 'h-5 w-5 text-[10px]',
        sm: 'h-8 w-8 text-sm',
        md: 'h-10 w-10 text-base',
        '2xl': 'h-16 w-16 text-2xl',
        '3xl': 'h-20 w-20 text-3xl',
      },
    },
    background: 'bg-transparent dark:bg-transparent',
    rounded: rounded ? 'rounded-full' : '',
    size: {
      '4xl': 'h-48 w-48', // TODO: Idea ขนาดที่มากกว่า 3xl (รอคุย Graphic)
      'custom': 'w-24' // TODO: ใช้ในรูป thaiQr ที่เป็นสี่เหลี่ยมพื้นผ้า
    }
  }" />
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    src: string,
    size?: string,
    rounded?: boolean
  }>(), { size: 'sm', rounded: true }
)

const image = computed(() => {
  let originalSource = props.src;
  let isImage = originalSource?.startsWith("https://") || originalSource?.startsWith("data:image");
  return isImage ? originalSource : undefined;
});
const icon = computed(() => {
  let originalSource = props.src;
  let isImage = originalSource?.startsWith("https://");
  return !isImage ? originalSource : undefined;
});
</script>