<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage>
      <MuiHeader title="ยืนยันบัญชีนี้" />
      <BizShareManaForm @submit="onSubmit">
        <MuiCard>
          <BizSharePartyHero
            src="i-material-symbols-light-phone-android-outline"
            title="พร้อมเพย์"
          />
          <BizShareListInfoHorizontal heading="ข้อมูลบัญชี" :infos="bankinfo" />
        </MuiCard>
        <ActionButton text="ตกลง" />
      </BizShareManaForm>
    </MuiPage>
  </div>
</template>

<script setup lang="ts">
import { ActionButton, getManaContext } from "@manaapp/ui";
import { storeToRefs } from "pinia";

const manaLib = await getManaContext();
const bankAccount = useBankAccountStore();
const { data, pending } = storeToRefs(bankAccount);
const { getData, postData } = bankAccount;

const bankinfo = ref<any>([]);
getData("get-ppay-account-confirm-data").then(() => {
  bankinfo.value = [
    { label: "ชื่อเรียก", value: data?.value.accountInfo?.accountName },
    { label: "เลขบัญชี", value: data?.value.accountInfo?.accountNo },
    { label: "ประเภท", value: data?.value.accountInfo?.accountType },
    { label: "ชื่อบัญชี", value: data?.value.accountInfo?.nameTH },
    { label: " ", value: data?.value.accountInfo?.nameEN },
  ];
});

async function onSubmit() {
  await postData({}, "post-confirm-ppay-account");
}
</script>
