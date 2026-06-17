<template>
  <MuiPage>
    <BizShareManaForm @submit="onSubmit">
      <BizShareResultDialog :data="data.Result" />
      <ActionButton />
    </BizShareManaForm>
  </MuiPage>
</template>

<script setup lang="ts">
import { ActionButton, getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const store = useDeliveryStore();
const { } = storeToRefs(store);
const { postData } = store;
const data = ref<any>()
data.value = {
  Result: {
    Title: "คุณกำลังเปลี่ยนตะกร้าสินค้า",
    Logo: "https://failfast.blob.core.windows.net/mcontent-imgs/temps/delivery/cartchange.png",
    Message: "สินค้าเดิมจะถูกลบออก"
  }
}
const utf8decoder = new TextDecoder();

const endpointId = useRoute().query["endpointId"] as string;
const changeEndpiontId = endpointId.replace(/-/g, '+').replace(/_/g, '/');
const parts = utf8decoder.decode(base64ToArrayBuffer(changeEndpiontId))?.split('|')
const dataForm = ref(parts[1])
const subscriptionId = ref(parts[2])


function base64ToArrayBuffer(base64: any) {
  var binaryString = atob(base64);
  var bytes = new Uint8Array(binaryString.length);
  for (var i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

async function onSubmit() {
  await postData(dataForm.value, 'post-menu-confirm', subscriptionId.value);
}

</script>