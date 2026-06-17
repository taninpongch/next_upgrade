<template>
  <div class="text-center mx-auto">
    <img :src="imgIdcard" class="mx-auto py-4" />
    <div>
      <BizShareText class="py-2" icon="i-ion-checkmark-circle" text="ถ่ายรูปบัตรประชาชน" />
      <BizShareText class="py-2" icon="i-ion-checkmark-circle" text="กรอกข้อมูล" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getManaContext } from "@manaapp/ui";
const lib = await getManaContext();
const imgHost = ref("failfast.blob.core.windows.net");
const imgPath = ref("mcontent-imgs/idcard.png");

const imgIdcard = computed(() => {
  return lib.getUrl(imgHost.value, imgPath.value)
})
</script>