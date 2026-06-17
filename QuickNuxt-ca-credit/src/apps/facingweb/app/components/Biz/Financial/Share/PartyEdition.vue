<template>
  <div class="text-center mx-auto">
    <BizShareImage :src="src" size="3xl" class="mx-auto mb-2" />
    <div>
      <BizShareActionLink :label="title" class="font-semibold" @on-tapped="emits(emitName)" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    src: string,
    title: string
  }>(), {}
)

const emitName = "onTapped";
const emits = defineEmits([emitName]);
</script>