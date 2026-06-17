<template>
    <div v-if="pending">
        <BizShareSkeletonList />
    </div>
    <div v-else>
        <MuiPage>
            <MuiHeader title="แจ้งเปลี่ยนแปลงข้อมูลของคุณ" />
            <BizShareManaForm @submit="onSubmit">
                <MuiCard>
                    <BizSharePartyHero :src="baImage" :title="data?.baInfo?.name" :subtitle="consentDate" />
                </MuiCard>
                <MuiCard>
                    <BizShareItemText title="ชื่อพนักงาน" subtitle="อานน บางสาน" textalign="left" />
                    <div>
                        <BizShareSessionTitle label="ข้อมูลที่เปลี่ยน" :button="{ label: 'ดูข้อมูล', icon: '' }"
                            :ui="{ label: { base: 'font-bold text-base' } }" />

                        <BizShareText v-for="item in data?.updateInfo?.data" :text="`• ${item}`" />
                    </div>
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

getData("get-announce-employee-edited").then(async () => {

});
const baImage = computed(() => {
    return manaLib.getUrl(data.value?.baInfo?.logoHost, data.value?.baInfo?.logoPath) || "https://failfast.blob.core.windows.net/mcontent-imgs/defaults/dfshop.png";
});

const consentDate = computed(() => {
    return manaLib.getDateText(data?.value?.createdDate);
});
async function onSubmit() {
    await postData({}, "post-announce-employee-edited");
}
</script>
