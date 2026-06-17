<template>
    <div v-if="pending">
        <BizShareSkeletonList />
    </div>
    <div v-else>
        <MuiPage>
            <MuiHeader title="คำขออนุมัติจ่ายเงินให้พนักงาน" />
            <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">

                <MuiCard>
                    <BizSharePartyHero :src="baImage" :title="data?.baInfo?.name" :subtitle="consentDate" />
                </MuiCard>
                <MuiCard>
                    <BizShareListInfoHorizontal heading="รายละเอียดสัญญา" :button="{ label: 'ดูข้อมูล', icon: '' }"
                        :infos="paymentInfo" />
                    <!-- <BizShareActionLink label="ดูข้อมูล" @click="navigate" /> -->
                </MuiCard>
                <ConsentButtonsBand accept-app-text="Accept" reject-app-text="Reject" accept-text="Accept"
                    reject-text="Reject" :v-model="dataForm.acceptances"></ConsentButtonsBand>
            </BizShareManaForm>
        </MuiPage>
    </div>

</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { getManaContext, ConsentButtonsBand } from "@manaapp/ui";
import type { FormSubmitEvent } from "#ui/types";
import { z } from "zod";
import { ref, computed } from "vue";
const { goVisit } = useManaService();
const manaLib = await getManaContext();
const _data = usePayrollStore();
const { data, pending } = storeToRefs(_data);
const { postSubmitConsentData, getData } = _data;

getData("get-consent-manager-pay").then(async () => {
    dataForm.value.acceptances = data?.value.employeesList.map((it: any) => it.id) || [];
});

const paymentInfo = computed(() => {
    return [
        { label: "พนักงานทั้งหมด", value: data?.value?.employeeCount || "-" },
        { label: "เงินเดือนทั้งหมด", value: manaLib.toText(data?.value?.totalSalary) },
        { label: "ค่าธรรรมเนียม", value: manaLib.toText(data?.value?.serviceFee) },
        { label: "ยอดทั้งหมด", value: manaLib.toText(data?.value?.totalAmount) },
    ];
});

const baImage = computed(() => {
    return manaLib.getUrl(data.value?.baInfo?.logoHost, data.value?.baInfo?.logoPath) || "https://failfast.blob.core.windows.net/mcontent-imgs/defaults/dfshop.png";
});

const consentDate = computed(() => {
    return manaLib.getDateText(data?.value?.createdDate);
});

const validationRules = z.object({
    acceptances: z.array(z.string())
});


type Schema = z.output<typeof validationRules>;

const dataForm = ref({
    acceptances: [] as string[]
});


async function onSubmit(event: FormSubmitEvent<Schema>) {
    if (event.data) {
        var formdata = {
            Acceptances: dataForm.value.acceptances
        };
        await postSubmitConsentData(formdata, "post-consent-manager-pay", data.value.serviceSubscriptionId);
    }
}
// const navigate = async () => {
//     await goVisit("payroll", "payroll-employeeDetails", data.value.endpointId);
// }
</script>
