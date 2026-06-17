<template>
  <BizShareSessionTitle :label="displayTotalAmount" />
  <MuiCard v-for="item in data">
    <div>
      <div class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-3 min-w-0">
          <BizShareImage size="md" :src="item.src" :rounded="false" />
          <div class="min-w-0">
            <BizShareText :text='item.title' :is-truncate="true" />
            <BizShareText text="&nbsp;" />
          </div>
        </div>
        <div class="flex items-center">
          <div class="relative text-nowrap">
            <div class="flex items-center">
              <BizShareText :class="[item.discountPrice ? 'line-through decoration-red-500' : '']" :text="item.price" />
            </div>
            <div class="flex items-center">
              <BizShareText v-if="item.discountPrice" :text="item.discountPrice" />
              <BizShareText v-else text="&nbsp;" />
            </div>
          </div>
        </div>
      </div>
      <BizShareText v-if="item.description" :text="item.description" color="gray" />
      <BizShareGroupButton :right-alignment="true">
        <!-- <BizShareActionNormal label="แก้ไข" :block="false" color="black" variant="ghost"
          @on-tapped="emits(emitEditProduct, item)" /> -->
        <BizShareActionNormal label="ลบ" :block="false" color="black" variant="ghost"
          @on-tapped="emits(emitDeleteProduct, item)" />
      </BizShareGroupButton>
    </div>
  </MuiCard>
</template>

<script setup lang="ts">
import { getManaContext } from "@manaapp/ui";
const Lib = await getManaContext();

const props = withDefaults(
  defineProps<{
    data: {
      id: string,
      src: string,
      title: string,
      description?: string,
      price: string,
      discountPrice?: string,
    }[]
  }>(), {}
)

const displayTotalAmount = computed(() => {
  return `รายการที่สั่ง (${props.data.length} ชิ้น)`;
})

const emitEditProduct = "onTappedEditProduct";
const emitDeleteProduct = "onTappedDeleteProduct";
const emits = defineEmits([emitEditProduct, emitDeleteProduct]);
</script>