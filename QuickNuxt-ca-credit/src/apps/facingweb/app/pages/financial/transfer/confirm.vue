<template>
  <div v-if="pending">
    <BizShareSkeletonLogo />
  </div>
  <div v-else>
    <MuiPage>
      <!-- TODO: จะเป็น component ใหญ่เลยมั้ย -->
      <MuiHeader title="ยืนยันบัญชีนี้" />
      <BizShareManaForm @submit="onSubmit">
        <MuiCard>
          <BizBillShareUserTransferInfo :data="dataTransfer" />
          <UDivider />

          <!-- TODO: เพิ่มเติม หมายเหตุเปลี่ยน component -->
          <BizShareListInfoHorizontal heading="เพิ่มเติม" :infos="refData" />
          <UDivider />
          <BizShareItemInfo heading="หมายเหตุ"
            :title="dataTransfer?.session?.remark ? dataTransfer?.session?.remark : '-'" />
        </MuiCard>
        <ActionButton text="จ่าย" />
      </BizShareManaForm>
    </MuiPage>
  </div>
</template>

<script setup lang="ts">
import { ActionButton, getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const transferStore = useTransferStore();
const { getData, postData } = transferStore;
const { dataTransfer, pending } = storeToRefs(transferStore);
getData("get-transfer-confirm").then(async () => {
  convertAll(dataTransfer?.value?.session?.refs);
});

const refData = ref();
const convertAll = async (list: any[]) => {
  refData.value = list.map((it) => {
    return {
      label: it.name,
      value: it.value,
    };
  });
};

async function onSubmit() {
  await postData({}, "post-transfer-confirm");
}
</script>
