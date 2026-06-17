<template>
  <div v-if="pending">
    <BizShareSkeletonLabel />
  </div>
  <div v-else>
    <MuiPage>
      <MuiHeader :title="data.name" />
      <MuiCard>
        <BizSharePartyHero :src="displayLogo" title="ยอดเงินคงเหลือ" :subtitle="displayBalance" />
        <BizShareActionNormal label="ปรับแต่งการใช้งาน" @on-tapped="onSelectAdvanceMode" />
      </MuiCard>
      <BizFinancialShareMainMenu :menus="menus" @on-tapped="onSelectMenu" />
      <!-- <BizShareText
        text="คุณสามารถปรับแต่งรูปแบบการใช้งาน ธุรกิจคุณตามแบบที่คุณต้องการเพื่อตอบสนองการใช้งานที่เพิ่มมากขึ้น"
        alignment="center" color="gray" />
      <BizShareActionLink label="เรียนรู้เพิ่มเติม" @on-tapped="onSelectLearnMore" /> -->
    </MuiPage>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { getManaContext } from "@manaapp/ui";
import { useWindowFocus } from "@vueuse/core";

const manaLib = await getManaContext();
const store = useBAStore();
const { data, pending } = storeToRefs(store);
const { getData, postData } = store;
const { goVisit } = useManaService();
const focused = useWindowFocus();

watch(focused, (isFocused) => {
  if (isFocused) {
    getData('get-ba-home-basic').then(async () => {
    });
  }
}, { immediate: true });

getData('get-ba-home-basic').then(async () => {
});

const displayLogo = computed(() => {
  let url = "https://failfast.blob.core.windows.net/mcontent-imgs/defaults/dfshop.png";
  if (manaLib && data.value && data.value?.logoHost && data.value?.logoPath) {
    url = manaLib.getUrl(data.value?.logoHost, data.value?.logoPath)
  }

  return url;
})

const displayBalance = computed(() => {
  if (!manaLib || !data.value || !data.value.balance) {
    return "0.00 THB";
  }

  return `${manaLib.toText(data.value.balance, 'amt')} ${manaLib.toText(data.value.balance, 'cur')}`
})

const menus = [
  { id: "qr", title: "คิวอาร์รับเงิน", src: "i-ion-qr-code-outline" },
  { id: "withdraw", title: "ถอนเงิน", src: "i-material-symbols-light-outbox-rounded" },
  { id: "txlog", title: "บัญชี", src: "i-material-symbols-light-universal-currency-outline-rounded" },
];

const onSelectMenu = (item: any) => {
  switch (item.id) {
    case "qr":
      manaLib.visit("ba", "default/underconstruction-dlg?endpointId=closedlg&xdlgmode=dialog&xdlgbtn1=ปิด&xdlgsize=s&closeEndpointId=closedlg");
      break;
    case "withdraw":
      goVisit("ba", "ba-withdraw-create", data.value.withdrawEndpointId);
      break;
    case "txlog":
      goVisit("ba", "ba-txlog", data.value.txlogEndpointId);
      break;
    default:
      break;
  }
}
const onSelectAdvanceMode = () => postData({}, "post-ba-to-advance-confirm");
// TODO: implement tapped learn more
const onSelectLearnMore = () => {};

</script>
