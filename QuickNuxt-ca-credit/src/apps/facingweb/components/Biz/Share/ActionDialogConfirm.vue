<template>
  <BizShareGroupButton :right-alignment="true">
    <BizShareActionNormal label="ยกเลิก" :block="false" color="black" variant="ghost" @on-tapped="emits(emitName, false)" />
    <BizShareActionNormal label="ตกลง" :block="false" color="blue" variant="ghost" @on-tapped="emits(emitName, true)" />
  </BizShareGroupButton>
</template>

<script setup lang="ts">
const emitName = "onTapped";
const emits = defineEmits([emitName]);
</script>