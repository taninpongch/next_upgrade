<template>
  <div>
    <BizShareItem :src="fromImage" :title="data?.session?.fromName" :description="data?.session?.fromSubName"
      :transparent="true" />
    <div class="flex">
      <UIcon class="mx-7 w-6 h-6" name="i-heroicons-arrow-small-down" />
      <UDivider />
    </div>
    <BizShareItem :src="toImage" :title="data?.session?.toName" :description="data?.session?.toSubName"
      :transparent="true" />
    <!-- <BizShareItem :title="amount" :description="`m+ ${feeAmount} + ${exchangeAmount}`" class="text-center"
      :transparent="true" :ui="{ title: 'text-base font-semibold text-red-600' }" /> -->
    <div :class="`text-center`">
      <p class="font-semibold">จำนวนเงิน</p>
      <p class="text-red-600 font-bold">{{ amount }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getManaContext } from "@manaapp/ui";

const lib = await getManaContext();
const props = withDefaults(
  defineProps<{
    data?: any,
  }>(), {}
)

const amount = lib.toText(props.data?.session?.amount);
const exchangeAmount = lib.toText(props.data?.session?.exchangeAmount);
const feeAmount = lib.toText(props.data?.session?.fee, 'amt');

const fromImage = computed(() => {
  //TODO: change img path
  let displayLogo = "";
  if (props.data && props.data?.session && props.data?.session?.fromLogoHost == "icon") {
    displayLogo = props.data?.session?.fromLogoPath;
  } else if (props.data?.session?.fromLogoHost == "" || props.data?.session?.fromLogoPath == "") {
    displayLogo = "https://failfast.blob.core.windows.net/mcontent-imgs/defaults/dfshop.png";
  }
  else {
    displayLogo = props.data?.session?.fromLogoHost == 'icon' ? props.data?.session?.fromLogoPath : lib.getUrl(props.data?.session?.fromLogoHost, props.data?.session?.fromLogoPath);
  }

  return displayLogo;
})

const toImage = computed(() => {
  let displayLogo = "";
  if (props.data && props.data?.session && props.data?.session?.toLogoHost == "icon") {
    displayLogo = props.data?.session?.toLogoPath;
  }
  else if (props.data?.session?.toLogoHost == "" || props.data?.session?.toLogoPath == "") {
    displayLogo = "https://failfast.blob.core.windows.net/mcontent-imgs/defaults/dfshop.png";
  } else {
    displayLogo = props.data?.session?.toLogoHost == 'icon' ? props.data?.session?.toLogoPath : lib.getUrl(props.data?.session?.toLogoHost, props.data?.session?.toLogoPath);
  }

  return displayLogo;
})
</script>