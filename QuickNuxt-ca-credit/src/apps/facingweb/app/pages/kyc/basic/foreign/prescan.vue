<template>
  <MuiPage>
    <MuiHeader title="kyc (basic)" />
    <MuiCard>
      <div class="text-center mx-auto">
        <p class="font-semibold py-2"> Scan Passport / Identity Card / Travel Document for Aliens: T.D. </p>
        <img src="https://s.isanook.com/ca/0/ud/280/1404076/ahr0chm6ly9zlmlzyw5vb2suy29tl_2.jpg?ip/resize/w728/q80/jpg"
          class="mx-auto py-4" />
        <div class="flex items-center justify-center ">
          <UIcon name="i-ion-checkmark-circle" class="w-5 h-5" />
          <p class="py-2">scan document</p>
        </div>
        <div class="flex items-center justify-center ">
          <UIcon name="i-ion-checkmark-circle" class="w-5 h-5" />
          <p>fill in information</p>
        </div>
      </div>
    </MuiCard>
  </MuiPage>
  <BizShareManaForm>
    <BizShareActionSubmit label="Open camera" @click="navigate()" />
  </BizShareManaForm>
</template>

<script lang="ts" setup>
import { getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const navigate = () => {
  navigateTo('scan')
}
</script>