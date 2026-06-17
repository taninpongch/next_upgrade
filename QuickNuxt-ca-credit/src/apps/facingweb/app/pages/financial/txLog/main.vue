<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage>
      <BizFinancialShareMainWallet :name="data?.walletName" :amount="data?.balance" />
      <BizShareSessionTitle label="ประวัติ" :button="{ icon: '', label: 'ดูเพิ่มเติม' }" />
      <BizShareItemStatus v-if="data?.log?.length > 0" v-for="item in data?.log" :title="item.title"
        :description="item.date" :src="item.icon" :rightText="displayAmount(item.amount)"
        :rightColor="displayColor(item.amount)" @on-tapped="goto(item)" />
      <BizShareEmptyList v-else />
    </MuiPage>
    <!-- <MuiPage v-else>
      <BizFinancialShareMainWallet :name="data?.walletName" :amount="data?.balance" />
      <BizShareSessionTitle label="ประวัติ" :button="{ icon: '', label: 'ดูเพิ่มเติม' }" />
    </MuiPage> -->
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const { goVisit } = useManaService();
const _data = useLogStore();
const { dataLog, pending } = storeToRefs(_data);
const { getData } = _data;
const data = ref<any>();

getData("get-wallet-info").then(async () => {
  data.value = {
    walletName: dataLog?.value?.walletTransactionInfos.walletName,
    balance: manaLib.toText(dataLog?.value.walletTransactionInfos.balance),
    log: dataLog?.value?.walletTransactionInfos.walletTransactionInfos.map((it: any) => ({
      date: manaLib.getDateText(it.transactionDateTime),
      amount: manaLib.toText(it?.balance),
      title: displayTitle(it),
      icon: it?.iconUrl,
      id: it?.id,
      type: it?.txType,
      endpointUrl: it?.endpointUrl,
      visitbill: it?.visitbill
    })),
  };
});

const displayTitle = (value: any) => {
  if (value.txType == "Payroll") {
    return "เงินเดือน";

  } else if (value.txType == "AutoPay") {
    return "ชำระอัตโนมัติ";
  }
  else if (value.balance.amountUnit > 0) {
    return "เงินเข้า";
  } else if (value.balance.amountUnit < 0) {
    return "เงินออก";
  } else {
    return "เงินอื่นๆ";
  }
};

const displayColor = (data: any) => {
  if (data.includes('-')) {
    return "red";
  }
  return "blue";
}

const displayAmount = (data: any) => {
  if (data.includes('-')) {
    return data;
  }
  return data.replace("", "+");
}


const goto = async (item: any) => {
  if (item.visitbill == "old")
    await goVisit("bill", "bill", item.endpointUrl);
  else if (item.visitbill == "new")
    await goVisit("bill", "bill-transactionDetails", item.endpointUrl);
  else if (item.visitbill == "newDelivery")
    await goVisit("bill", "bill-delivery-transactionDetails", item.endpointUrl);
  else
    await goVisit("bill", "bill-transactionDetails", item.endpointUrl)
  // await goVisit("bill", "bill-transactionDetails", item.id);
};
</script>
