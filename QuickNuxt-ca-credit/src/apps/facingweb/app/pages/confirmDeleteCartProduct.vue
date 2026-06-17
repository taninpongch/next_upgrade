<template>
  <BizShareManaForm @submit="onSubmit">
    <MuiPage>
      <BizShareResultDialog :data="data.Result" />
    </MuiPage>
    <ActionButton text="ลบสินค้า" />
  </BizShareManaForm>
</template>

<script setup lang="ts">
import { ActionButton, getManaContext } from "@manaapp/ui";
import { storeToRefs } from "pinia";
await getManaContext();

const manaLib = await getManaContext();
const store = useCartStore();
const { data, pending } = storeToRefs(store);
const { getData, postData } = store;
const index = ref<number>(0);

await getData("get-dlg-confirm-delete-cart-product").then(async () => {
  index.value = parseInt(data?.value?.index);
  data.value = {
    Result: {
      Title: data?.value.title,
      Logo: data?.value.logo,
      Message: data?.value.message,
    },
  };
});

async function onSubmit() {
  var formdata = {
    index: index.value,
  };
  await postData(formdata, "post-dlg-confirm-delete-cart-product");
}
</script>
