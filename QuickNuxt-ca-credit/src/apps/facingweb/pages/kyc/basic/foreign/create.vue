<template>
  <MuiPage>
    <MuiHeader title="KYC (basic)" />
    <BizShareSessionTitle label="Personal information" />
    <MuiCard>
      <BizShareInputSelect label="prefix" placeholder="select perfix" :options="bind_select"
        v-model="dataForm.nametitle" />
      <BizShareInputText v-if="dataForm.nametitle === 'other'" label="perfix" placeholder="eg. miss"
        v-model="dataForm.fristname" />
      <BizShareInputText label="Frist name" placeholder="eg. John" v-model="dataForm.fristname" />
      <BizShareInputText label="Last name" placeholder="eg. Doe" v-model="dataForm.lastname" />
      <BizShareInputDate label="Date of birth" placeholder="select date of birth" v-model="dataForm.birthday" />
      <BizShareInputText label="Passport no./identity card no./travel document for aliens: T.D. no."
        placeholder="eg. 1234567890123" v-model="dataForm.idcard" />
      <BizShareInputSelect label="Nationality" placeholder="select nationality" :options="bind_nationality" />
      <BizShareItemLink title="Address form identity card" src="" description="please enter an address"
        @click="navigate2()" />
      <UDivider />
      <BizShareInputCheckbox text-checkbox="Remember my information" />
    </MuiCard>
  </MuiPage>
  <BizShareManaForm>
    <BizShareActionSubmit label="Next" @click="navigate()" />
  </BizShareManaForm>
</template>

<script lang="ts" setup>
import { getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const navigate = () => {
  navigateTo('createInfo')
}
const navigate2 = () => {
  navigateTo('address')
}
const initData = reactive({
  nametitle: "",
  fristname: "",
  lastname: "",
  birthday: "",
  idcard: "",
});

const validationRules = {
  nametitle: {},
  fristname: {},
  lastname: {},
  birthday: {},
  idcard: {},
};

const dataForm = ref(initData);
const bind_select = ref([{
  name: 'Miss', value: 'miss'
}, {
  name: 'Mrs', value: 'Mrs.'
}, {
  name: 'Mr', value: 'Mr.'
}, {
  name: 'other', value: 'other'
}
]);

const bind_nationality = ref([{
  name: 'Brazilian', value: '1'
}, {
  name: 'Chinese', value: '2'
}, {
  name: 'Dutch', value: '3'
}, {
  name: 'Mexican', value: '4'
}, {
  name: 'Lao', value: '4'
}
]);

</script>