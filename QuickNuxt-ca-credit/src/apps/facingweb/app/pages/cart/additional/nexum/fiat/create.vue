<template>
  <div v-if="pending">
    <BizShareSkeletonLabel />
  </div>
  <div v-else>
    <MuiPage>
      <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">
        <MuiCard>
          <BizSharePartyHero :src="fromSrc" :title="data?.shop?.name" />
          <BizBillShareTxSummary heading="รายละเอียดธุรกรรม" :data="txsummary" />
          <BizShareLine />
          <BizShareItemStatus class="pl-2" title="กำหนดชำระ" :rightText="formattedPaymentDueDate" :transparent="true" />
          <BizShareSessionTitle class="pl-2" label="การชำระเงิน" />

          <div class="flex w-full">
            <BizShareActionNormal
              class="flex-1 text-center border rounded py-2 flex items-center justify-center text-base" :class="selectedPaymentType === 'fullAmount'
                ? 'bg-red-600 text-white border-red-600'
                : 'bg-transparent text-gray-800 border-gray-300'" label="เต็มจำนวน" :blocked="false" :disabled="false"
              @on-tapped="() => onClickPaymentType('fullAmount')" />

            <!-- TODO: remove color="white" and change bg to red -->
            <BizShareActionNormal
              class="flex-1 text-center border rounded py-2 flex items-center justify-center text-base" :class="selectedPaymentType === 'minimumPayment'
                ? 'bg-red-600 text-white border-red-600'
                : 'bg-transparent text-gray-800 border-gray-300'" label="ขั้นต่ำ" :blocked="false" :disabled="false"
              @on-tapped="() => onClickPaymentType('minimumPayment')" />
            <BizShareActionNormal
              class="flex-1 text-center border rounded py-2 flex items-center justify-center text-base" :class="selectedPaymentType === 'customAmount'
                ? 'bg-red-600 text-white border-red-600'
                : 'bg-transparent text-gray-800 border-gray-300'" label="ระบุยอด" :blocked="false" :disabled="false"
              @on-tapped="() => onClickPaymentType('customAmount')" />
          </div>

          <!-- TODO: commented out for now ,Implement this later -->
          <div v-if="selectedPaymentType === 'fullAmount'">
            <div class="text-left">
              <p class="font-semibold">จำนวนเงิน</p>
              <p class="text-red-600 font-bold">{{ totalAmount }}</p>
            </div>
          </div>

          <!-- TODO: commented out for now ,Implement this later -->
          <div v-if="selectedPaymentType === 'minimumPayment'">
            <div class="text-left">
              <p class="font-semibold">จำนวนเงิน</p>
              <p class="text-red-600 font-bold">{{ minimumPayment }}</p>
            </div>
          </div>

          <div v-if="selectedPaymentType === 'customAmount'">
            <BizShareInputCurrency label="จำนวนเงิน" placeholder="กรุณาระบุยอดเงิน" currency="THB"
              v-model="dataForm.amount" name="amount" />
          </div>

          <BizShareItemWalletChange src="i-ion-wallet-outline" heading="เลือกกระเป๋า" :title="walletSelect?.walletName"
            :button="{ icon: 'i-material-symbols-light-repeat', label: '' }" :rightText="walletSelect?.balance"
            @on-tapped="onSelectWallet" />

          <BizShareLine />
          <BizFinancialShareAddCoupon heading="คูปอง" :button="{ icon: 'i-ion-plus-circled', label: '' }" :data="[]" />
          <BizShareLine />
          <BizShareInputNote label="หมายเหตุ" hint="optional" v-model="dataForm.remark" name="remark" />
        </MuiCard>
        <ActionButton text="ตกลง" />
      </BizShareManaForm>
    </MuiPage>
  </div>
</template>

<script lang="ts" setup>
import { getManaContext, ActionButton } from "@manaapp/ui";
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

const manaLib = await getManaContext();
const store = useCartStore()
const { data, pending } = storeToRefs(store)
const { getData, postData } = store
const walletSelect = ref();
const fromSrc = ref();
const selectedPaymentType = ref('fullAmount')

