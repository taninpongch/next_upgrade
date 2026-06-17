<template>
  <div v-if="pending">
    <BizShareSkeletonLabel />
  </div>
  <div v-else>
    <MuiPage>
      <MuiHeader title="การยืนยันตัวตนธุรกิจ" />
      <MuiCard>
        <BizShareSessionTitle v-if="displayStatus.canEdit" label=" " :button="{ icon: '', label: 'แก้ไขข้อมูล' }"
          @on-tapped="onSelectEdit" />
        <BizShareSessionTitle v-else label=" " />
        <BizShareActionEmpty v-if="displayStatus.patern == '1'" :src="logoUrl" :title="data.name"
          :subtitle="displayStatus.text" buttonText="ยืนยันตัวตนธุรกิจ" @on-tapped="onSelectKYMAdvance" />
        <BizSharePartyHero v-else :src="logoUrl" :title="data.name" :subtitle="displayStatus.text"
          :iconSubtitle="displayStatus.icon" :pattern="displayStatus.patern" />
      </MuiCard>
    </MuiPage>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { getManaContext } from "@manaapp/ui";
import { watch } from 'vue'
import { useWindowFocus } from "@vueuse/core";

const manaLib = await getManaContext();
const focused = useWindowFocus();
const store = useBAStore();
const { data, pending } = storeToRefs(store);
const { getData } = store;
const { goVisit } = useManaService();

watch(focused, (isFocused) => {
  if (isFocused) {
    getData('get-ba-kym-advance-status').then(async () => {
    });
  }
}, { immediate: true });

const onSelectKYMAdvance = () => {
  goVisit("ba", "ba-kym-advance-create", data.value?.upgradeCaEndpoint);
}

const onSelectEdit = () => {
  alert("onSelectEdit");
  // goVisit("ba", "ba-profile-edit", "endp-ba-profile-edit");
}

const _logoUrl = ref("https://failfast.blob.core.windows.net/mcontent-imgs/defaults/dfshop.png");
const logoUrl = computed(() => {
  if (manaLib && data.value && data.value?.logoHost && data.value?.logoPath) {
    _logoUrl.value = manaLib.getUrl(data.value?.logoHost, data.value?.logoPath)
  }
  return _logoUrl.value;
});

const _displayStatus = ref({
  patern: "",
  text: "",
  icon: "",
  canEdit: false
});
const displayStatus = computed(() => {
  if (manaLib && data.value && data.value?.status) {
    switch (data.value?.status.toLowerCase()) {
      case "pending":
        _displayStatus.value.patern = "3";
        _displayStatus.value.text = "รอการตรวจสอบข้อมูลขั้นสูง...";
        _displayStatus.value.icon = "";
        _displayStatus.value.canEdit = false;
        break;
      case "rejected":
        _displayStatus.value.patern = "3";
        _displayStatus.value.text = "ยืนยันตัวตนไม่สำเร็จ กรุณาตรวจสอบข้อมูล";
        _displayStatus.value.icon = "";
        _displayStatus.value.canEdit = true;
        break;
      case "approved":
        _displayStatus.value.patern = "4";
        _displayStatus.value.text = "ยืนยันตัวตนธุรกิจขั้นสูง";
        _displayStatus.value.icon = "i-material-symbols-light-check-circle-outline";
        _displayStatus.value.canEdit = true;
        break;
      case "no":
      default:
        _displayStatus.value.patern = "1";
        _displayStatus.value.text = "";
        _displayStatus.value.icon = "";
        _displayStatus.value.canEdit = false;
        break;
    }
  }
  return _displayStatus.value;
})
</script>