<template>
  <MuiPage>
    <MuiCard>
      <p @click="navigateedit()" class="text-right">edit</p>
      <BizSharePartyHero src="https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/atinux" title="John Doe" />
    </MuiCard>

    <BizShareItemStatus title="KYC basic" src="i-ion-checkmark-circle-outline" rightText="Approve" />
    <BizShareItemStatus title="KYC advance" src="i-ion-checkmark-circle-outline" rightText="None" />
    <BizShareActionNormal icon="i-ph-camera-fill" :rounded="true" label="KYC advance" @click="navigate()" />
  </MuiPage>
</template>
<script setup lang="ts">
import { getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const navigate = () => {
  navigateTo('/kyc/main', { replace: true })
}

const navigateedit = () => {
  navigateTo('create')
}

</script>