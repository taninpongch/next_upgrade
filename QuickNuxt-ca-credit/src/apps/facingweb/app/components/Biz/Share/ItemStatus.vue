<template>
  <BizShareItem :src="src" :title="title" :description="description" :transparent="transparent"
    :close-button="{ label: rightText, color: rightColor, variant: 'ghost', padded: false, onclick: preventEmit }"
    @on-tapped="emits(emitName)" />
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    src?: string,
    title: string,
    description?: string,
    transparent?: boolean,
    rightText: string,
    rightColor?: string
  }>(), { rightColor: "gray" }
)

const emitName = "onTapped";
const emits = defineEmits([emitName]);
const preventEmit = (event: any) => {
  event.preventDefault();
  emits(emitName)
}
</script>