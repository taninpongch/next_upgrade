<template>
  <MuiPage>
    <BizShareSessionTitle label="Address in Thailand" />
    <MuiCard>
      <BizKYCAddressInfoEn :models="dataForm" />
    </MuiCard>

    <MuiCard>
      <BizShareInputNote label="Note" hint="Optional" v-model="dataForm.remark" />
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
  navigateTo('createinfo')
}

const initData = reactive({
  zipcode: "",
  line1: "",
  district: "",
  amphoe: "",
  province: "",
  remark: "",
});

const dataForm = ref(initData);
const clickme = () => {
};

</script>