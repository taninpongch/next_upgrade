<template>
  <MuiPage>
    <MuiHeader title="ตั้งชื่อ DisplayName" />
    <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">
      <MuiCard>
        <BizShareInputText label="ตั้งชื่อ DisplayName" placeholder="เช่น อานน" v-model="dataForm.displayName" />
      </MuiCard>
      <ActionButton text="ยืนยัน"></ActionButton>
    </BizShareManaForm>
  </MuiPage>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ActionButton, getManaContext } from "@manaapp/ui";
import type { FormSubmitEvent } from "#ui/types";
import { z } from "zod";
await getManaContext();

const store = useDeliveryStore();
const { data, pending } = storeToRefs(store);
const { getOptionDialogSelection, postOptionSelect } = store;

getOptionDialogSelection().then(async () => {
  if (data.value) {
    dataForm.value.displayName = data.value?.displayName;
  }
});

const validationRules = z.object({
  displayName: z.string().min(1, "Invalid request"),
});

type Schema = z.output<typeof validationRules>;

const dataForm = ref({
  displayName: ""
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (event.data) {
    await postOptionSelect(event.data);
  }
}

</script>
