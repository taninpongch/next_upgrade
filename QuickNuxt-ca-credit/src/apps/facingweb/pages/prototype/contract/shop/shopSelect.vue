<template>
  <MuiPage :bg-white="true">
    <div>
      <BizShareSessionTitle label="เลือกร้านค้า" />
      <div v-for="item in itemList">
        <BizShareItemStatus :src="item.logoUrl" :title="item.name" rightText="เลือก" :transparent="true"
          :is-divider="true" @on-tapped="onSelect"/>
        <UDivider />
      </div>
    </div>
  </MuiPage>
</template>

<script setup lang="ts">
const itemList = [{
  _id: "123",
  name: "ร้านข้าวเฉยๆ",
  logoUrl: "https://failfast.blob.core.windows.net/mcontent-imgs/defaults/dfshop.png"
}, {
  _id: "456",
  name: "ร้านข้าว Demo",
  logoUrl: "https://failfast.blob.core.windows.net/mcontent-imgs/defaults/dfshop.png"
}]

const onSelect = (item: any) => {
  navigateTo("main")
}
</script>