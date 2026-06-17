<template>
  <div v-if="pending">
    <BizShareSkeletonLabel />
  </div>
  <div v-else>
    <MuiPage>
      <MuiHeader title="บัญชีบริหารเงินของคุณ" />
      <MuiCard class="text-center">
        <BizShareSessionTitle label=" " :button="{ icon: '', label: 'เปลี่ยนรูปภาพปก' }"
          @on-tapped="onSelectChangeCover" />
        <!-- TODO: party hero clickable-->
        <BizSharePartyHero :src="logoUrl" pattern="2" title="เปลี่ยนรูปภาพ" />
      </MuiCard>
      <BizShareItemLink :title="data.name" right-text="แก้ไข" @on-tapped="clickme" />
      <BizShareItemLink :title="data.displayId" right-text="แก้ไข" @on-tapped="clickme" />
      <BizShareItemLink title="สถานที่ตั้ง" @on-tapped="clickme" />
      <BizShareItemLink title="เวลาทำการ" @on-tapped="clickme" />
      <!-- TODO: BizShareItemLink -->
      <BizShareItem @on-tapped="onClickKym" title="การยืนยันตัวตนธุรกิจ" description="การระบุตัวตนที่ใช้ในการทำธุรกรรม"
        :close-button="{ label: typeBa.text, icon: 'i-material-symbols-light-arrow-forward-ios-rounded', color: typeBa.color, variant: 'ghost', padded: false, trailing: true }" />
      <!-- <BizShareItemLink title="การยืนยันตัวตนธุรกิจ" description="การระบุตัวตนที่ใช้ในการทำธุรกรรม" @on-tapped="clickme" /> -->
      <BizShareItemLink title="สัญญา" @on-tapped="clickme" />
    </MuiPage>
  </div>
</template>

<script setup lang="ts">
import { getManaContext } from "@manaapp/ui";
import { useWindowFocus } from "@vueuse/core";
import { watch } from 'vue'

const manaLib = await getManaContext();
const store = useBAStore();
const { data, pending } = storeToRefs(store);
const { getData } = store;
const { goVisit } = useManaService();
const focused = useWindowFocus();

watch(focused, (isFocused) => {
  if (isFocused) {
    getData('get-ba-home-advance').then(async () => {
    });
  }
}, { immediate: true });

const _logoUrl = ref("https://failfast.blob.core.windows.net/mcontent-imgs/defaults/dfshop.png");
const logoUrl = computed(() => {
  if (manaLib && data.value && data.value?.logoHost && data.value?.logoPath) {
    _logoUrl.value = manaLib.getUrl(data.value?.logoHost, data.value?.logoPath)
  }
  return _logoUrl.value;
});

const _typeBa = ref({
  text: "",
  color: ""
});
const typeBa = computed(() => {
  if (manaLib && data.value && data.value?.type) {
    if (data.value.type == "CA") {
      _typeBa.value.color = "blue";
      _typeBa.value.text = "ทำแล้ว";
    } else if (data.value.type == "BA") {
      _typeBa.value.color = "red";
      _typeBa.value.text = "ยังไม่ทำ";
    }
  }
  return _typeBa.value;
});

const onClickKym = async () => {
  await goVisit("ba", "ba-kym-advance-status", data.value.id);
}

const clickme = () => {
}

const onSelectChangeCover = () => {
  // do something
  alert("onSelectKYMAdvance");

}
</script>
