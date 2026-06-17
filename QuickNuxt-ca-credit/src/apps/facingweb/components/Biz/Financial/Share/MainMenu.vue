<template>
  <div class="grid grid-cols-3 gap-4">
    <MuiCard v-for="item in menus" @click="emits(emitName, item)" :ui="{ body: { base: 'text-center', padding: 'px-4 py-4 sm:p-4' } }">
      <BizShareImage :src="item.src" size="sm" class="mx-auto" />
    <p class="truncate text-sm">{{ item.title }}</p>
    </MuiCard>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    menus: {
      id: string,
      src: string,
      title: string
    }[]
  }>(), {}
)
const emitName = "onTapped";
const emits = defineEmits([emitName]);
</script>