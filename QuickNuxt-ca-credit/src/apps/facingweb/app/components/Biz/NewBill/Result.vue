<template>
    <MuiCard>
        <BizNewBillShareUserTransfer :data="data" />
        <BizShareLine />
        <BizNewBillShareInfo :link-ref="linkRef" :link-more="linkMore" :data="data" :src="srcqr"
            :descriptionRemark="data.session.remark" />
    </MuiCard>

    <!-- <BizShareActionLink icon="i-heroicons-clipboard-document-list" label="ดูรายละเอียดธุรกรรม" @on-tapped="navigate" /> -->
</template>

<script setup lang="ts">
import { getManaContext } from "@manaapp/ui";
const lib = await getManaContext();
const { goVisit } = useManaService();

const props = withDefaults(
    defineProps<{
        data: any,
    }>(), {}
)
const linkRef = [{
    label: 'รหัสอ้างอิง',
    value: props.data?.session?.refCode,
}, {
    label: 'วันที่',
    value: lib.getDateText(props.data?.session?.actionDate),
}]

const convertAll = (list: any[]) => {
    if (list == undefined || list == null || list.length == 0) {
        list = [{
            label: '',
            value: '-',
        }]
    }
    return list.map(it => {
        return {
            label: it.name,
            value: it.value,
        }
    });
}

const linkMore = computed(() => convertAll(props.data?.session?.refs));
const srcqr = computed(() => {
    if (props.data == null) {
        return "";
    }
    return lib.getUrl(props.data?.session?.qrUrlHostFqdn, props.data?.session?.qrUrlPath)
})


const navigate = async () => {
    await goVisit("bill", "bill-transactionDetails", props.data?.walletLogId);
}
</script>
