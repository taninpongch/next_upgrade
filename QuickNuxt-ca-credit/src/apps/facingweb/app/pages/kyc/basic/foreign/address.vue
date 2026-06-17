<template>
  <MuiPage>
    <BizShareSessionTitle label="Address form identity card" />
    <MuiCard>
      <BizShareInputSelect label="Country" placeholder="Select Country" :options="bind_note" v-model="bind_select" />
      <BizShareInputText label="Zipcode/Postal Code" type="number" placeholder="eg. 123400" v-model="bind_Zipcode" />
      <BizShareInputText label="Address" placeholder="eg. 8/2" v-model="bind_Address" />
      <BizShareInputText label="City/Town" placeholder="eg. liverpool" v-model="bind_City" />
      <BizShareInputText label="Province/State/Region" placeholder="eg. London" v-model="bind_Province" />
    </MuiCard>
    <MuiCard>
      <BizShareInputNote label="Note" hint="Optional" v-model="bind_text" />
    </MuiCard>
  </MuiPage>

  <BizShareManaForm @submit="clickme">
    <BizShareActionSubmit label="Next" @click="navigate()" />
  </BizShareManaForm>
</template>

<script setup lang="ts">
import { getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const navigate = () => {
  navigateTo('create')
}
const initData = reactive({
  addressCode: "",
  address: "",
  subDistrict: "",
  district: "",
  province: "",
  note: "",
});

const bind_note = ref([
  { name: 'CANADA', value: '1' },
  { name: 'BRAZIL', value: '2' },
  { name: 'CHINA', value: '3' },
  { name: 'GERMANY', value: '4' },
  { name: 'VIETNAM', value: '5' },
]);
const bind_select = ref("");
const bind_Zipcode = ref("");
const bind_Address = ref("");
const bind_City = ref("");
const bind_Province = ref("");
const bind_text = ref("");

const dataForm = ref(initData);
const clickme = () => {
};

</script>
