<template>
  <MuiPage>
    <MuiHeader title="ยกเลิกคำสั่งซื้อ" />
    <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">
      <MuiCard>
        <BizShareInputSelect label="สาเหตุการยกเลิก" placeholder="กรุณาเลือก" :options="displayCancelReason"
          v-model="dataForm.heading" name="heading" />
        <BizShareInputNote label="หมายเหตุ" placeholder="เขียนหมายเหตุเพิ่มเติม" hint="Optional" v-model="dataForm.info"
          name="info" />
        <!-- <BizShareText icon="i-ion-alert-circle-outline" text="การยกเลิกจะไม่ได้รับการคืนเงินในส่วนของค่าธรรมเนียม"
          color="red" alignment="left" /> -->
      </MuiCard>
      <ActionButton text="ตกลง"></ActionButton>
    </BizShareManaForm>
  </MuiPage>
</template>

<script setup lang="ts">
import { ActionButton, getManaContext } from "@manaapp/ui";
import type { FormSubmitEvent } from '#ui/types';
import { z } from "zod";

const manaLib = await getManaContext();
const router = useRouter();
const store = useDeliveryStore();
const { data, pending } = storeToRefs(store);
const { postData } = store;

const displayCancelReason = [
  { name: 'รออาหารนานเกินไป', value: 'รออาหารนานเกินไป' },
  { name: 'ต้องการเปลี่ยนเมนู หรือ สั่งผิด', value: 'ต้องการเปลี่ยนเมนู หรือ สั่งผิด' },
  { name: 'ปฏิเสธค่าใช้จ่ายเพิ่มเติม', value: 'ปฏิเสธค่าใช้จ่ายเพิ่มเติม' },
  { name: 'อื่นๆ', value: 'อื่นๆ' }];

const validationRules = z.object({
  heading: z.string().min(1, "Invalid request"),
  info: z.string(),
});

type Schema = z.output<typeof validationRules>;
const dataForm = reactive({
  heading: '',
  info: '',
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (event.data) {
    var formdata = {
      heading: event.data.heading,
      info: event.data.info,
    }
    await postData(formdata, "post-order-cancel-request")
  };
}
</script>