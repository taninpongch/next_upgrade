<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage>
      <MuiHeader title="ขออนุญาตทำสัญญา" />
      <MuiCard>
        <BizShareSessionTitle label="ผู้ส่งสัญญา" />
        <BizSharePartyHero :src="displayImage" :title="data?.baName" :subtitle="consentDate" />
      </MuiCard>
      <MuiCard>
        <BizShareSessionTitle label="รายละเอียดสัญญาเบื้องต้น" :button="{ icon: 'i-lucide-info', label: '' }"
          @on-tapped="goto" />
        <BizShareListInfoVerticalHtml heading="" :infos="creditWalletInfo" />

      </MuiCard>
      <MuiCard>
        <BizShareSessionTitle label="การหักชำระหนี้" :button="{ icon: 'i-lucide-info', label: '' }" @on-tapped="goto" />
        <BizShareText v-html="textDeduction" :text="textDeduction" />

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
      <!-- <MuiCard>
        <BizShareSessionTitle label="ข้อกำหนดยกเลิกสัญญา" :button="{ icon: 'i-lucide-info', label: '' }"
          @on-tapped="goto" />
        <BizShareListInfoVertical heading="" :infos="checkOverduebill" />
        <BizShareActionNormal v-if="checkbuttonCancel" label="ยกเลิกสัญญา" icon="i-ph-camera-fill" :rounded="true"
          @on-tapped="cancelIdleCallback" />
      </MuiCard> -->

    </MuiPage>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const store = useFinancialStore();
const { data, pending } = storeToRefs(store);
const { getData } = store;
const { goVisit } = useManaService();
const listInfo = ref<any>([]);
const displayImage = ref();
const displayCreditLimit = ref();
const consentDate = ref();
const checkOverdue = ref<boolean>(false);
const checkbuttonCancel = ref<boolean>(false);
const range = ref<any>([]);
const cashAdvanceLimit = ref();

const goto = async () => {
  await goVisit("sub-financial", "wallet-credit-policy", "end-creditPAPolicy");
};

getData('get-contract-cancel-policy').then(async () => {
  consentDate.value = manaLib.getDateText(data?.value?.createdDate);
  displayImage.value = manaLib.getUrl(data.value?.baPicUrl?.host ? data.value?.baPicUrl?.host : "failfast.blob.core.windows.net", data.value?.baPicUrl?.path ? data.value?.baPicUrl?.path : "mcontent-imgs/defaults/dfshop.png");
  displayCreditLimit.value = manaLib.toText(data.value?.contract?.creditLimit);
  checkOverdue.value = data.value?.checkOverdueBill;
  checkbuttonCancel.value = data.value?.checkButtonCancel;
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
  return `<span class="text-red-600 font-bold text-sm">อนุญาตหักชำระหนี้ สูงสุด ${data.value?.deduction ?? '0%'}  ของรายได้  <br>
  (อัตราที่ใช้งานในปัจจุบัน ${data.value?.deductionUse ?? '0%'} ของรายได้)</span>`;
});

const checkOverduebill = computed(() => {
  return listInfo.value =
    [{
      label: checkOverdue.value ? `ค้างชำระบิล` : `ไม่ค้างชำระบิล`,
      src: 'i-lucide-dot',
      value: ``,
      status: ''
    }
    ];
});

//TODO: implement ตัวยกเลิกสัญญา
const cancelIdleCallback = () => {
  console.log("cancelIdleCallback");
}

</script>