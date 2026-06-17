<template>
    <BizSharePartyHero :src="toImage" :title="data.session.toName" :subtitle="data.session.toSubName" />
    <BizNewBillShareTxSummary heading="รายละเอียดธุรกรรม" :data="txsummary" />
</template>

<script setup lang="ts">
import { getManaContext } from "@manaapp/ui";
const lib = await getManaContext();

const props = withDefaults(
    defineProps<{
        data?: any,
    }>(), {}
)

const toImage = computed(() => {
    //TODO: change img path
    let displayLogo = "https://failfast.blob.core.windows.net/mana2018/imgs/dfshop.png";
    if (props.data && props.data?.session && props.data?.session?.toLogoHost && props.data?.session?.toLogoPath) {
        displayLogo = props.data?.session?.toLogoHost == 'icon' ? props.data?.session?.toLogoPath : lib.getUrl(props.data?.session?.toLogoHost, props.data?.session?.toLogoPath);
    }
    else if (props.data && props.data?.session && props.data?.session?.toLogoHost.startsWith("i-")) {
        displayLogo = props.data?.session?.toLogoHost;
    }

    return displayLogo;
})


const txsummary = computed(() => {
    if (props.data?.type == 'CreditBillPayment') {
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
    } else if (props.data?.isReceiver == true && props.data?.type == 'delivery') {
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