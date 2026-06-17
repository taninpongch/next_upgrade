<template>
  <BizShareInputCheckbox text-checkbox="อนุญาต" v-model="isAgreed" />
  <BizShareActionNormal label="อนุญาต" @on-tapped="emits(emitName, true)" :disabled="!isAgreed"/>
  <BizShareActionNormal label="ปฏิเสธ" color="black" variant="ghost" @on-tapped="emits(emitName, false)"/>
</template>

<script setup lang="ts">
const isAgreed = ref(false);
const emitName = "onTapped";
const emits = defineEmits([emitName]);
</script>