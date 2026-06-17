<template>
    <div v-if="pending">
        <BizShareSkeletonList />
    </div>
    <div v-else>
        <MuiPage>
            <MuiHeader title="คำขออนุมัติแก้ไขข้อมูลพนักงาน" />
            <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">
                <MuiCard>
                    <BizSharePartyHero :src="baImage" :title="data?.baInfo?.name" :subtitle="consentDate" />
                </MuiCard>
                <MuiCard>
                    <BizShareValidateItemList v-model="dataForm.acceptances" name="acceptances"
                        :show-errors="submitAttempted">
                        <BizShareInputMultiCheckbox v-model="checkboxModel" heading="ผู้ถูกแก้ไขข้อมูล"
                            :data="data?.employeeList?.approval" flow="edit" />
                    </BizShareValidateItemList>
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
const manaLib = await getManaContext();
const _data = usePayrollStore();
const { data, pending } = storeToRefs(_data);
const { postSubmitConsentData, getData } = _data;

getData("get-consent-edit-employee-list").then(async () => {

});
const validationRules = z.object({
    acceptances: z.array(z.string())
});

type Schema = z.output<typeof validationRules>;

const dataForm = ref({
    acceptances: [] as string[]
});

// Computed model that maps the checkbox component value to an array of ids
const checkboxModel = computed<string[]>({
    get() {
        return dataForm.value.acceptances;
    },
    set(val: string[]) {
        dataForm.value.acceptances = val || [];
    },
});

const submitAttempted = ref(false);

const baImage = computed(() => {
    return manaLib.getUrl(data.value?.baInfo?.logoHost, data.value?.baInfo?.logoPath) || "https://failfast.blob.core.windows.net/mcontent-imgs/defaults/dfshop.png";
});

const consentDate = computed(() => {
    return manaLib.getDateText(data?.value?.createdDate);
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
    submitAttempted.value = true;
    if (!dataForm.value.acceptances || dataForm.value.acceptances.length === 0)
        return;
    if (event.data) {
        var formdata = {
            Acceptances: dataForm.value.acceptances
        };
        //   externalAccountId: event.data.externalAccountId,
        //   currency: event.data.currency,
        //   amount: parseFloat(event.data.amount),
        await postSubmitConsentData(formdata, "post-consent-edit-employee-list", data.value.serviceSubscriptionId);
    }
}
</script>
