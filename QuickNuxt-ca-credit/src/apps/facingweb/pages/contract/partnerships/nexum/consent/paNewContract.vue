<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage>
      <MuiHeader title="ขออนุญาตทำสัญญา" />
      <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">
        <MuiCard>
          <BizShareSessionTitle label="ผู้ส่งสัญญา" />
          <BizSharePartyHero :src="displayImage" :title="data?.baName" :subtitle="consentDate" />
        </MuiCard>

        <!-- <MuiCard variant="subtle"> -->
        <!-- 
        <BizShareListInfoVertical heading="แจ้งเตือนสำคัญ"
          :infos="[{ label: 'รายละเอียดสัญญาบางรายการมีการปรับปรุง โปรดตรวจสอบข้อมูลก่อนดำเนินการ หากท่านไม่ยอมรับเงื่อนไขดังกล่าว สัญญาเดิมอาจถูกยกเลิก', src: 'i-lucide-alert-triangle', value: '' }]"
          class="text-red-600 border-red-600 border-[1px] rounded-lg p-4" /> -->
        <!-- </MuiCard> -->
        <MuiCard>
          <UAlert title="แจ้งเตือนสำคัญ"
            description="รายละเอียดสัญญาบางรายการมีการปรับปรุง โปรดตรวจสอบข้อมูลก่อนดำเนินการ หากท่านไม่ยอมรับเงื่อนไขดังกล่าว สัญญาเดิมอาจถูกยกเลิก"
            variant="outline" color="primary" :ui="{ title: 'text-base font-semibold' }" />
          <BizShareSessionTitle label="รายละเอียดสัญญาเบื้องต้น" :button="{ icon: 'i-lucide-info', label: '' }"
            @on-tapped="goto" />
          <BizShareListInfoVertical heading="" :infos="creditWalletInfo" />
        </MuiCard>
        <MuiCard>
          <BizShareSessionTitle label="ขอหักชำระหนี้" :button="{ icon: 'i-lucide-info', label: '' }"
            @on-tapped="goto" />
          <BizShareListInfoVertical :heading="`ขออนุญาตหักชำระหนี้ สูงสุด ${data?.deduction ?? '0%'}  ของรายได้`"
            :infos="[]" class="text-red-600" />
        </MuiCard>
        <MuiCard>
          <BizShareSessionTitle label="การเข้าถึงข้อมูล" :button="{ icon: 'i-lucide-info', label: '' }"
            @on-tapped="goto" />
          <BizShareListInfoVertical heading="ขออนุญาตใช้ข้อมูลส่วนบุคคล (KYC)" :infos="[]" />
        </MuiCard>
        <MuiCard>
          <BizShareSessionTitle label="สร้างกระเป๋าเครดิต" :button="{ icon: 'i-lucide-info', label: '' }"
            @on-tapped="goto" />
          <BizShareListInfoVertical heading="ขออนุญาตสร้างกระเป๋าเครดิต" :infos="[]" />
        </MuiCard>
        <ConsentButtonsBand accept-app-text="Accept" reject-app-text="Reject" accept-text="Accept" reject-text="Reject"
          :v-model="dataForm.acceptances"></ConsentButtonsBand>
      </BizShareManaForm>
    </MuiPage>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { ConsentButtonsBand, getManaContext, ActionButton } from "@manaapp/ui";
import type { FormSubmitEvent } from "#ui/types";
import { z } from "zod";

const manaLib = await getManaContext();
const nexumStore = useNexumStore();
const { getData, postSubmitConsentData } = nexumStore;
const { data, pending } = storeToRefs(nexumStore);
const listInfo = ref<any>([]);
const displayImage = ref();
const displayCreditLimit = ref();
const { goVisit } = useManaService();
const consentDate = ref();

const goto = async () => {
  await goVisit("sub-financial", "wallet-credit-policy", "end-creditPAPolicy");
};

getData('get-nexum-consent-pa').then(async () => {
  console.log(data.value);

  consentDate.value = manaLib.getDateText(data?.value?.createdDate);
  displayImage.value = manaLib.getUrl(data.value?.baPicUrl?.host ? data.value?.baPicUrl?.host : "failfast.blob.core.windows.net", data.value?.baPicUrl?.path ? data.value?.baPicUrl?.path : "mcontent-imgs/defaults/dfshop.png");
  displayCreditLimit.value = manaLib.toText(data.value?.contract?.creditLimit);
});

const creditWalletInfo = computed(() => {
  return listInfo.value =
    [{
      label: `วงเงินเครดิต: <span class="text-red-600">${displayCreditLimit.value} </span> บาท`,
      src: 'i-lucide-dot',
      value: `(สามารถเปลี่ยนเป็นเงินสดได้)`,
    },
    {
      label: `อัตราดอกเบี้ยไม่เกิน:  <span class="text-red-600">${data.value?.contract?.interestRatePercentage} ต่อปี</span>`,
      src: 'i-lucide-dot',
      value: `วงเงินกดเงินสด: <span class="text-red-600">${manaLib.toAmount(data.value?.contract?.creditLimit)}</span>  บาท `,
    }, {
      label: `ค่าธรรมเนียมกดเงินสด: <span class="text-red-600">${data.value?.contract?.cashWithdrawalFeeRate}</span> ตามจำนวนวงเงิน`,
      src: 'i-lucide-dot',
      value: ``,
    },
    {
      label: `กำหนดตัดรอบบิลทุกวันที่ <span class="text-red-600">${data.value?.contract?.dueDate}</span> ของเดือนชำระภายในวันที่ <span class="text-red-600">10</span> ของเดือนถัดไป`,
      src: 'i-lucide-dot',
      value: '',
    }
    ];
});

const validationRules = z.object({
  acceptances: z.string()
});

type Schema = z.output<typeof validationRules>;
const dataForm = ref({
  acceptances: ""
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (event.data) {
    dataForm.value.acceptances = data.value?._id;

    var formdata = {
      Acceptances: [dataForm.value.acceptances]
    };
    await postSubmitConsentData(formdata, "post-nexum-consent-panewcontract");
  }
}
</script>