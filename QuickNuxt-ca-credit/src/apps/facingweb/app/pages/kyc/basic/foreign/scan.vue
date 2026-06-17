<template>
  <MuiPage>
    <MuiHeader title="Cancel" />
    <p class="font-semibold text-center"> Scan Passport / Identity Card / Travel Document for Aliens: T.D. </p>
    <MuiCard class="bg-black">
      <div class="text-center mx-auto">
        <img src="https://www.citizencard.com/images/sample-cards/uk-id-card-for-over-18s-2023.png"
          class="mx-auto mb-2" />
        </div>
      </MuiCard>
      <BizShareActionLink label="skip" />
  </MuiPage>
  <BizShareManaForm>
    <BizShareActionSubmit label="Take photo" @click="navigate()" />
  </BizShareManaForm>
</template>

<script lang="ts" setup>
import { getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const navigate = () => {
  navigateTo('create')
}
</script>