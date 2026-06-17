<template>
  <MuiPage>
    <MuiHeader title="Food Prada" />
    <MuiCard>
      <div>
        <BizShareItemStatus src="https://failfast.blob.core.windows.net/easy/ba/assets/default-ba.png" title="Food Prada"
          description="#asd852" rightText="แก้ไข" :transparent="true" @on-tapped="onClickSetting" />
        <UDivider class="mb-4" />
        <!-- TODO: Use component -->
        <div>
          <BizShareSessionTitle label="บริการเสริม" />
          <!-- <UCarousel v-if="data" v-slot="{ item, index }" :items="data"
              :ui="{ item: 'snap-start w-24', container: 'space-x-4' }">
              <div class="text-center mx-auto">
                <BizShareImage :chip-color="item.noti ? 'primary' : null" size="xl" :src="item.src" alt="item.name" />
                <div class="w-24">
                  <p class="font-semibold truncate">{{ item.name }}</p>
                </div>
              </div>
            </UCarousel> -->
          <p class="text-center">ไม่มีข้อมูล</p>
        </div>
      </div>
    </MuiCard>

    <MuiCard>
      <div>
        <BizShareSessionTitle label="ยอดเงินคงเหลือ" :button="{ label: 'ดูบัญชี', icon: '' }" />
        <BizShareItem title="5,000.00 THB" src="i-ion-file-tray-outline" :transparent="true" />
        <BizShareActionNormal icon="i-ion-qr-code-outline" :rounded="true" label="คิวอาร์รับเงิน" color="white" />
      </div>
    </MuiCard>
    <BizFinancialShareMainMenu :menus="menus" @on-tapped="goto" />
  </MuiPage>
</template>

<script setup lang="ts">
const { goVisit } = useManaService();

// const shortcutItems = [
//   { name: 'Sébastien Chopin', src: 'https://failfast.blob.core.windows.net/easy/ba/assets/default-ba.png', noti: true },
//   { name: 'Pooya Parsa', src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/pi0', noti: true },
//   { name: 'Daniel Roe', src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/danielroe' },
//   { name: 'Anthony Fu', src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/antfu', noti: true },
//   { name: 'Sébastien Chopin', src: 'https://failfast.blob.core.windows.net/easy/ba/assets/default-ba.png' },
//   { name: 'Pooya Parsa', src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/pi0' },
//   { name: 'Daniel Roe', src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/danielroe' },
//   { name: 'Anthony Fu', src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/antfu' },
//   { name: 'More', src: 'https://placehold.co/600x600.png?text=...' }]

const menus = [
  {
    id: "TopUp",
    title: "เติมเงิน",
    src: "i-material-symbols-light-move-to-inbox-rounded",
  },
  {
    id: "Withdraw",
    title: "ถอนเงิน",
    src: "i-material-symbols-light-outbox-rounded",
  },
  {
    id: "Employee",
    title: "พนักงาน",
    src: "i-heroicons-users",
  },
  {
    id: "Budget",
    title: "งบประมาณ",
    src: "i-material-symbols-light-data-table-outline-rounded",
  },
  {
    id: "Bill",
    title: "บิล",
    src: "i-material-symbols-light-receipt-long-outline",
  },
];

const onClickSetting = async () => {
  await goVisit("kym", "proto-ba-setting", "ba-setting");
  // navigateTo("setting/main");
}

const goto = async (item: any) => {
  switch (item.id) {
    case "TopUp":
      await goVisit("kym", "proto-ba-topup-create", "ba-topup");
      // await navigateTo("topup/create");
      return;
    case "Withdraw":
      await goVisit("kym", "proto-ba-withdraw-create", "ba-withdraw");
      // await navigateTo("withdraw/create");
      return;
  }
};
</script>
