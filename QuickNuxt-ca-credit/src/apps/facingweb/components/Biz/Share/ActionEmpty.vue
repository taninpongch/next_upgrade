<template>
  <div class="text-center space-y-4">
    <BizSharePartyHero :src="src" :title="title" :subtitle="subtitle" />
    <BizShareActionNormal :label="buttonText" color="red" @on-tapped="emits(emitName)" />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    src: string,
    title: string,
    subtitle?: string,
    buttonText: string
  }>(), {}
)
const emitName = "onTapped";
const emits = defineEmits([emitName]);
</script>