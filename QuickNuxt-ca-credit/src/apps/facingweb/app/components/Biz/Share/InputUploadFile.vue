<template>
  <!-- <UFormGroup :label="label">
    <UInput :placeholder="placeholder" :type="type" :inputMode="inputMode" :value="modelValue" @input="handleInput"
      :ui="{ base: 'disabled:bg-gray-200 dark:disabled:bg-black' }" v-bind:disabled="$attrs.disabled" />
  </UFormGroup> -->

  <UFormGroup :label="label">
    <BizShareImage v-if="src" :size="size" :rounded="rounded" :src="src" />
    <div class="flex items-center space-x-1">
      <UInput :placeholder="placeholder" readonly :model-value="modelValue" type="text" />
      <UButton :color="btnColor" :label="btnLabel" @click="emits(emitName)" type="button" />
    </div>
  </UFormGroup>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue?: string,
    label?: string,
    placeholder?: string,
    src?: string,
    size?: string,
    rounded?: boolean,
    btnLabel?: string,
    btnColor?: string,
  }>(), { btnLabel: "เปลี่ยนรูป", rounded: true, size: "2xl", placeholder: "ยังไม่มีไฟล์ถูกเลือก", label: "เลือกรูป", btnColor: "gray" }
)

const emitName = "onTapped";
const emits = defineEmits([emitName]);
</script>