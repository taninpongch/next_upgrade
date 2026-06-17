<template>
  <div>
    <BizShareItem :src="fromimage" :title="data.session.fromName" :description="data.session.fromSubName"
      :transparent="true" />
    <div class="flex">
      <UIcon class="mx-7 w-6 h-6" name="i-heroicons-arrow-small-down" />
      <UDivider />
    </div>
    <BizShareItem :src="toimage" :title="data.session.toName" :description="data.session.toSubName"
      :transparent="true" />
    <!-- TODO -->
    <!-- <BizShareItem :title="totalAmount" description="m+ 0.00 +  0.00 THB" class="text-center" :transparent="true"
      :ui="{ title: 'text-base font-semibold text-red-600' }" /> -->
    <div :class="`text-center`">
      <p class="font-semibold">จำนวนเงิน</p>
      <p class="text-red-600 font-bold">{{ totalAmount }}</p>
      <p v-if="data.isReceiver == false && data.sameCurrency == false" class="text-gray-400 ">{{ totalAmountExchange }}
      </p>
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



const fromimage = computed(() => {
  let originalSource = "";
  if (props.data.session?.fromLogoHost == "icon") {
    originalSource = props.data?.session?.fromLogoPath;
  } else if (props.data?.session?.fromLogoHost == "" || props.data?.session?.fromLogoPath == "") {
    originalSource = "https://failfast.blob.core.windows.net/mcontent-imgs/defaults/dfshop.png";
  }
  else {
    originalSource = lib.getUrl(props.data?.session?.fromLogoHost, props.data?.session?.fromLogoPath);
  }
  return originalSource;
});

const toimage = computed(() => {
  let originalSource = "";
  if (props.data.session?.toLogoHost == "icon") {
    originalSource = props.data?.session?.toLogoPath;
  } else if (props.data?.session?.toLogoHost == "" || props.data?.session?.toLogoPath == "") {
    originalSource = "https://failfast.blob.core.windows.net/mcontent-imgs/defaults/dfshop.png";
  }
  else {
    originalSource = lib.getUrl(props.data?.session?.toLogoHost, props.data?.session?.toLogoPath);
  }
  return originalSource;
});

const totalAmount = computed(() => {
  return lib.toText(props.data?.session?.totalAmount);
})

const totalAmountExchange = computed(() => {
  return lib.toText(props.data?.session?.amountExchange);
})


const emitName = "onTapped";
const emits = defineEmits([emitName]);

</script>