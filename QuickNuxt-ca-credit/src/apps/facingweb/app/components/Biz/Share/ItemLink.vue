<template>
  <BizShareItem :src="src" :title="title" :description="description" :transparent="transparent"
    :close-button="{ label: rightText, icon: 'i-material-symbols-light-arrow-forward-ios-rounded', color: rightColor, variant: 'ghost', padded: false, trailing: true, onclick: preventEmit }"
    @on-tapped="emits(emitName)" />
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    src?: string,
    title: string,
    description?: string,
    transparent?: boolean,
    rightText?: string,
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