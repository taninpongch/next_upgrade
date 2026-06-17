<template>
  <MuiCard class="text-center">
    <!-- < v-if="restaurantlist && hasLoaded == 'n'" class="text-center pt-20 space-y-4"> -->
    <div class="py-20">
      <BizShareImage src="https://failfast.blob.core.windows.net/mcontent-imgs/temps/delivery/outOfServiceArea.png"
        :rounded="false" size="2xl" />
      <BizShareText text="ขออภัยตำแหน่งของคุณอยู่นอกพื้นที่ให้บริการ" alignment="center" />
    </div>
  </MuiCard>
</template>