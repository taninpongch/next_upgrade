<template>
  <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">
    <div v-if="pending">
      <BizShareSkeletonLabel />
    </div>
    <div v-else>
      <MuiPage>
        <MuiHeader title="เวลาทำการ" />
        <MuiCard>
          <BizBAShareInputToggle textToggle="เปิดร้าน" v-model="dataForm.isAvailable" />
        </MuiCard>

        <BizShareSessionTitle v-if="hasAnyItem" label="เวลาเปิด-ปิดร้าน"
          :button="{ icon: 'i-heroicons-plus-16-solid', label: 'เพิ่ม' }" @on-tapped="onAddNewItem" />
        <BizBAShareScheduleItem v-if="hasAnyItem" v-for="item in dataForm.schedule" :label="displayTime(item)"
          :description="displayDate(item)" v-model="item.isAvailable" @on-tapped="onSelectItem(item)" />
        <MuiCard v-else>
          <BizShareActionEmpty src="i-heroicons-clock" title="กรุณา ตั้งเวลาเปิด-ปิดร้าน"
            subtitle="คุณยังไม่ได้ตั้งเวลาเปิด-ปิดร้าน" button-text="ตั้งเวลาเปิด-ปิดร้าน" />
        </MuiCard>
      </MuiPage>
    </div>
    <ActionButton text="บันทึก" />
  </BizShareManaForm>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ActionButton, getManaContext } from "@manaapp/ui";
import type { FormSubmitEvent } from "#ui/types";
import { z } from "zod";

const manaLib = await getManaContext();
const store = useBAStore();
const { data, pending } = storeToRefs(store);
const { getData, postData } = store;

getData('get-ba-profile-schedule-list').then(async () => {
  dataForm.isAvailable = data.value.isAvailable;
  dataForm.schedule = data.value.schedule;
});

const validationRules = z.object({
  isAvailable: z.boolean(),
  schedule: z.array(z.object({}))
});

type Schema = z.output<typeof validationRules>;

//TODO: reactive to ref
const dataForm = reactive({
  isAvailable: false,
  schedule: []
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (event.data) {
    await postData(event.data, "post-ba-profile-schedule-list");
  }
}

const hasAnyItem = computed(() => {
  return dataForm.schedule && dataForm.schedule.length > 0;
})

const displayTime = computed(() => {
  return (item: any) => {
    const openTime = formatTime(item.openDateTime);
    const closedTime = formatTime(item.closedDateTime);
    return `${openTime} น. - ${closedTime} น.`;
  };
});

const formatTime = (dateTime: any) => {
  const date = new Date(dateTime);
  return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
};

const displayDate = computed(() => {
  return (item: any) => {
    const sumSchedules = [
      { isAvailable: item.monday, name: "จันทร์" },
      { isAvailable: item.tuesday, name: "อังคาร" },
      { isAvailable: item.wednesday, name: "พุธ" },
      { isAvailable: item.thursday, name: "พฤหัสบดี" },
      { isAvailable: item.friday, name: "ศุกร์" },
      { isAvailable: item.saturday, name: "เสาร์" },
      { isAvailable: item.sunday, name: "อาทิตย์" }
    ];

    const availableDays = sumSchedules.filter(it => it.isAvailable).map(it => it.name);
    return availableDays.length === 7 ? "ทุกวัน" : availableDays.join(', ');
  };
});

const onAddNewItem = async () => await onAddOrEditSchedule({});
const onSelectItem = async (item: any) => await onAddOrEditSchedule(item);

const onAddOrEditSchedule = async (item: any) => {
  let optionDlgResult = await manaLib.showOptionDlg("ba-profile-schedule-create", "1btn", JSON.stringify(item), "close", "", "f");
  if (optionDlgResult && !optionDlgResult.isCancel) {

    if (item) {
      const updateIndex = dataForm.schedule.findIndex(it => it.id == item.id);
      if (updateIndex !== -1) { 
        dataForm.schedule[itemIndex] = optionDlgResult?.selection?.data;
       }
    }
    else{
      dataForm.schedule.push(optionDlgResult?.selection?.data);
    }
  }
}

</script>