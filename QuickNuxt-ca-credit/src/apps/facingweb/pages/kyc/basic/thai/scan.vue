<template>
  <MuiPage>
    <MuiHeader title="ยกเลิก" />
    <p class="font-semibold text-center"> วางบัตร ประชาชน ด้านหน้าให้อยู่ในกรอก </p>
    <MuiCard class="bg-black">
      <div class="text-center mx-auto py-4" >
        <img src="https://accesstrade.in.th/wp-content/uploads/2020/12/%E0%B8%97%E0%B8%B3%E0%B8%9A%E0%B8%B1%E0%B8%95%E0%B8%A3%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%8A%E0%B8%B2%E0%B8%8A%E0%B8%99-2021-%E0%B9%83%E0%B8%8A%E0%B9%89%E0%B9%80%E0%B8%AD%E0%B8%81%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%AD%E0%B8%B0%E0%B9%84%E0%B8%A3%E0%B8%9A%E0%B9%89%E0%B8%B2%E0%B8%87.jpg" class="mx-auto" />
      </div>
    </MuiCard>
  </MuiPage>
  <BizShareManaForm>
    <BizShareActionSubmit label="ถ่าย" @click="navigate()" />
  </BizShareManaForm>
</template>

<script lang="ts" setup>
import { getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const navigate = () => {
  navigateTo('create')
}
</script>