<template>
  <div v-if="pending">
    <BizShareSkeletonLabel />
  </div>
  <div v-else>
    <MuiPage>
      <MuiHeader :title="data.name" />
      <BizBAProfile :data="profileInfo" @on-tapped-edit-profile="onSelectEditProfile"
        @on-tapped-more-service="onSelectMoreService" />
      <BizBABalance :amount="displayBalance" @on-tapped-txlog="onSelectTxlog" @on-tapped-qr="onSelectQR" />
      <BizFinancialShareMainMenu :menus="menus" @on-tapped="onSelectMenu" />
    </MuiPage>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { getManaContext } from "@manaapp/ui";
import { useWindowFocus } from "@vueuse/core";
import { watch } from 'vue'

const manaLib = await getManaContext();
const store = useBAStore();
const { data, pending } = storeToRefs(store);
const { getData } = store;
const { goVisit } = useManaService();
const focused = useWindowFocus();

watch(focused, (isFocused) => {
  if (isFocused) {
    getData('get-ba-home-advance').then(async () => {
    });
  }
}, { immediate: true });

// TODO: lesson learn
const profileInfo = computed(() => {
  let logoUrl = "https://failfast.blob.core.windows.net/mcontent-imgs/defaults/dfshop.png";
  if (manaLib && data.value && data.value?.logoHost && data.value?.logoPath) {
    logoUrl = manaLib.getUrl(data.value?.logoHost, data.value?.logoPath)
  }
  return {
    profile: {
      logo: logoUrl,
      name: data.value.name,
      displayId: data.value.displayId
    },
    service: data.value.service?.map((it: any) => { return { id: it.id, logo: it.logo, name: it.name } })
  }
});

const displayBalance = computed(() => {
  if (!manaLib) {
    return "0.00 THB";
  }
  return `${manaLib.toText(data.value.balance, 'amt')} ${manaLib.toText(data.value.balance, 'cur')}`
})

//TODO: lesson learn
const menus = [
  { id: "topup", title: "เติมเงิน", src: "i-lucide-circle-dollar-sign" },
  { id: "bill", title: "บิล", src: "i-lucide-receipt" },
  { id: "withdraw", title: "ถอนเงิน", src: "i-lucide-hand-coins" },
  { id: "employee", title: "พนักงาน", src: "i-lucide-users" },
  { id: "allowance", title: "จัดสรรเงิน", src: "i-lucide-chart-pie" },
  { id: "setting", title: "ตั้งค่า", src: "i-lucide-settings" },
];

const onSelectEditProfile = async () => {
  // goVisit("ba", "ba-profile-main", data.value.id)
  await manaLib.visit("profile", 'default/underconstruction-dlg?endpointId=closedlg&xdlgmode=dialog&xdlgbtn1=ปิด&xdlgsize=s&closeEndpointId=closedlg')
};

// TODO: implement tapped more service
const onSelectMoreService = () => { };

// TODO: implement tapped QR
const onSelectQR = () => { };
const onSelectTxlog = () => {
  goVisit("ba", "ba-txlog", data.value.id)
};

const onSelectMenu = async (item: any) => {
  switch (item.id) {
    case "topup":
      if (data.value?.type == "CA") {
        goVisit("ba", 'comingsoon-dialog', `closedlg&xdlgmode=dialog&xdlgbtn1=ปิด&xdlgsize=s&closeEndpointId=closedlg`);
      } else {
        goVisit("ba", "ba-topup-create", data.value.topupEndpointId)
      }
      break;
    case "withdraw":
      if (data.value?.type == "CA") {
        goVisit("ba", "ca-withdraw-main", data.value.withdrawEndpointId);
      } else {
        goVisit("ba", "ba-withdraw-create", data.value.withdrawEndpointId);
      }
      break;
    case "employee":
      await manaLib.visit("profile", 'default/underconstruction-dlg?endpointId=closedlg&xdlgmode=dialog&xdlgbtn1=ปิด&xdlgsize=s&closeEndpointId=closedlg'); break;
    case "allowance":
      // visit select wallet _allowance
      await manaLib.visit("profile", 'default/underconstruction-dlg?endpointId=closedlg&xdlgmode=dialog&xdlgbtn1=ปิด&xdlgsize=s&closeEndpointId=closedlg'); break;
    case "bill":
      await manaLib.visit("profile", 'default/underconstruction-dlg?endpointId=closedlg&xdlgmode=dialog&xdlgbtn1=ปิด&xdlgsize=s&closeEndpointId=closedlg'); break;
    case "setting":
      await manaLib.visit("profile", 'default/underconstruction-dlg?endpointId=closedlg&xdlgmode=dialog&xdlgbtn1=ปิด&xdlgsize=s&closeEndpointId=closedlg'); break;
    default:
      break;
  }
}

</script>
