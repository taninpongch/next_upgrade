<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage>
      <MuiHeader title="ขออนุญาตทำสัญญา" />
      <BizShareManaForm @submit="onSubmit">
        <MuiCard>
          <BizShareSessionTitle label="ผู้ส่งสัญญา" />
          <BizSharePartyHero :src="displayImage" :title="data?.baName" :subtitle="consentDate" />
        </MuiCard>
        <MuiCard>
          <BizShareItemOutline title="แจ้งเตือนสำคัญ"
            description="รายละเอียดสัญญาบางรายการมีการปรับปรุง โปรดตรวจสอบข้อมูล" />
          <BizShareSessionTitle label="รายละเอียดสัญญาเบื้องต้น" :button="{ icon: 'i-lucide-info', label: '' }"
            @on-tapped="goto" />
          <BizShareListInfoVerticalHtml heading="" :infos="creditWalletInfo" />
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
        <ActionButton text="ตกลง" />
      </BizShareManaForm>
    </MuiPage>
  </div>
</template>

<script setup lang="ts">
import { getManaContext, ActionButton } from "@manaapp/ui";

const manaLib = await getManaContext();
const { goVisit } = useManaService();
const nexumStore = useNexumStore();
const { getData, postData } = nexumStore;
const { data, pending } = storeToRefs(nexumStore);
const displayImage = ref();
const consentDate = ref();
const listInfo = ref<any>([]);
const displayCreditLimit = ref();
const range = ref<any>([]);

getData('get-nexum-announce-pa').then(async () => {
  consentDate.value = manaLib.getDateText(data?.value?.createdDate);
  displayImage.value = manaLib.getUrl(data.value?.baPicUrl?.host ? data.value?.baPicUrl?.host : "failfast.blob.core.windows.net", data.value?.baPicUrl?.path ? data.value?.baPicUrl?.path : "mcontent-imgs/defaults/dfshop.png");
  displayCreditLimit.value = await manaLib.toText(data.value?.contract?.creditLimit);
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
      value: `(อัตราที่ใช้งานในปัจจุบัน  <span class="text-red-600 font-bold">${data.value?.contract?.interestRatePercentage}</span> ต่อปี)`,
    }, {
      label: `ค่าธรรมเนียมกดเงินสด :`,
      src: 'i-lucide-dot',
      value: textRange.value,
    },
    {
      label: `กำหนดตัดรอบบิลทุกวันที่ <span class="text-red-600 font-bold">${data.value?.contract?.dueDate}</span> ของเดือน`,
      src: 'i-lucide-dot',
      value: 'ชำระภายในวันที่ <span class="text-red-600 font-bold">10</span> ของเดือนถัดไป',
    }
    ];
});

const goto = async () => {
  await goVisit("sub-financial", "wallet-credit-policy", "end-creditPAPolicy");
};


async function onSubmit() {
  await postData({}, "post-nexum-announce-pa");
}
</script>