<template>
  <MuiCard>
    <BizSharePartyHero :src="logo" :title="data?.wallet.displayName" :subtitle="data?.wallet.walletName" />
    <div class="text-center mx-auto">
      <div>
        <BizShareImage :src="imgThaiQr" size="custom" class=" bg-white" :rounded="false" />
      </div>
      <BizShareImage :src="imgQr" size="4xl" :rounded="false" />
      <BizShareItem title="จำนวนเงิน"
        :description="`${lib.toText(data?.session.amount, 'amt')} ${lib.toText(data?.session.amount, 'cur')}`"
        class="text-center p-0" :transparent="true"
        :ui="{ title: 'text-base text-sm', description: 'text-base font-semibold text-red-500' }" />
      <BizShareItem :title="`คิวอาร์โค้ดนี้ใช้ได้ครั้งเดียว หมดอายุ ${lib.getDateText(data?.session.actionDate)}`"
        class="text-center px-0" :transparent="true" :ui="{ title: 'text-sm text-gray-500' }" />
    </div>
    <BizShareItemInfo heading="หมายเหตุ" :title="data?.session.remark ? data?.session.remark : '-'" />
  </MuiCard>
  <div>
    <!-- <BizShareActionLink icon="i-ion-share-outline" label="แชร์" /> -->
    <BizShareActionLink label="บันทึกรูปภาพ" @on-tapped="saveQr" />
    <!-- <BizShareActionLink label="เลือก Mobile banking" /> -->
  </div>
</template>

<script setup lang="ts">
import { getManaContext } from "@manaapp/ui";
const lib = await getManaContext();
const { goVisit } = useManaService();
const toast = useToast()

const props = withDefaults(
  defineProps<{
    data: any,
  }>(), {}
)
const logo = computed(() => {
  if (props.data == null) {
    return "";
  }
  return lib.getUrl(props.data?.wallet?.logoHost, props.data?.wallet?.logoPath);
})

const imgThaiQr = computed(() => {
  if (props.data == null) {
    return "";
  }
  return lib.getUrl(props.data?.thaiQr?.logoHost, props.data?.thaiQr?.logoPath)
})

const imgQr = computed(() => {
  if (props.data == null) {
    return "";
  }
  return props.data?.session?.qrUrlFqdn
})

const saveQr = async () => {
  let url = `http://localhost:9000/mapp/saveQrCode`;
  const { data: rsp, execute } = await useMFetch<any>(url, { method: "POST", headers: { "Accept": "application/json", "pageId": lib.pageId }, body: JSON.stringify({ qrUrl: imgQr.value }) });
  execute().then(() => {
    if (rsp.value?.isSuccess) {
      toast.add({ icon: "i-heroicons-check-circle", title: "บันทึกรูปภาพสำเร็จ", color: "green", timeout: 3000 });
    } else {
      toast.add({ icon: "i-heroicons-x-circle", title: "บันทึกรูปภาพไม่สำเร็จ", color: "red", timeout: 3000 });
    }
  });
};
</script>