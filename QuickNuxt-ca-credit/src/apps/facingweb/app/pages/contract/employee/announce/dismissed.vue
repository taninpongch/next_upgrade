<template>
    <div v-if="pending">
        <BizShareSkeletonList />
    </div>
    <div v-else>
        <MuiPage>
            <MuiHeader title="แจ้งปลดคุณออกจากการเป็นพนักงาน" />
            <BizShareManaForm @submit="onSubmit">
                <MuiCard>
                    <BizSharePartyHero :src="baImage" :title="data?.baInfo?.name" :subtitle="consentDate" />
                </MuiCard>
                <MuiCard>
                    <div>
                        <BizShareText text="สถานะของคุณ" alignment="center" />
                        <BizShareText text="ไม่ได้เป็นพนักงาน" color="red" alignment="center" :is-bold="true" />
                    </div>
                </MuiCard>
                <div class="pt-8">
                    <BizShareText text="กรุณาติดต่อ บริษัท ของคุณ" color="gray" alignment="center" />
                    <BizShareText text="หากต้องการรายละเอียดเพิ่มเติม" color="gray" alignment="center" />
                </div>
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

getData("get-announce-employee-dismissed").then(async () => {

});
const baImage = computed(() => {
    return manaLib.getUrl(data.value?.baInfo?.logoHost, data.value?.baInfo?.logoPath) || "https://failfast.blob.core.windows.net/mcontent-imgs/defaults/dfshop.png";
});

const consentDate = computed(() => {
    return manaLib.getDateText(data?.value?.createdDate);
});

async function onSubmit() {
    await postData({}, "post-announce-employee-dismissed");
}
</script>
