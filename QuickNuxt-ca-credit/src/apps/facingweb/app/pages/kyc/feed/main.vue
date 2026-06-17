<template>
  <BizShareManaForm @submit="onSubmit">

    <div v-if="pending">
      <BizShareSkeletonList />
    </div>
    <div v-else>
      <MuiPage>
        <MuiCard>
          <BizSharePartyHero :src="logoProfile" :title='`${datakyc?.firstName} ${datakyc?.lastName}`' />
          <BizShareText class="text-center" :icon="datakyc.iconSubtitle" :text="datakyc.subtitle" :is-bold="true"
            :color="datakyc.color" />
          <BizShareText v-if="datakyc.detail" class="text-center" :text="datakyc.detail" :is-bold="false" />

        </MuiCard>

        <MuiCard v-if="datakyc.recommen" class="bg-gray-500  text-white">
          <!-- <MuiCard class="bg-gray-500  text-white"> -->
          <div class="flex items-center">
            <UIcon name="i-ion-ios-person-outline" class="w-5 h-5" />
            <p class="text-white">ข้อแนะนำ</p>
          </div>
          <p>{{ datakyc.recommen }}</p>
        </MuiCard>
        <ActionButton text="ตกลง"></ActionButton>
      </MuiPage>
    </div>
  </BizShareManaForm>
</template>


<script setup lang="ts">
import { ActionButton, getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const kyc = useKycStore();
const { datakyc, pending } = storeToRefs(kyc);
const { getData, postData } = kyc;
const logoProfile = ref<string>('')

getData("get-feed-kyc-status").then(async () => {
  if (datakyc?.value.logoHost && datakyc?.value.logoPath) {
    logoProfile.value = manaLib.getUrl(datakyc?.value.logoHost, datakyc?.value.logoPath)
  }
});


const onSubmit = async () => { 
  await postData({}, "post-feed-kyc-status");
}

</script>
