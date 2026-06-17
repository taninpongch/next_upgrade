<template>
  <MuiPage>
    <MuiCard>
      <BizSharePartyHero src="i-ion-ios-phone-portrait" title="08322XXXX" />
      <BizShareInputText label="Your phone number" placeholder="eg. 0846754321" inputMode="numeric"
        v-model="bind_text" />
    </MuiCard>
  </MuiPage>

  <BizShareManaForm @submit="clickme">
    <BizShareActionSubmit label="Next" @click="navigate()" />
  </BizShareManaForm>

</template>

<script setup lang="ts">
import { getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const navigate = () => {
  navigateTo('createinfo')
}
const bind_text = ref("");
const clickme = () => {
};

</script>