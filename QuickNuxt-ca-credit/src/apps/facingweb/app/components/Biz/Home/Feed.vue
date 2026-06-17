<template>
  <UAlert :avatar="image" :icon="icon"
    :close-button="{ ui: { font: 'font-normal', color: { gray: { ghost: 'text-gray-500 dark:text-gray-400' } } }, label: displayExpirationDate, color: 'gray', variant: 'ghost', padded: false, onclick: preventEmit }"
    :ui="{ icon: { base: 'w-10 h-10' }, avatar: { size: 'lg' }, title: 'truncate', description: 'truncate' }"
    @click="emits(emitName)">
    <template #title>
      <p class="truncate">{{ title }}</p>
    </template>

    <template #description>
      <p class="truncate">{{ description }}</p>
      <p class="text-red-500 truncate">{{ status }}</p>
    </template>
  </UAlert>
</template>

<script setup lang="ts">

const props = withDefaults(
  defineProps<{
    src: string,
    title: string,
    description: string,
    expirationDate: string,
    endpointUrl: string,
    status?: string
  }>(), {}
)
const emitName = "onTapped";
const emits = defineEmits([emitName]);
const preventEmit = (event: any) => {
  event.preventDefault();
  emits(emitName)
}

const displayExpirationDate = computed(() => {
  const expirationDate = new Date(props.expirationDate);
  const currentDate = new Date();
  const remainingTime = expirationDate.getTime() - currentDate.getTime();

  const oneSecond = 1000; // 1 second
  const oneMinute = 60; // 60 seconds
  const oneHour = 60; // 60 minutes
  const oneDay = 24; // 24 hours
  const oneMonth = 30; // 30 days

  const minuteTime = oneMinute * oneSecond;
  const hourTime = oneHour * minuteTime;
  const dayTime = oneDay * hourTime;
  const monthTime = oneMonth * dayTime;

  let remaining = 0;
  let postfix = ""

  if (Math.round(remainingTime / minuteTime) < oneHour) {
    remaining = Math.round(remainingTime / minuteTime);
    postfix = "min";
  }
  else if (Math.round(remainingTime / hourTime) < oneDay) {
    remaining = Math.round(remainingTime / hourTime);
    postfix = "hr";
  }
  else if (Math.round(remainingTime / dayTime) < oneMonth) {
    remaining = Math.round(remainingTime / dayTime);
    postfix = "d";
  }
  else {
    remaining = Math.round(remainingTime / monthTime);
    postfix = "m";
  }

  const minimum = 1;
  return `${remaining > minimum ? remaining : minimum} ${postfix}`;
});

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
