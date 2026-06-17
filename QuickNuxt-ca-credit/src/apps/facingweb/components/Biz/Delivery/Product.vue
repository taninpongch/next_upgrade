<template>
  <MuiCard @click="!data.disabled && emits(emitName, data)" :class="[data.disabled ? 'opacity-30' : '']">
    <div>
      <div class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-3 min-w-0">
          <BizShareImage size="md" :src="data.src" :rounded="false" />
          <div class="min-w-0">
            <BizShareText :text="data.title" :is-truncate="true" />
            <BizShareText v-if="data.description" :text="data.description" color="gray" />
            <BizShareText v-else text="&nbsp;" />
          </div>
        </div>
        <div class="flex items-center">
          <div class="relative text-nowrap">
            <div class="flex items-center">
              <BizShareText :class="[data.discountPrice ? 'line-through decoration-red-500' : '']" :text="data.price" />
            </div>
            <div class="flex items-center">
              <BizShareText v-if="data.discountPrice" :text="data.discountPrice" />
              <BizShareText v-else text="&nbsp;" />
            </div>
          </div>
        </div>
      </div>
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
      discountPrice?: string
      disabled?: boolean
    }
  }>(), {}
)
const emitName = "onTapped";
const emits = defineEmits([emitName]);
</script>