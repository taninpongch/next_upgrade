<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage>
      <!-- TODO add title -->
      <MuiHeader title="แจ้งสถานะการเชื่อมบัญชี Line" />
      <MuiCard>
        <BizSharePartyHero src="i-heroicons-home-solid" title="solar delivery" subtitle="10/10/67 (10:10 น.)" />
      </MuiCard>
      <MuiCard>
        <BizShareItemText title="สถานะของคุณ" subtitle="เชื่อมบัญชีสำเร็จแล้ว">
        </BizShareItemText>
      </MuiCard>
      <BizShareManaForm @submit="onSubmit">
        <ActionButton text="ตกลง"></ActionButton>

      </BizShareManaForm>
    </MuiPage>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import type { FormSubmitEvent } from "#ui/types";
import { z } from "zod";
import { useContractStore } from "~/composables/contractStore";
import { getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const _data = useContractStore();
const { dataContract, pending } = storeToRefs(_data);
const { getData, postData } = _data;
const data = ref<any>();


// TODO replace MOCK-DATA
getData("MOCK-DATA").then(async () => {
  data.value = dataContract.value;
});

const onSubmit = async () => {
  // TODO: implement
  await postData({}, "PATH", "SUBSCRIPTION");
}
</script>
