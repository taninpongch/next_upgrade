<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage :bg-white="true">
      <BizFinancialShareBankList
        heading="เลือกธนาคาร"
        :data="bankList"
        @on-tapped="bankSelect"
      />
    </MuiPage>
  </div>
</template>

<script setup lang="ts">
import { getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const bankAccStore = useBankAccountStore();
const { data, pending } = storeToRefs(bankAccStore);
const { getData, postOptionSelect } = bankAccStore;
getData("get-bank-list-dlg").then(() => convertAll(data.value.items));

const bankList = ref();
const convertAll = async (list: any[]) => {
  bankList.value = list.map((it) => {
    return {
      id: it.bankId,
      src: manaLib.getUrl(it.bankLogoHost, it.bankLogoPath),
      title: it.bankName,
      description: it.bankEngName,
    };
  });
};

const dataForm = reactive({
  bankId: "",
  bankName: "",
});

const bankSelect = (data: any) => {
  dataForm.bankId = data.id;
  dataForm.bankName = data.title;
  onSubmit(dataForm);
};

async function onSubmit(dataForm: any) {
  await postOptionSelect(dataForm);
}
</script>
