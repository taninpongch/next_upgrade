<template>
    <div v-if="pending">
        <BizShareSkeletonList />
    </div>
    <div v-else>
        <MuiPage>
            <MuiHeader title="แจ้งรับเข้าทำงาน" />
            <BizShareManaForm @submit="onSubmit">
                <MuiCard>
                    <BizSharePartyHero :src="baImage" :title="data?.baInfo?.name" :subtitle="consentDate" />
                </MuiCard>
                <MuiCard>
                    <div>
                        <BizShareText text="สถานะการสมัคร" alignment="center" />
                        <BizShareText text="คุณได้เป็นพนักงานแล้ว" color="blue" alignment="center" :is-bold="true" />
                    </div>
                    <!-- <BizShareText text="ดูข้อมูลของคุณ" alignment="center" @click="navigate" /> -->
                </MuiCard>
                <ActionButton text="ตกลง" />
            </BizShareManaForm>
        </MuiPage>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ActionButton, getManaContext } from "@manaapp/ui";
const manaLib = await getManaContext();
const _data = usePayrollStore();
const { data, pending } = storeToRefs(_data);
const { postData, getData } = _data;
const { goVisit } = useManaService();

getData("get-announce-employee-approved").then(async () => {

});

const baImage = computed(() => {
    return manaLib.getUrl(data.value?.baInfo?.logoHost, data.value?.baInfo?.logoPath) || "https://failfast.blob.core.windows.net/mcontent-imgs/defaults/dfshop.png";
});

const consentDate = computed(() => {
    return manaLib.getDateText(data?.value?.createdDate);
});


const navigate = async () => {
    await goVisit("payroll", "consent-employee-detail", data.value.endpointId);
}
async function onSubmit() {
    await postData({}, "post-announce-employee-approved");
}
</script>
