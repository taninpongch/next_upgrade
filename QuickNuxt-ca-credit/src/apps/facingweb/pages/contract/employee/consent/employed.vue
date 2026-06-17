<template>
    <!-- TODO: implement loading state -->
    <div v-if="pending">
        <BizShareSkeletonList />
    </div>
    <div v-else>
        <MuiPage>
            <MuiHeader title="คำขออนุญาตให้คุณเป็นพนักงาน" />
            <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">
                <MuiCard>
                    <BizSharePartyHero :src="baImage" :title="data?.baInfo?.name" :subtitle="consentDate" />
                </MuiCard>
                <MuiCard>
                    <BizShareItemInfo heading="รายละเอียด"
                        :title="`${data?.baInfo?.name} รับคุณเข้าทำงานตำแหน่ง พนักงานทั่วไป`" />
                </MuiCard>
                <MuiCard>
                    <BizShareItemWalletChange src="i-ion-wallet-outline" heading="เลือกกระเป๋าที่ใช้รับเงิน"
                        :title="dataForm.wallet?.walletName" rightText="" />
                </MuiCard>
                <MuiCard>
                    <BizBAShareInputToggle label="ข้อมูลเพิ่มเติม" textToggle="ขออนุญาตเข้าถึงข้อมูล KYC"
                        v-model="dataForm.reqKYC" :disabled="true" />
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
import { ref, computed } from "vue";
import type { FormSubmitEvent } from "#ui/types";
import { z } from "zod";

const manaLib = await getManaContext();
const Datetime = new Date().toUTCString();
const _data = usePayrollStore();
const { data, pending } = storeToRefs(_data);
const { postSubmitConsentData, getData } = _data;

getData("get-consent-employee-request").then(async () => {
    console.log(data.value);
    dataForm.value.wallet = {
        id: data.value?.wallets[0].id,
        walletName: data.value?.wallets[0]?.walletName,
        balance: manaLib?.toText(data.value?.wallets[0]?.balance),
    };
    console.log(data.value);

});

const onSelectWallet = async () => {
    let optionDlgResult = await manaLib.showOptionDlg("ba-select-wallet", "1btn", JSON.stringify(data.value.wallets), "close", "", "f");
    if (optionDlgResult && !optionDlgResult.isCancel) {
        dataForm.value.wallet = {
            id: optionDlgResult?.selection.id,
            walletName: optionDlgResult?.selection.walletName,
            displayName: data.value.toWalletDisplayName,
            balance: optionDlgResult?.selection.balance
        };
    }
}
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
    reqKYC: true,
    wallet: {} as any,
    acceptances: ""
});


async function onSubmit(event: FormSubmitEvent<Schema>) {
    if (event.data) {
        var formdata = {
            IsKyc: dataForm.value.reqKYC,
            Acceptances: [dataForm.value.acceptances],
        };
        await postSubmitConsentData(formdata, "post-consent-employee-request", data.value.serviceSubscriptionId);
    }
}
</script>
