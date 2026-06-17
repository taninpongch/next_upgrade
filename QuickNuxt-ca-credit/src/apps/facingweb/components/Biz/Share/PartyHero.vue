<template>
  <div class="text-center mx-auto">
    <BizShareImage :src="src" size="3xl" class="mx-auto mb-2" />
    <div v-if="pattern == '1'">
      <BizShareText v-if="title" :icon="iconTitle" :text="title" :is-bold="true" />
      <BizShareText v-if="subtitle" :icon="iconSubtitle" :text="subtitle" />
    </div>
    <div v-if="pattern == '2'">
      <BizShareText v-if="title" :icon="iconTitle" :text="title" />
      <BizShareText v-if="subtitle" :icon="iconSubtitle" :text="subtitle" :is-bold="true" />
    </div>
    <div v-if="pattern == '3'">
      <BizShareText v-if="title" :icon="iconTitle" :text="title" :is-bold="true" />
      <BizShareText v-if="subtitle" :icon="iconSubtitle" :text="subtitle" :is-bold="true" color="red" />
    </div>
    <div v-if="pattern == '4'">
      <BizShareText v-if="title" :icon="iconTitle" :text="title" :is-bold="true" />
      <BizShareText v-if="subtitle" :icon="iconSubtitle" :text="subtitle" :is-bold="true" color="blue" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    src: string,
    title?: string,
    iconTitle?: string,
    subtitle?: string,
    iconSubtitle?: string,
    pattern?: string
  }>(), { pattern: "1" }
)
</script>