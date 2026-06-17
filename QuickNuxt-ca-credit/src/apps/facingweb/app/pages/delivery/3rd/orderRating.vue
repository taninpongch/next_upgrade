<template>
  <MuiPage>
    <MuiHeader title="คุณได้รับของแล้ว" />
    <BizShareManaForm :state="dataForm" @submit="onSubmit">
      <MuiCard>
        <BizSharePartyHero :src="data?.rider?.logo" title="ให้คะแนนไรเดอร์" />
        <BizDeliveryRatingStar :models="dataForm" />
          <span v-if="checkValidateRiderPoint" :class="'text-red-500 dark:text-red-400'">
            {{ !dataForm.riderPoint ? "Invalid request" : '' }}
          </span>
      </MuiCard>
      <MuiCard>
        <BizShareInputNote label="คำแนะนำ" placeholder="เขียนคำแนะนำการให้บริการ" hint="Optional"
          v-model="dataForm.counsel" name="counsel" />
      </MuiCard>

      <ActionButton text="ตกลง" />
    </BizShareManaForm>
  </MuiPage>
</template>

<script setup lang="ts">
import { ActionButton, getManaContext } from "@manaapp/ui";
import type { FormSubmitEvent } from "#ui/types";
import { z } from "zod";

const manaLib = await getManaContext();
const checkValidateRiderPoint = ref(false);
const store = useDeliveryStore();
const { data, pending } = storeToRefs(store);
const { getData, postData } = store;
getData("get-order-rating").then(() => {
});

const validationRules = z.object({
  riderPoint: z.number().min(1, "Invalid request"),
  restaurantPoint: z.number().min(1, "Invalid request"),
  counsel: z.string(),
});

type Schema = z.output<typeof validationRules>;

const dataForm = reactive({
  riderPoint: 0,
  restaurantPoint: 0,
  counsel: '',
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  checkValidateRiderPoint.value = true;
  if (event.data && dataForm.riderPoint > 0) {
    var formdata = {
      riderPoint: dataForm.riderPoint,
      restaurantPoint: dataForm.restaurantPoint,
      counsel: dataForm.counsel
    }
    await postData(formdata, "post-order-rating")
  }
}

</script>
