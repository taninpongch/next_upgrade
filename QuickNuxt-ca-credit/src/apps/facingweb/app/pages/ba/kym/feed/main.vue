<template>
  <BizShareManaForm @submit="onSubmit">

    <div v-if="pending">
      <BizShareSkeletonList />
    </div>
    <div v-else>
      <MuiPage>
        <MuiCard>
          <BizSharePartyHero :src="logoProfile" :title="data.shopName" />
          <BizShareText class="text-center" :icon="data.iconSubtitle" :text="data.subtitle" :is-bold="true"
            :color="data.color" />
          <BizShareText v-if="data.detail" class="text-center" :text="data.detail" :is-bold="false" />
        </MuiCard>

        <MuiCard v-if="data.recommen" class="bg-gray-500  text-white">
          <!-- <MuiCard class="bg-gray-500  text-white"> -->
          <div class="flex items-center">
            <UIcon name="i-ion-ios-person-outline" class="w-5 h-5" />
            <p class="text-white">ข้อแนะนำ</p>
          </div>
          <p>{{ data.recommen }}</p>
        </MuiCard>
        <ActionButton text="ตกลง"></ActionButton>
      </MuiPage>
    </div>
  </BizShareManaForm>
</template>


<script setup lang="ts">
import { ActionButton, getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const store = useBAStore();
const { data, pending } = storeToRefs(store);
const { getData, postData } = store;
const logoProfile = ref<string>('')

getData("get-ba-feed-kym-status").then(async () => {
  if (data?.value.logoHost && data?.value.logoPath) {
    logoProfile.value = manaLib.getUrl(data?.value.logoHost, data?.value.logoPath)
  }
});


const onSubmit = async () => {
  await postData({}, "post-ba-feed-kym-status");
}

</script>
