<template>
    <div v-if="pending">
        <BizShareSkeletonList />
    </div>
    <div v-else>
        <MuiPage>
            <MuiHeader title="แจ้งแต่งตั้งให้คุณเป็นผู้จััดการ" />
            <BizShareManaForm @submit="onSubmit">
                <MuiCard>
                    <BizSharePartyHero :src="baImage" :title="data?.baInfo?.name" :subtitle="consentDate" />
                </MuiCard>
                <MuiCard>
                    <div>
                        <BizShareText text="สถานะของคุณ" alignment="center" />
                        <BizShareText text="คุณได้เป็นผู้จัดการแล้ว" color="blue" alignment="center" :is-bold="true" />
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
import { computed } from "vue";

const manaLib = await getManaContext();
const _data = usePayrollStore();
const { data, pending } = storeToRefs(_data);
const { postData, getData } = _data;

getData("get-announce-manager-assigned").then(async () => {

});


const baImage = computed(() => {
    return manaLib.getUrl(data.value?.baInfo?.logoHost, data.value?.baInfo?.logoPath) || "https://failfast.blob.core.windows.net/mcontent-imgs/defaults/dfshop.png";
});

const consentDate = computed(() => {
    return manaLib.getDateText(data?.value?.createdDate);
});
async function onSubmit() {
    await postData({}, "post-announce-manager-assigned");
}
</script>
