<template>
  <!-- //TODO: พี่โจ้อยากให้เปลี่ยน size w-10 h-10 เป็น w-8 h-8 => ตอนนี้ทำไว้ที่ หน้า Page-->
  <UAlert :title="title" :description="description" :variant="transparent ? 'soft' : 'solid'" :avatar="image"
    :icon="icon" :ui="{ icon: { base: 'w-10 h-10' } }" @click="emits(emitName)">
    <template v-if="titleHtml" #title>
      <span v-html="titleHtml" />
    </template>
    <template v-if="descriptionHtml" #description>
      <span v-html="descriptionHtml" />
    </template>
  </UAlert>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    src?: string,
    title: string,
    description?: string,
    titleHtml?: string,
    descriptionHtml?: string,
    transparent?: boolean
  }>(), {}
)

const emitName = "onTapped";
const emits = defineEmits([emitName]);

const image = computed(() => {
  let originalSource = props.src;
  let isImage = originalSource?.startsWith("https://");
  return isImage ? { src: originalSource } : undefined;
});
const icon = computed(() => {
  let originalSource = props.src;
  let isImage = originalSource?.startsWith("https://");
  return !isImage ? originalSource : undefined;
});
</script>