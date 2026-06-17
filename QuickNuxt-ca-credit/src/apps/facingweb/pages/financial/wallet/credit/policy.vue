<template>
  <MuiPage>
    <MuiHeader title="ข้อกำหนด" />
    <MuiCard>
      <!-- <BizSharePartyHero src="https://placehold.co/600x600.png" title="Policy credit wallet" />
        <BizShareListInfoHorizontal heading="รายละเอียด" :infos="creditWalletInfo" />
        <BizShareSessionTitle label="เงื่อนไขกรณีผิดนัดชำระ" />
        <UVerticalNavigation :links="duePayment" /> -->
      <BizShareText :text="data?.policy" v-html="data?.policy" />
      <!-- <BizShareText :text="data.textTH" /> -->
    </MuiCard>
  </MuiPage>
</template>


<script lang="ts" setup>
import { getManaContext } from "@manaapp/ui";
const manaLib = await getManaContext();
const store = useFinancialStore()
const { getData } = store
const { data, pending } = storeToRefs(store)
getData("get-policy-credit-wallet").then(async () => {

});
</script>