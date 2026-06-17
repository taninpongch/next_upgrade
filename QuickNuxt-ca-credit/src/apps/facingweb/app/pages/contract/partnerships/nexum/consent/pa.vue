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
        <MuiCard>
          <BizShareItemOutline v-if="data?.isWarnning" title="แจ้งเตือนสำคัญ"
            description="รายละเอียดสัญญาบางรายการมีการปรับปรุง โปรดตรวจสอบข้อมูลก่อนดำเนินการ หากท่านไม่ยอมรับเงื่อนไขดังกล่าว สัญญาเดิมอาจถูกยกเลิก" />
          <BizShareSessionTitle label="รายละเอียดสัญญาเบื้องต้น" :button="{ icon: 'i-lucide-info', label: '' }"
            @on-tapped="goto" />
          <BizShareListInfoVerticalHtml heading="" :infos="creditWalletInfo" />
        </MuiCard>
        <MuiCard>
          <BizShareSessionTitle label="ขอหักชำระหนี้" :button="{ icon: 'i-lucide-info', label: '' }"
            @on-tapped="goto" />
          <BizShareText v-html="textDeduction" :text="textDeduction" />
          <!--        
          <BizShareListInfoVerticalHtml :heading="`ขออนุญาตหักชำระหนี้ สูงสุด ${data?.deduction ?? '0%'}  ของรายได้   &nbsp; 
          (อัตราที่ใช้งานในปัจจุบัน ${data?.deductionUse ?? '0%'} ของรายได้)`" :infos="[]" class="text-red-600" /> -->
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
const cashAdvanceLimit = ref();
const { goVisit } = useManaService();
const consentDate = ref();
const range = ref<any>([]);

const goto = async () => {
  await goVisit("sub-financial", "wallet-credit-policy", "end-creditPAPolicy");
};

getData('get-nexum-consent-pa').then(async () => {
  consentDate.value = manaLib.getDateText(data?.value?.createdDate);
  displayImage.value = manaLib.getUrl(data.value?.baPicUrl?.host ? data.value?.baPicUrl?.host : "failfast.blob.core.windows.net", data.value?.baPicUrl?.path ? data.value?.baPicUrl?.path : "mcontent-imgs/defaults/dfshop.png");
  displayCreditLimit.value = manaLib.toText(data.value?.contract?.creditLimit);
  cashAdvanceLimit.value = manaLib.toText(data.value?.contract?.cashAdvanceLimit);
  range.value = data.value?.contract?.range || [];
});


const textRange = computed(() => {
  return range.value.map((item: any, index: number) => {
    if (index === range.value.length - 1) {
      return ` <span class="text-red-600 font-bold">${item.range}</span>  ค่าธรรมเนียม <span class="text-red-600 font-bold">${item.fee}</span> THB`;
    } else {
      return ` <span class="text-red-600 font-bold">${item.range}</span> THB ค่าธรรมเนียม <span class="text-red-600 font-bold">${item.fee}</span> THB ${index != 0 && index == range.value.length - 1 ? '<br>' : ''}`;
    }
  }).join('<br>');
});
const creditWalletInfo = computed(() => {
  return listInfo.value =
    [{
      label: `วงเงินเครดิต: <span class="text-red-600 font-bold">${displayCreditLimit.value}  </span> `,
      src: 'i-lucide-dot',
      value: ``,
    },
    {
      label: `อัตราดอกเบี้ยไม่เกิน:  <span class="text-red-600 font-bold">${data.value?.contract?.interestRatePercentage}</span> ต่อปี`,
      src: 'i-lucide-dot',
      value: `(อัตราที่ใช้งานในปัจจุบัน  <span class="text-red-600 font-bold">${data.value?.contract?.interestRatePercentageUse}</span> ต่อปี)`,
    }, {
      label: `ค่าธรรมเนียมกดเงินสด :`,
      src: 'i-lucide-dot',
      value: textRange.value,
    },
    {
      label: `กำหนดตัดรอบบิลทุกวันที่ <span class="text-red-600 font-bold">${data.value?.contract?.dueDate}</span> ของเดือน`,
      src: 'i-lucide-dot',
      value: `ชำระภายในวันที่ <span class="text-red-600 font-bold">${data.value?.contract?.overdueMonth}</span> ของเดือนถัดไป`,
    }
    ];
});
const textDeduction = computed(() => {
  return `อนุญาตหักชำระหนี้ สูงสุด <span class="text-red-600 font-bold text-sm">${data.value?.deduction ?? '0%'}</span>  ของรายได้  <br>
  (อัตราที่ใช้งานในปัจจุบัน <span class="text-red-600 font-bold text-sm">${data.value?.deductionUse ?? '0%'}</span> ของรายได้)</span>`;
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
    await postSubmitConsentData(formdata, "post-nexum-consent-pa", data.value.serviceSubscriptionId);
  }
}
</script>