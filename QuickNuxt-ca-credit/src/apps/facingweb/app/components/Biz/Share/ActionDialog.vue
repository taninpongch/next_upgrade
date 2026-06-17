<template>
  <BizShareGroupButton :right-alignment="true">
    <BizShareActionNormal label="ปิด" :block="false" color="blue" variant="ghost" @on-tapped="emits(emitName)"/>
  </BizShareGroupButton>
</template>

<script setup lang="ts">
const emitName = "onTapped";
const emits = defineEmits([emitName]);
</script>