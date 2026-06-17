<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage>
      <MuiHeader title="การยืนยันตัวตนธุรกิจ" />
      <MuiCard>
        <BizSharePartyHero :src="displayLogo" :title="data.name" :subtitle="data.message" pattern="3" />
      </MuiCard>
    </MuiPage>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const store = useBAStore();
const { data, pending } = storeToRefs(store);
const { getData } = store;

getData('get-ba-home-pending').then(async () => {
});

const url = ref("https://failfast.blob.core.windows.net/mana2018/imgs/dfshop.png");
const displayLogo = computed(() => {
  //TODO: change img path
  if (manaLib && data.value && data.value?.logoHost && data.value?.logoPath) {
    url.value = manaLib.getUrl(data.value?.logoHost, data.value?.logoPath)
  }
  return url.value;
})

</script>
