<template>
  <div v-if="pending">
    <BizShareSkeletonLabel />
  </div>
  <div v-else>
    <!-- เข้ามาครั้งแรก -->
    <MuiPage v-if="zeroAccount">
      <MuiHeader title="จัดการบัญชี" />
      <BizShareSessionTitle label="บัญชีของคุณ" />
      <MuiCard>
        <BizShareActionEmpty src="i-material-symbols-light-universal-currency-outline-rounded" title="คุณยังไม่มีบัญชี"
          subtitle="กรุณาสร้างบัญชีใหม่เพื่อผูกกับ mana" button-text="สร้างบัญชีใหม่" @on-tapped="addAccount" />
      </MuiCard>
    </MuiPage>

    <!-- หลังสร้างบัญชีแล้ว -->
    <MuiPage v-else>
      <MuiHeader title="จัดการบัญชี" />
      <BizShareListItem heading="บัญชีของคุณ" :data="accounts"
        :button="{ icon: 'i-heroicons-plus-16-solid', label: 'เพิ่ม' }" @on-tapped="addAccount"
        @on-select-item="gotoAccount" />
    </MuiPage>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const store = useBankAccountStore();
const { data, pending } = storeToRefs(store);
const { getData } = store;
const { goVisit } = useManaService();
import { useWindowFocus } from "@vueuse/core";
import { watch } from 'vue'
const focused = useWindowFocus();

watch(focused, (isFocused) => {
  if (isFocused) {
    getData("get-bank-account-list").then(async () => {
      const mapAccountsData = (accounts: any) => {
        return accounts.map((it: any) => ({
          id: it.id,
          src: it.logoHost || it.logoPath ? manaLib.getUrl(it.logoHost, it.logoPath) : "",
          title: it.accountName,
          description: it.accountNo,
          type: it.accountType ? it.accountType : "ExternalPPay",
        }));
      };

      accounts.value = mapAccountsData((data.value as any).items);
    });
  }
}, { immediate: true });


const accounts = ref<any[]>([]);
const zeroAccount = computed(() => accounts.value.length === 0);
const addAccount = async () => {
  await goVisit("bank-account", "bank-create-type", "endp-accountType");
};

const gotoAccount = async (item: any) => {
  const subscriptionId = "bank-account";
  switch (item.type) {
    case "ExternalBankAccount":
      await goVisit(subscriptionId, "account-bank-info", item.id);
      return;
    case "ExternalPPay":
      await goVisit(subscriptionId, "account-ppay-info", item.id);
      return;
  }
};
</script>
