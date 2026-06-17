<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage>
      <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">
        <MuiCard>
          <BizShareInputText label="เบอร์โทร" placeholder="0891234567" v-model="dataForm.phone" name="phone" type="tel" />  
          <BizBAShareInputToggle textToggle="จำข้อมูลนี้" v-model="dataForm.rememberphone" />
        </MuiCard>

        <MuiCard>
          <BizShareInputNote label="หมายเหตุ" hint="Optional" v-model="dataForm.remark" />
          <BizBAShareInputToggle textToggle="จำข้อมูลนี้" v-model="dataForm.rememberremark" />
        </MuiCard>
        <ActionButton text="ตกลง"></ActionButton>
      </BizShareManaForm>
    </MuiPage>

  </div>

</template>

<script setup lang="ts">
import { getManaContext, ActionButton } from "@manaapp/ui";
import type { FormSubmitEvent } from "#ui/types";
import { storeToRefs } from "pinia";
import { z } from "zod";

const manaLib = await getManaContext();
const store = useGpsStore();
const { data, pending } = storeToRefs(store);
const { getData, postData } = store;

const gps = ref({
  title: '',
});

getData("get-recall-contact").then(() => {
  // gps.value.title = data.value.data.gps.title,
// );
  if (data?.value.Result?.data.saveContactNo) {
    dataForm.value.phone = data?.value.Result?.data.contactNo;
    dataForm.value.rememberphone = data?.value.Result?.data.saveContactNo;
  }
  if (data?.value.Result?.data.saveRemark) {
    dataForm.value.remark = data?.value.Result?.data.remark;
    dataForm.value.rememberremark = data?.value.Result?.data.saveRemark;
  }
});

const validationRules = z.object({
  phone: z.string().min(1, "Invalid request"),
  remark: z.string(),
  rememberphone: z.boolean(),
  rememberremark: z.boolean(),

});

type Schema = z.output<typeof validationRules>;

const dataForm = ref({
  phone: '',
  remark: '',
  rememberphone: false,
  rememberremark: false,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (event.data) {
    var formdata = {
      contactNo: event.data.phone,
      saveContactNo: event.data.rememberphone,
      remark: event.data.remark,
      saveRemark: event.data.rememberremark,
    }
    await postData(formdata, "post-receiver-info");
  };
}

</script>