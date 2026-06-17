<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage :bg-white="true">
      <div>
        <BizShareSessionTitle label="เลือกกระเป๋า" />
        <div v-for="item in itemList">
          <BizShareItemStatus src="i-lucide-wallet" :title="item.walletName"
            :description="checkBalance(item.balance)" rightText="เลือก" :transparent="true" :is-divider="true"
            @on-tapped="itemSelect(item)" />
          <UDivider />
        </div>
      </div>
    </MuiPage>
  </div>
</template>

<script setup lang="ts">
import { getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const store = useIms3rdStore();
const { data, pending } = storeToRefs(store);
const { getData, postOptionSelect } = store;
const itemList = ref<any>([]);

getData("get-list-wallet").then(async () => {
  itemList.value = data?.value
});

const checkBalance = (balance: any) => {
    return manaLib.toText(balance);  
};

const checkImgUrl = (host: string, path: string) => {
  const img = manaLib.getUrl(host, path);
  return img
}

const dataForm = reactive({
  _id: "",
  walletName: "",
  balance: {
    amountUnit: 0,
    currency: ""
  },
  logoHost: "",
  logoPath: ""
});

const itemSelect = (data: any) => {
  dataForm._id = data._id;
  dataForm.walletName = data.walletName;
  dataForm.balance = {
    amountUnit: data.balance.amountUnit,
    currency: data.balance.currency
  };
  dataForm.logoHost = data.logoHost;
  dataForm.logoPath = data.logoPath;

  onSubmit(dataForm);
};

async function onSubmit(dataForm: any) {
  console.log(dataForm);

  await postOptionSelect(dataForm);
}

</script>
