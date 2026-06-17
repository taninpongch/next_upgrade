<template>
  <div
    class="relative flex items-center p-1 shadow-sm bg-white dark:bg-gray-900 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 rounded-md">
    <UInput icon="i-heroicons-magnifying-glass-20-solid" color="white" :trailing="false" placeholder="ค้นหา..."
      :value="modelValue" class="w-full h-fit" size="md" @update:model-value="onInputChanged"
      :ui="{ color: { white: { outline: 'ring-0 focus:ring-0 shadow-none' } } }" />
    <BizShareActionNormal icon="i-heroicons-x-mark-20-solid" :blocked="false" @click="onClear" size="md" color="gray"
      variant="ghost" />
  </div>
</template>

<script setup lang="ts">


import { useDebounceFn } from '@vueuse/core';

const props = withDefaults(
  defineProps<{
    modelValue?: string,
  }>(), {}
)

const emitName = "update:modelValue";
const emits = defineEmits([emitName]);
function handleInput($ev: any) {
  const evalue = $ev.target.value;
  $ev.target.parentNode.dataset.replicatedValue = evalue;
  emits(emitName, evalue);
}

const onInputChanged = async () => await debouncedFn();
const onClear = async () => {
  dataForm.value.search = "";
  await onSearch();
}

const debouncedFn = useDebounceFn(async () => {
  await onSearch();
}, 500)

const initData = reactive({
  search: "",
});
const dataForm = ref(initData);

const onSearch = (async () => {
  handleInput(dataForm.value.search);
  // isLoading.value = true;
  // // restaurantlist.value = [];
  // // pathUrl.value = null;
  // getDataListRestaurant(-1, dataForm.value.search).then(async () => {
  //   isLoading.value = false;
  //   console.log("nextPage", data.value?.nextPage);
  //   restaurantlist.value = data.value?.list;
  //   nextPage.value = data.value?.nextPage;
  //   pathUrl.value = data.value?.pathUrl;
  // });
});
</script>