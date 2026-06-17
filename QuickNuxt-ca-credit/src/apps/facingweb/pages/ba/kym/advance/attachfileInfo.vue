<template>
  <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">
    <MuiPage>
      <MuiHeader :title="dataLocal.title" />
      <MuiCard>
        <BizShareValidateItem v-model="dataForm.attachName" name="attachName">
          <BizShareInputUploadFile :label="dataLocal.title" v-model="dataForm.attachName" @on-tapped="onSelectUpload" />
        </BizShareValidateItem>
      </MuiCard>
    </MuiPage>
    <ActionButton text="ยืนยัน" />
  </BizShareManaForm>
</template>

<script lang="ts" setup>
import { ActionButton, getManaContext, setupEnvironment } from "@manaapp/ui";
import type { FormSubmitEvent } from "#ui/types";

const manaLib = await getManaContext();
const store = useBAStore();
const { data, dataLocal, pending } = storeToRefs(store);
const { getOptionDialogSelection, postOptionSelect } = store;

getOptionDialogSelection().then(async () => {
  if (dataLocal.value && dataLocal.value.attachId) {
    dataForm.value.attachId = dataLocal.value.attachId;
    dataForm.value.attachName = dataLocal.value.attachName;
  }
});

import { z } from "zod";

const validationRules = z.object({
  attachId: z.string().min(1, "Invalid request"),
  attachName: z.string().min(1, "Invalid request")
});

type Schema = z.output<typeof validationRules>;

const dataForm = ref({
  attachId: "",
  attachName: ""
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (event.data) {
    await postOptionSelect(event.data);
  }
}

const onSelectUpload = async () => {
  let uploadRes = await manaLib.browsePhoto(dataForm.value.attachId);
  if (uploadRes?.selection?.isComplete) {
    let getFileInfo = await manaLib.getPhotoInfo(dataForm.value.attachId)
    if (getFileInfo) {
      dataForm.value.attachName = getFileInfo.FileName;
    }
  }
}
</script>