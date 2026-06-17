<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage>
      <MuiHeader title="คิวอาร์โค้ดรับเงิน" />
      <!-- <BizShareManaForm @submit="onSubmit"> -->
      <MuiCard id="saveSection">
        <BizSharePartyHero :src="srcProfile" :title="data?.name" :subtitle="data?.subName" />
        <div class="text-center mx-auto">
          <BizShareImage :src="srcQrReceive" size="4xl" :rounded="false" />
          <BizShareItem title="คิวอาร์โค้ดใช้ได้ 1 ครั้ง" :description='`หมดอายุในวันที่ ${expriseDate}`'
            class="text-center p-1" :transparent="true"
            :ui="{ title: 'text-base text-gray-500', description: 'text-base text-gray-500' }" />
          <BizShareItem title="จำนวนเงิน" :description="amount" class="text-center p-1" :transparent="true"
            :ui="{ title: 'text-base text-sm', description: 'text-base font-semibold text-red-500' }" />
          <BizShareActionNormal icon="i-lucide-save" label="บันทึกรูปภาพ" color="gray" variant="ghost"
            @on-tapped="saveQr()" id="saveButton" />
        </div>
        <BizShareLine />
        <BizShareItemInfo heading="หมายเหตุ" :title="data?.remark ? data?.remark : '-'" />
      </MuiCard>
      <!-- <ActionButton text="ปิด" />
      </BizShareManaForm> -->
    </MuiPage>
  </div>
</template>

<script setup lang="ts">
import { getManaContext, ActionButton } from "@manaapp/ui";
import { storeToRefs } from "pinia";
import { toBlob } from "html-to-image";

const manaLib = await getManaContext();
const store = useIms3rdStore();
const { data, pending } = storeToRefs(store);
const { getData, postData } = store;
const expriseDate = ref("");

getData("get-receive-result").then(async () => {
  console.log("data", data.value);
  expriseDate.value = manaLib.getDateText(data?.value?.expriseDate)
});

const srcProfile = computed(() => {
  const img = manaLib.getUrl(data.value?.logoHost, data.value?.logoPath);
  return img;
});

const srcQrReceive = computed(() => {
  const img = data.value?.qrUrlHost ? manaLib.getUrl(data.value?.qrUrlHost, data.value?.qrUrlPath) : data.value?.qrUrlPath;
  return img;
});

const amount = computed(() => {
  return manaLib.toText(data?.value?.amount, 'all')
});

const toast = useToast();
const saveQr = async () => {
  const btn = document.getElementById("saveButton");
  if (btn) btn.style.visibility = "hidden";

  const section = document.getElementById("saveSection");
  if (!section) {
    toast.add({ icon: "i-heroicons-x-circle", title: "ไม่สามารถบันทึกรูปภาพ", description: `ไม่พบหน้าที่ต้องการบันทึก`, color: "red", timeout: 3000 });
    return;
  }

  toBlob(section)
    .then((blob: any) => {
      if (!blob) {
        toast.add({ icon: "i-heroicons-x-circle", title: "ไม่สามารถบันทึกรูปภาพ", description: `ไม่สามารถเปลี่ยนหน้าเป็นรูปภาพได้`, color: "red", timeout: 3000 });
        return;
      }

      manaLib.saveImage(blob).then((it: any) => {
        const msgToast = it?.isSuccess ? { icon: "i-heroicons-check-circle", msg: "บันทึกรูปภาพสำเร็จ", color: "green" } : { icon: "i-heroicons-x-circle", msg: "ไม่สามารถบันทึกรูปภาพ", color: "red" };

        toast.add({ icon: msgToast.icon, title: msgToast.msg, color: msgToast.color, timeout: 3000 });
        if (btn) btn.style.visibility = "visible";
      });
    }, error => {
      toast.add({ icon: "i-heroicons-x-circle", title: "ไม่สามารถบันทึกรูปภาพ", description: `เนื่องจาก: ${JSON.stringify(error)}`, color: "red", timeout: 3000 });
    });
}
// async function onSubmit() {
//   await postData({}, "post-receive-result");
// }

</script>