<template>
  <div :class="displayAlignment">
    <p :class="[isBold ? 'font-semibold' : '', `text-${color}-500 dark:text-${color}-400`, isTruncate ? 'truncate' : '']">
      <UIcon v-if="icon" :name="icon" class="w-5 h-5 align-middle" />
      {{ text }}
    </p>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    icon?: string,
    text: string,
    color?: string
    isBold?: boolean,
    isTruncate?: boolean,
    alignment?: string
  }>(), { color: "black", isBold: false, alignment: "" }
)

const displayAlignment = computed(() => {
  switch (props.alignment) {
    case "left": return "text-left";
    case "center": return "text-center";
    case "right": return "text-right";
    default: return "";
  }
})
</script>