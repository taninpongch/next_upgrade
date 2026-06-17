<template>
  <div v-if="false">
    <BizShareSkeletonLabel />
  </div>
  <div v-else>
    <MuiPage>
      <MuiHeader title="การจัดสรรเงินในบัญชีของคุณ" />
      <BizShareItem v-if="wallets?.length > 0" v-for="item in wallets" :title="item.name"
        :description="manaLib.toText(item.amount)" src="i-lucide-wallet-cards" 
        @on-tapped="gotoallowancemain"  />
      <BizShareEmptyList v-else />
    </MuiPage>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { getManaContext } from "@manaapp/ui";
import { useWindowFocus } from "@vueuse/core";
import { watch } from 'vue'

const manaLib = await getManaContext();
const store = useBAStore();
const { data, pending } = storeToRefs(store);
const { getData } = store;
const { goVisit } = useManaService();
const focused = useWindowFocus();
const gotoallowancemain = () => goVisit("ba", "ca-allocation-main", data.value.endpointId);

// getData('get-ca-allowance-list').then(async () => {

// });

const wallets = ref([{ name: "todsob", amount: { currency: 'THB', amountUnit: 0 } }]);
</script>
