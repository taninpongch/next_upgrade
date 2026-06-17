<template>
    <MuiCard>
        <BizNewBillShareUserTransfer :data="data" />
        <BizShareLine />
        <BizNewBillShareInfo :src="srcqr" :link-ref="linkRef" :link-more="linkMore" :data="data"
            :descriptionRemark="data.session.remark" />
        <BizShareLine />
        <BizNewBillShareTxSummary v-if="data?.type != 'delivery'" heading="รายละเอียดธุรกรรม" :data="txsummary" />
        <!-- TODO: component BizCartProductInfo อาจจะย้ายออกมาเป็นตัว Share -->
    </MuiCard>
    <BizCartProductInfo v-if="data.products.menus && data.products.menus.length > 0" :data="data.products.menus" />

    <BizShareActionLink icon="i-heroicons-clipboard-document-list" label="ใบเสร็จ" @on-tapped="navigate" />
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
    if ((props.data?.type == 'delivery' || props.data?.type == 'deliveryRefund' || props.data?.type == 'deliveryCheckout') && props.data) {
        await goVisit("bill", "bill-delivery-receipt", props.data?.id);
    }
    else if (props.data?.type == 'PaymentGateWayDelivery' && props.data) {
        await goVisit("bill", "bill-financial-receipt", props.data?.id);
    }
    else {
        await goVisit("bill", "bill-receipt", props.data?.session.sessionId);
    }

    // await lib.visit("bill-receipt", 'default/receipt?endpointId=' + props.data?.sessionId);
    // navigateTo('receipt')
}

const txsummary = computed(() => {

    if ((props.data?.isReceiver == true && props.data?.type == 'deliveryRefund') || (props.data?.isReceiver == true && props.data?.type == 'deliveryCheckout')) {
        return [{
            description: 'รวมค่าสินค้า',
            value: lib.toText(props.data?.session?.amount),
        }, {
            description: 'ค่าธรรมเนียม',
            value: lib.toText(props.data?.session?.fee),
        },
        {
            description: 'ค่าจัดส่ง',
            value: lib.toText(props.data?.session?.shippingFee),
        }, {
            description: 'ส่วนลด',
            value: `-${lib.toText(props.data?.session?.discount)}`,
        }, {
            description: 'รวมทั้งหมด',
            value: lib.toText(props.data?.session?.totalAmount),
        }
            // , {
            //     description: ' ',
            //     value: "*รวมทั้งหมด (THB) " + lib.toText(props.data?.session?.amountExchange),
            // }
        ]
    }

    else if (props.data?.type == "CreditBillPayment") {
        return [{
            description: 'จำนวนเงิน',
            value: lib.toText(props.data?.session?.amount),
        }, {
            description: 'ดอกเบี้ย',
            value: lib.toText(props.data?.session?.interest),
        }, {
            description: 'ส่วนลด',
            value: `-${lib.toText(props.data?.session?.discount)}`,
        }, {
            description: 'รวมทั้งหมด',
            value: lib.toText(props.data?.session?.totalAmount),
        }];
    }
    else if (props.data?.isReceiver == true && props.data?.type != 'delivery') {
        return [{
            description: 'จำนวนเงิน',
            value: lib.toText(props.data?.session?.amount),
        }, {
            description: 'ค่าธรรมเนียม',
            value: lib.toText(props.data?.session?.fee),
        }, {
            description: 'ส่วนลด',
            value: `-${lib.toText(props.data?.session?.discount)}`,
        }, {
            description: 'รวมทั้งหมด',
            value: lib.toText(props.data?.session?.totalAmount),
        }];
    }

    else {
        return [{
            description: 'จำนวนเงิน',
            value: lib.toText(props.data?.session?.amount),
        }, {
            description: 'ค่าธรรมเนียม',
            value: lib.toText(props.data?.session?.fee),
        }, {
            description: 'ส่วนลด',
            value: `-${lib.toText(props.data?.session?.discount)}`,
        }, {
            description: 'รวมทั้งหมด',
            value: lib.toText(props.data?.session?.totalAmount),
        }
            // , {
            //     description: ' ',
            //     value: "*รวมทั้งหมด (THB) " + lib.toText(props.data?.session?.amountExchange),
            // }
        ]
    }

})

</script>