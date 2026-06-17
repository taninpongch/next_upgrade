<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage>
      <MuiHeader title="เติมเงิน" />
      <BizShareItem title="สร้างคิวอาร์โคดเพื่อเติมเงิน" src="i-ion-qr-code-outline" @on-tapped="goTopupQRPage" />
      <BizShareListItem v-if="data?.listWallet.length > 0" heading="เลือกบัญชีที่ผูกไว้" :data="data?.listWallet"
        @onSelectItem="govisitPage" />
      <div v-else>
        <BizShareSessionTitle label="เลือกบัญชีที่ผูกไว้" />
        <BizShareEmptyList title="ไม่พบบัญชีที่ผูกไว้" />
      </div>
    </MuiPage>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const _data = useTopupStore();
const { dataTopup, pending } = storeToRefs(_data);
const { getData } = _data;
const data = ref<any>();
const { goVisit } = useManaService();
import { useWindowFocus } from "@vueuse/core";
import { watch } from 'vue'
const focused = useWindowFocus();

watch(focused, (isFocused) => {
  if (isFocused) {
    getData("get-account-list").then(async () => {
      const mapAccountsData = async (accounts: any) => {
        return accounts.map((it: any, index: any) => ({
          src: manaLib.getUrl(it.logoHost, it.logoPath),
          title: it.accountName,
          description: it.accountNo,
          path: it.type,
          id: it.id,
          index: index,
        }));
      };

      data.value = {
        listWallet: await mapAccountsData((dataTopup.value as any).listWallet),
        flow: dataTopup.value.flow,
      };
    });
  }
}, { immediate: true });

const goTopupQRPage = async () => {
  await goVisit("topup", dataTopup?.value.flow?.topupqrcreate, "endp-topup-qr");
};
const govisitPage = async (datarsp: any) => {
  await goVisit("topup", data?.value.flow?.topupaccountcreate, datarsp.id);
};
</script>
