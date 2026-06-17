<template>
        <BizShareText :text="`สถานะออเดอร์: ${orderCode}`" :is-bold="true" />
        <!-- TODO: remove div and use component -->
        <div class="text-center mx-auto" v-if="!orderStatus.value">
          <BizShareImage :src="statusLogo" size="custom" :rounded="false" />
        </div>
        <BizSharePartyHero v-else :src="riderLogo" :title="riderName" />
        <UProgress :value="orderStatus.value" :max="3" indicator :color="orderStatus.color" animation="carousel">
          <template #indicator="{ percent }">
            <BizShareText :text="orderStatus.display" :color="orderStatus.color" :is-bold="true" alignment="center"
              class="text-xl" />
          </template>
        </UProgress>
        <div v-if="orderStatus.value && orderStatus.value > 0">
          <BizShareText class="text-gray-500 text-" :text="displayDate" />
          <BizShareText class="text-gray-500 " :text="orderStatus.estimate" />
        </div>   
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    orderStatus: any
    displayDate: string
    orderCode: string
    statusLogo: string
    riderLogo: string
    riderName: string
  }>(), {}
)
</script>