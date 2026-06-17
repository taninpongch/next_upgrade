<template>
  <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">
    <div v-if="pending">
      <BizShareSkeletonList />
    </div>
    <div v-else>
      <MuiPage>
        <BizBAMultiSelection heading="ประเภทสินค้าและบริการ" :data="dataForm.type" />
      </MuiPage>
    </div>
    <ActionButton text="ตกลง" />
  </BizShareManaForm>
</template>

<script setup lang="ts">
import { ActionButton, getManaContext } from "@manaapp/ui";
import type { FormSubmitEvent } from "#ui/types";
import { z } from "zod";

const manaLib = await getManaContext();
const store = useBAStore();
const { data, dataLocal, pending } = storeToRefs(store);
const { getData, getOptionDialogSelection, postOptionSelect } = store;

getData('get-ba-kym-basic-select-type-dlg').then(async () => {
  //TODO: use computed
  dataForm.type = data.value.map((it: any) => {
    return {
      isCheck: false,
      label: it.name,
      value: it.value
    };
  });

  getOptionDialogSelection().then(() => {
    dataLocal.value?.forEach((newItem: any) => {
      const item = dataForm.type.find(currentItem => currentItem.label === newItem);
      if (item) {
        item.isCheck = true;
      }
    })
  });
});

const validationRules = z.object({
  type: z.array(z.object({}))
});

type Schema = z.output<typeof validationRules>;

const dataForm = reactive({
  type: []
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (event.data) {
    let formdata = event.data.type.filter(it => it.isCheck).map(it => it.label);
    await postOptionSelect(formdata);
  }
}

</script>
