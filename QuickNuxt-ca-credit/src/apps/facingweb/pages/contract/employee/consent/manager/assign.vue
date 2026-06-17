<template>
    <div v-if="pending">
        <BizShareSkeletonList />
    </div>
    <div v-else>
        <MuiPage>
            <MuiHeader title="คำขออนุมัติแต่งตั้งผู้จัดการ" />
            <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">
                <MuiCard>
                    <BizSharePartyHero :src="baImage" :title="data?.baInfo?.name" :subtitle="consentDate" />
                </MuiCard>
                <MuiCard>
                    <BizShareItemText title="ผู้ถูกแต่งตั้งเป็นผู้จัดการ" textalign="left" />
                    <BizShareItem :title="data?.managerNew"
                        src="https://failfast.blob.core.windows.net/mcontent-imgs/defaults/dfprofile.png"
                        :transparent="true" class="p-0" />
                    <UDivider class="" />
                    <BizShareItemText title="ผู้จัดการคนปัจจุบัน" :subtitle="data?.managerOld" textalign="left" />
                    <UDivider class="" />
                    <BizShareItemText title="ผู้ดำเนินการ" :subtitle="data?.operator" textalign="left" />

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

getData("get-consent-change-manager").then(async () => {

});

const baImage = computed(() => {
    return manaLib.getUrl(data.value?.baInfo?.logoHost, data.value?.baInfo?.logoPath) || "https://failfast.blob.core.windows.net/mcontent-imgs/defaults/dfshop.png";
});

const consentDate = computed(() => {
    return manaLib.getDateText(data?.value?.createdDate);
});

const validationRules = z.object({
    acceptances: z.string()
});


type Schema = z.output<typeof validationRules>;

const dataForm = ref({
    acceptances: ""
});
async function onSubmit(event: FormSubmitEvent<Schema>) {
    if (event.data) {
        var formdata = {
            Acceptances: [dataForm.value.acceptances]
        };
        await postSubmitConsentData(formdata, "post-consent-change-manager", data.value.serviceSubscriptionId);
    }
}

</script>
