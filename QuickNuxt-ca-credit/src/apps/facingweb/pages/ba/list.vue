<template>
  <div v-if="pending">
    <BizShareSkeletonLabel />
  </div>
  <div v-else>
    <MuiPage v-if="zeroBaAccount">
      <MuiHeader title="ธุรกิจของคุณ" />
      <MuiCard>
        <BizShareActionEmpty src="i-material-symbols-light-universal-currency-outline-rounded"
          title="เริ่มต้นธุรกิจของคุณ"
          subtitle="ร่วมสร้างธุรกิจของคุณ กับ mana business เพื่อการจัดการที่ง่ายและสะดวก ปลอดภัยให้กับธุรกิจของคุณ พร้อมกับบริการเสริมมากมาย ที่จะทำให้ธุรกิจของคุณพัฒนาไปด้วยกันกับเรา"
          button-text="สร้างธุรกิจใหม่" @on-tapped="onCreateBA" />
      </MuiCard>
    </MuiPage>
    <MuiPage v-else>
      <MuiHeader title="ธุรกิจของคุณ" />
      <BizShareListItem heading="เลือกธุรกิจ" :data="ba" :button="{ icon: 'i-heroicons-plus-16-solid', label: 'เพิ่ม' }"
        @on-tapped="onCreateBA" @on-select-item="onSelectBA" />
    </MuiPage>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { getManaContext } from "@manaapp/ui";
import { useWindowFocus } from "@vueuse/core";
import { watch } from 'vue'

const manaLib = await getManaContext();
const store = useBAStore();
const { data, pending } = storeToRefs(store);
const { getData } = store;
const { goVisit } = useManaService();
const focused = useWindowFocus();
const onCreateBA = () => goVisit("ba", "ba-kym-basic-agreement", data.value.createEndpointId);
const onSelectBA = (item: any) => goVisit("ba", item.path, item.id);

getData('get-ba-list').then(async () => {
  //TODO: use computed
  ba.value = data.value?.merchants?.map((it: any) => {
    //TODO: change img path
    let displayLogo = "https://failfast.blob.core.windows.net/mana2018/imgs/dfshop.png";
    if (it.logoHost && it.logoPath) {
      displayLogo = manaLib.getUrl(it.logoHost, it.logoPath)
    }
    return {
      id: it.id,
      src: displayLogo,
      title: it.name,
      description: it.description,
      path: it.path,
    }
  })
});

watch(focused, (isFocused) => {
  if (isFocused) {
    getData('get-ba-list').then(async () => {

      //TODO: use computed
      ba.value = data.value?.merchants?.map((it: any) => {
        //TODO: change img path
        let displayLogo = "https://failfast.blob.core.windows.net/mana2018/imgs/dfshop.png";
        if (it.logoHost && it.logoPath) {
          displayLogo = manaLib.getUrl(it.logoHost, it.logoPath)
        }

        return {
          id: it.id,
          src: displayLogo,
          title: it.name,
          description: it.description,
          path: it.path,
        }
      })
    });
  }
}, { immediate: true });

const ba = ref<any[]>([]);
const zeroBaAccount = computed(() => ba.value.length === 0);

</script>
