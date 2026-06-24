<template>
  <div class="mx-auto">
    <img :src="imgIdcard" class="mx-auto py-4" />
    <div class="mx-auto">
      <BizShareText  class="py-2" icon="i-ion-checkmark-circle" :color="color" text="ถ่ายรูปบัตรประชาชน" />
      <BizShareText class="py-2" icon="i-ion-checkmark-circle" text="ถ่ายรูปใบหน้าคู่บัตรประชาชน" />
      <BizShareText class="py-2" icon="i-ion-checkmark-circle" text="กรอกข้อมูล" />
    </div>
  </div>
</template>

<script setup lang="ts">

const props = withDefaults(
  defineProps<{
    color?: string
  }>(), { color: "black", isBold: false, alignment: "" }
)


import { getManaContext } from "@manaapp/ui";
const lib = await getManaContext();
const imgHost = ref("failfast.blob.core.windows.net");
const imgPath = ref("mcontent-imgs/idcard.png");

const imgIdcard = computed(() => {
  return lib.getUrl(imgHost.value, imgPath.value)
})
</script>