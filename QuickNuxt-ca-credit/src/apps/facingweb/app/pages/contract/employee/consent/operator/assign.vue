<template>
    <div v-if="pending">
        <BizShareSkeletonList />
    </div>
    <div v-else>
        <MuiPage>
            <MuiHeader title="คำขออนุมัติเปลี่ยนแปลงโอเปอเรเตอร์" />
            <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">
                <MuiCard>
                    <BizSharePartyHero :src="baImage" :title="data?.baInfo?.name" :subtitle="consentDate" />
                </MuiCard>
                <MuiCard>
                    <BizShareValidateItemList v-model="dataForm.operatorNewSelected" name="operatorNewSelected"
                        :show-errors="submitAttempted">
                        <BizShareInputMultiCheckbox v-model="operatorNewCheckboxModel"
                            heading="ผู้ถูกแต่งตั้งเป็นโอเปอเรเตอร์" :data="data.operatorNew" flow="assignoperator" />
                    </BizShareValidateItemList>
                </MuiCard>
                <MuiCard>
                    <BizShareValidateItemList v-model="dataForm.operatorOldSelected" name="operatorOldSelected"
                        :show-errors="submitAttempted">
                        <BizShareInputMultiCheckbox v-model="operatorOldCheckboxModel"
                            heading="ผู้ถูกยกเลิกการเป็นโอเปอเรเตอร์" :data="data.operatorOld" flow="assignoperator" />
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

getData("get-consent-change-operator").then(async () => {

});

const baImage = computed(() => {
    return manaLib.getUrl(data.value?.baInfo?.logoHost, data.value?.baInfo?.logoPath) || "https://failfast.blob.core.windows.net/mcontent-imgs/defaults/dfshop.png";
});

const consentDate = computed(() => {
    return manaLib.getDateText(data?.value?.createdDate);
});

const validationRules = z.object({
    operatorOldSelected: z.array(z.string()),
    operatorNewSelected: z.array(z.string()),
    acceptances: z.string()
});


type Schema = z.output<typeof validationRules>;

const dataForm = ref({
    operatorOldSelected: [] as string[],
    operatorNewSelected: [] as string[],
    acceptances: ""
});


// Computed model that maps the checkbox component value to an array of ids
const operatorOldCheckboxModel = computed<string[]>({
    get() {
        return dataForm.value.operatorOldSelected;
    },
    set(val: string[]) {
        dataForm.value.operatorOldSelected = val || [];
    },
});


const operatorNewCheckboxModel = computed<string[]>({
    get() {
        return dataForm.value.operatorNewSelected;
    },
    set(val: string[]) {
        dataForm.value.operatorNewSelected = val || [];
    },
});
const submitAttempted = ref(false);

async function onSubmit(event: FormSubmitEvent<Schema>) {
    submitAttempted.value = true;
    console.log("onSubmit", dataForm.value); // will be array of ids
    // basic guard: if empty, don't proceed
    if ((!dataForm.value.operatorOldSelected || dataForm.value.operatorOldSelected.length === 0) && (!dataForm.value.operatorNewSelected || dataForm.value.operatorNewSelected.length === 0))
        return;

    if (event.data) {
        var formdata = {
            OperatorOld: dataForm.value.operatorOldSelected,
            OperatorNew: dataForm.value.operatorNewSelected,
            Acceptances: [dataForm.value.acceptances]
        };
        await postSubmitConsentData(formdata, "post-consent-change-operator", data.value.serviceSubscriptionId);
    }
}
</script>
