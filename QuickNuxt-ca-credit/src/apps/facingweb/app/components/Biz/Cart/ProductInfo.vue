<template>
  <BizShareSessionTitle :label="displayTotalAmount" />
  <MuiCard v-for="item in data">
    <div>
      <div class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-3 min-w-0">
          <BizShareImage size="md" :src="item.src" :rounded="false" />
          <div class="min-w-0">
            <BizShareText :text="item.title" :is-truncate="true" />
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
    </div>
  </MuiCard>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    data: {
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
</script>