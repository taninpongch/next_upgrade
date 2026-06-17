<template>
    <BizShareListInfoHorizontal heading="Ref." :infos="linkRef" />
    <div class="text-center mx-auto">
      <BizShareImage :src="src" size="4xl" class="mx-auto mb-2" :rounded="false" />
    </div>
    <BizShareActionLink icon="i-ion-share-outline" label="แชร์" />
    <UDivider />
    <BizShareListInfoHorizontal heading="เพิ่มเติม" :infos="linkMore" />
    <BizShareItemInfo heading="หมายเหตุ" :title="descriptionRemark ? descriptionRemark : '-'" />
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    linkRef?: any,
    linkMore?: any,
    descriptionRemark?: string,
    src: string
  }>(), {}
)
</script>
