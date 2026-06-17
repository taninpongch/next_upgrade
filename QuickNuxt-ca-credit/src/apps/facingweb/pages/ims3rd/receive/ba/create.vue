<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage>
      <MuiHeader title="สร้างคิวอาร์โค้ดรับเงินสำหรับองค์กร" />
      <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">
        <MuiCard>
          <BizSharePartyHero :src="srcShop" :title="data?.shop?.name" />
          <BizShareInputCurrency v-model="dataForm.amount" name="amount" label="จำนวนเงิน" placeholder="ระบุยอดเงิน"
            :currency="data?.wallet?.currency" />
          <!-- <BizShareItemInfo heading="เพิ่มเติม" title="-" />
        <BizShareLine /> -->
          <BizShareInputNote v-model="dataForm.remark" label="หมายเหตุ" hint="optional" placeholder="ระบุหมายเหตุ" />
        </MuiCard>
        <ActionButton text="ตกลง" />
      </BizShareManaForm>
    </MuiPage>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { getManaContext, ActionButton } from "@manaapp/ui";
import type { FormSubmitEvent } from "#ui/types";
import { z } from "zod";

const manaLib = await getManaContext();
const store = useIms3rdStore();
const { data, pending } = storeToRefs(store);
const { getData, postData } = store;

getData("get-receive-ba-create").then(async () => {
  dataForm.currency = data.value?.wallet?.currency;
  if (data.value?.shortcut) {
    await manaLib.visit("ims3rd", `default/ims-shortcut-dlg?endpointId=closedlg&xdlgmode=dialog&xdlgbtn1=ปิด&xdlgsize=s&closeEndpointId=closedlg`);
  }
});

const srcShop = computed(() => {
  const img = manaLib.getUrl(data?.value?.shop.logoHost, data?.value?.shop.logoPath);
  return img;
});

const validationRules = z.object({
  currency: z.string(),
  amount: z.string().min(1, "Invalid request"),
  remark: z.string(),
});

type Schema = z.output<typeof validationRules>;

const dataForm = reactive({
  currency: "",
  amount: "",
  remark: "",
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log(event.data);
  if (event.data) {
    var formdata = {
      shop: {
        name: data?.value?.shop?.name,
        logoHost: data?.value?.shop?.logoHost,
        logoPath: data?.value?.shop?.logoPath,
        _id: data?.value?.shop?._id
      },
      amount: {
        amountUnit: parseFloat(dataForm.amount) * 1000,
        currency: data?.value.wallet?.currency
      },
      remark: dataForm.remark,
      // externalAccountId: ""
    };
    console.log("formdata", formdata);
    await postData(formdata, "post-receive-ba-create");
  }
}

</script>