getData("get-cart-additional-fiat-create").then(async () => {
  walletSelect.value = {
    id: data.value?.listwallets[0].id,
    walletName: data.value?.listwallets[0]?.walletName,
    balance: manaLib?.toText(data.value?.listwallets[0]?.balance),
  };
  if ((data.value?.amount?.amountUnit === 0) && (data.value?.totalAmount?.amountUnit === 0)) {
    data.value.totalAmount = { amountUnit: 0, currency: "THB" };
    data.value.minimumPayment = { amountUnit: 0, currency: "THB" };
    data.value.amount = { amountUnit: 0, currency: "THB" };
    data.value.fee = { amountUnit: 0, currency: "THB" };
    data.value.interest = { amountUnit: 0, currency: "THB" };
    data.value.discount = { amountUnit: 0, currency: "THB" };
    dataForm.amount = "0";
  }
  if (data.value?.shop?.logoHost && data.value?.shop?.logoPath) {
    fromSrc.value = manaLib.getUrl(data.value?.shop?.logoHost, data.value?.shop?.logoPath);
  } else {
    fromSrc.value = "https://failfast.blob.core.windows.net/mcontent-imgs/defaults/dfshop.png";
  }
  dataForm.id = data.value?.creditWalletId;
  dataForm.selectedFiatWalletId = walletSelect.value.id;
  dataForm.amount = (data.value?.totalAmount?.amountUnit ?? 0).toString();
});

const formattedPaymentDueDate = computed(() => {
  const rawDate = data.value?.paymentDueDate;
  if (!rawDate) return '';
  const date = new Date(rawDate);
  return date.toLocaleDateString('th-TH', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
});

const totalAmount = computed(() => {
  let totalAmount = {
    "amountUnit": data.value?.totalAmount?.amountUnit ?? 0,
    "currency": data.value?.totalAmount?.currency ?? ''
  }
  return manaLib?.toText(totalAmount)
})

const minimumPayment = computed(() => {
  let minimumPayment = {
    "amountUnit": data.value?.minimumPayment?.amountUnit ?? 0,
    "currency": data.value?.minimumPayment?.currency ?? ''
  }
  return manaLib?.toText(minimumPayment)
})

const txsummary = computed(() => {
  return [
    { description: 'จำนวนเงิน', value: manaLib?.toText(data.value?.amount) },
    { description: 'ดอกเบี้ย', value: manaLib?.toText(data.value?.interest) },
    { description: 'ส่วนลด', value: `-${manaLib?.toText(data.value?.discount)}` },
    { description: 'รวมทั้งหมด', value: manaLib?.toText(data.value?.totalAmount) }
  ]
})

const onClickPaymentType = async (type: string) => {
  selectedPaymentType.value = type;
  if (type === 'fullAmount') {
    dataForm.amount = (data.value?.totalAmount?.amountUnit ?? 0).toString();
  }
  // todo:temp for show dlg comingsoon flow nexum
  // else if (type === 'minimumPayment' || type === 'customAmount') {
  //   await manaLib.visit("sub-financial", 'default/temp-menu-comingsoon?endpointId=closedlg&xdlgmode=dialog&xdlgbtn1=ปิด&xdlgsize=s&closeEndpointId=closedlg');
  //   await manaLib.visit("cart", 'default/underconstruction-dlg?endpointId=closedlg&xdlgmode=dialog&xdlgbtn1=ปิด&xdlgsize=s&closeEndpointId=closedlg');
  // }
  //  TODO: commented out for now ,Implement this later
  else if (type === 'minimumPayment') {
    dataForm.amount = (data.value?.minimumPayment?.amountUnit ?? 0).toString();
  } else {
    dataForm.amount = "";
  }
};

const onSelectWallet = async () => {
  let optionDlgResult = await manaLib.showOptionDlg("cart-additional-nexum-fiat-selectWallet", "1btn", JSON.stringify({}), "close", "", "f");
  if (optionDlgResult && !optionDlgResult.isCancel) {
    walletSelect.value.id = optionDlgResult?.selection.walletId;
    dataForm.selectedFiatWalletId = walletSelect.value.id;
    walletSelect.value.walletName = optionDlgResult?.selection.walletName;
    walletSelect.value.balance = optionDlgResult?.selection.walletBalance;
  }
}

const validationRules = z.object({
  id: z.string().min(1, "Invalid request"),
  selectedFiatWalletId: z.string().min(1, "Invalid request"),
  amount: z.string().min(1, "Invalid request"),
  remark: z.string(),
});

type Schema = z.output<typeof validationRules>;

const dataForm = reactive({
  id: "",
  selectedFiatWalletId: "",
  amount: "",
  remark: "",
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (event.data) {
    //  TODO: commented out for now ,Implement this later
    let amountUnit = 0;
    if (selectedPaymentType.value === 'customAmount') {
      amountUnit = parseFloat(event.data.amount) * 1000;
    } else {
      amountUnit = parseFloat(event.data.amount);
    }
    const formdata = {
      creditWalletId: event.data.id,
      selectedFiatWalletId: event.data.selectedFiatWalletId,
      amount: {
        // amountUnit: parseFloat(event.data.amount),
        amountUnit: amountUnit,
        currency: "THB",
      },
      remark: event.data.remark,
    };
    await postData(formdata, 'post-cart-additional-fiat-create');
  }
}
</script>