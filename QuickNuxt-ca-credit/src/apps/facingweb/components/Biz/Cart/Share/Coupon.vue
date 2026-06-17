<template>
  <BizShareSessionTitle label="ใส่คูปองหรือแต้ม" :button="{ icon: 'i-ion-plus-circled', label: '' }"
    @on-tapped="emits(emitName)" />
  <BizShareText v-for="item in coupon" icon="i-ion-ticket-outline" :text="item.name" />
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    coupon?: {
      name: string
    }[]
  }>(), {}
)

const emitName = "onTapped";
const emits = defineEmits([emitName]);
</script>