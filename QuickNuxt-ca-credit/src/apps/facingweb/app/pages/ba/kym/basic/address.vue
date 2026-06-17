<template>
  <MuiPage>
    <MuiHeader title="สถานที่ตั้ง" />
    <BizShareManaForm :state="dataForm" @submit="onSubmit">
      <MuiCard>
        <BizShareAddressInfo :models="dataForm" />
        <BizShareInputText label="เบอร์ติดต่อ" placeholder="เช่น 0911234567" v-model="dataForm.tel" />
      </MuiCard>
      <MuiCard>
        <BizShareInputNote label="หมายเหตุ" hint="Optional" v-model="dataForm.remark" />
      </MuiCard>
      <ActionButton />
    </BizShareManaForm>
  </MuiPage>
</template>

<script setup lang="ts">
import { ActionButton, getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const store = useBAStore();
const { postData } = store;
const navigate = () => {
  navigateTo('ba-kym-basic-create')
}

//TODO: reactive to ref
const initData = reactive({
  zipcode: "",
  line1: "",
  district: "",
  amphoe: "",
  province: "",
  tel: "",
  remark: "",
});

const dataForm = ref(initData);

async function onSubmit() {
  await postData({}, "ba-kym-basic-create");
}

</script>