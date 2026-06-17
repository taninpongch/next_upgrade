<template>
  <BizShareSessionTitle :label="heading" :isBold="isBold" />
  <UVerticalNavigation :links="infos" class="w-full" :ui="{
    base: '', inactive: 'group relative flex items-top gap-1.5 focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-1 focus-visible:before:ring-primary-500 dark:focus-visible:before:ring-primary-400 before:absolute before:inset-px before:rounded-md disabled:cursor-not-allowed disabled:opacity-75 px-2.5 py-1.5 w-full focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 rounded-md font-semibold text-sm text-gray-500 dark:text-gray-400 dark:hover:text-white hover:before:bg-gray-50 dark:hover:before:bg-gray-800/50 hover:text-gray-500'
    , wrapper: 'relative', label: 'truncate relative text-gray-900 dark:text-white flex-initial w-32 text-left'
  }">
    <template #badge="{ link }">
      <div class="flex-1 flex justify-between relative truncate text-wrap text-left">
        <p v-if="link.value == '-'" class="px-2 font-semibold">{{ link.value }}</p>
        <p v-else :class="link.danger ? 'text-red-600' : 'text-black'">{{ link.value }}</p>
      </div>
      <!-- <div v-html="link.value"></div> -->
    </template>
  </UVerticalNavigation>

</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    heading: string,
    infos: {
      label: string,
      value: string,
    }[],
    isBold?: boolean,
  }>(), {}
)
</script>