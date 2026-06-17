<template>
    <div v-if="pending">
        <BizShareSkeletonList />
    </div>
    <div v-else>
        <MuiPage>
            <BizShareManaForm @submit="onSubmit">
                <MuiHeader title="แจ้งมีเงินเข้ากระเป๋า" />
                <MuiCard>
                    <BizSharePartyHero :src="baImage" :title="data?.baInfo?.name" :subtitle="consentDate" />
                </MuiCard>
                <MuiCard>
                    <BizShareListInfoHorizontal heading="ข้อมูลส่วนตัว" :infos="personalData" />
                    <BizShareActionLink label="ดูข้อมูล" @click="navigate" />
                </MuiCard>
                <ActionButton text="ตกลง" />
            </BizShareManaForm>
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
const { postData, getData } = _data;
const { goVisit } = useManaService();

getData("get-announce-employee-salary").then(async () => {

});
const baImage = computed(() => {
    return manaLib.getUrl(data.value?.baInfo?.logoHost, data.value?.baInfo?.logoPath) || "https://failfast.blob.core.windows.net/mcontent-imgs/defaults/dfshop.png";
});

const consentDate = computed(() => {
    return manaLib.getDateText(data?.value?.createdDate);
});

const personalData = computed(() => {
    return [
        { label: "จำนวนเงิน", value: manaLib.toText(data?.value?.totalAmount) },
        { label: "กระเป๋าที่รับ", value: data?.value?.walletReceive },
    ];
});

const navigate = async () => {
    await goVisit("bill", "bill-transactionDetails", data.value.endpointId);
}

async function onSubmit() {
    await postData({}, "post-announce-employee-salary");
}

</script>
