<template>
    <div v-if="pending">
        <BizShareSkeletonList />
    </div>
    <div v-else>
        <MuiPage>
            <MuiHeader title="ข้อมูลพนักงาน" />
            <MuiCard>
                <BizSharePartyHero :src="imageInfo" />
                <div>
                    <BizShareListInfoHorizontal heading="ข้อมูลส่วนตัว" :infos="personalData" :is-bold="true" />
                </div>
                <div>
                    <BizShareListInfoHorizontal heading="ข้อมูลการทำงาน" :infos="workData" :is-bold="true" />
                </div>
            </MuiCard>
        </MuiPage>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ActionButton, getManaContext } from "@manaapp/ui";
import { ref, computed } from "vue";
const manaLib = await getManaContext();
const _data = usePayrollStore();
const { data, pending } = storeToRefs(_data);
const { getData } = _data;

getData("get-employee-suspended-info").then(async () => {
});

const imageInfo = computed(() => {
    return manaLib.getUrl(data.value?.personal.logoHost, data.value?.personal.logoPath) || "https://failfast.blob.core.windows.net/mcontent-imgs/defaults/dfprofile.png";
});

const personalData = computed(() => {
    return [
        { label: "ชื่อจริง", value: data?.value.personal.fullName ?? '-' },
        { label: "ชื่อเล่น", value: data?.value.personal.nickname ?? '-' },
        { label: "ที่อยู่", value: data?.value.personal.address ?? '-' },
        { label: "บันทึก", value: data?.value.personal.startWorkNote ?? '-' }
    ];
});

const workData = computed(() => {
    return [
        { label: "รหัสพนักงาน", value: data?.value.work.empId },
        { label: "ตําแหน่ง", value: data?.value.work.position },
        { label: "แผนก", value: data?.value.work.department },
        { label: "สถานะ", value: data?.value.work.status },
        { label: "เงินเดือน", value: manaLib.toText(data?.value.work.salary) },
    ];
});
</script>
