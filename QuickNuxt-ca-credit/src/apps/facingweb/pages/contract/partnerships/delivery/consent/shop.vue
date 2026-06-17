<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage>
      <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">
        <!-- TODO add title -->
        <MuiHeader title="ขออนุญาตทำสัญญา" />
        <MuiCard>
          <BizSharePartyHero :src="fromSrc" :title="data.consentfrom?.name" :subtitle="consentDate" />
        </MuiCard>
        <MuiCard>
          <BizShareItemInfo heading="รายละเอียดสัญญา"
            :title="`ขออนุญาตทำสัญญาให้ร้านของคุณเป็นร้านในเครือ ${data.consentfrom?.name}`" />
          <BizShareListInfoVertical heading="ส่วนแบ่ง Escrow" :infos="displayEscrow" />
          <BizShareItemInfo heading="ข้อมูลการยืนยันตัวตน" title="คุณจำเป็นต้องให้ข้อมูล KYC เพื่อประกอบธุรกิจ" />
        </MuiCard>
        <MuiCard>
          <BizShareSessionTitle label="เลือกร้านค้า" />
          <BizShareValidateItem v-model="dataForm.acceptances" name="acceptances">
            <BizShareItemLink v-if="shopName" :src="displayShopLogo" :title="shopName" @on-tapped="onSelectBA" />
            <BizShareItemLink v-else :src="displayShopLogo" title="คุณยังไม่มีร้าน" />
          </BizShareValidateItem>

          <BizShareSessionTitle label="ที่อยู่ร้านค้า" />
          <BizShareValidateItem v-model="dataForm.checkGpsValidate" name="checkGpsValidate">
            <BizShareItemLink :title="showGpsStatus" @on-tapped="onSelectAddress" />
          </BizShareValidateItem>
        </MuiCard>

        <ConsentButtonsBand accept-app-text="Accept" reject-app-text="Reject" accept-text="Accept" reject-text="Reject"
          :v-model="dataForm.acceptances"></ConsentButtonsBand>
      </BizShareManaForm>
    </MuiPage>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { ConsentButtonsBand, getManaContext } from "@manaapp/ui";
import type { FormSubmitEvent } from "#ui/types";
import { z } from "zod";
const lib = await getManaContext();

const store = useDeliveryStore();
const { data, pending } = storeToRefs(store);
const { getData, postSubmitConsentData } = store;
const selectedShop = ref<any>();
const listInfo = ref<any>([]);
const imgUrlShop = ref();
const shopName = ref();
const consentDate = ref();
const showGpsStatus = ref("ยังไม่ระบุ");
const fromSrc = ref();
const selectedShopLogoHost = ref();
const selectedShopLogoPath = ref();

getData("get-partnerships-delivery-consent-shop").then(async () => {
  consentDate.value = lib.getDateText(data.value?.consentfrom?.createdDate);
  selectedShop.value = data.value?.baList[0];
  selectedShopLogoHost.value = selectedShop?.value?.logoHost;
  selectedShopLogoPath.value = selectedShop?.value?.logoPath;
  dataForm.value.acceptances = selectedShop.value?._id ? selectedShop.value?._id : "";
  dataForm.value.ba = selectedShop.value?._id ? selectedShop.value?._id : "";
  shopName.value = selectedShop?.value?.name;

  if (data.value?.consentfrom?.logoHost && data.value?.consentfrom?.logoPath) {
    fromSrc.value = lib.getUrl(data.value?.consentfrom?.logoHost, data.value?.consentfrom?.logoPath);
  } else {
    fromSrc.value = "https://failfast.blob.core.windows.net/mcontent-imgs/defaults/dfshop.png";
  }

  await lib.setGpsAddress(selectedShop?.value?.address);

  if (selectedShop?.value?.address?.gpsAddress?.gpsLocation?.lat) {
    dataForm.value.checkGpsValidate = "validatePass";
    dataForm.value.bizAddress = {
      name: selectedShop?.value?.address?.name,
      line1: selectedShop?.value?.address?.line1,
      district: selectedShop?.value?.address?.district,
      city: selectedShop?.value?.address?.city,
      province: selectedShop?.value?.address?.province,
      state: selectedShop?.value?.address?.state,
      country: selectedShop?.value?.address?.country,
      postalCode: selectedShop?.value?.address?.postalCode,
      remark: selectedShop?.value?.address?.remark,
      gpsAddress: {
        gpsLocation: {
          lat: selectedShop?.value?.address?.gpsAddress?.gpsLocation?.lat,
          long: selectedShop?.value?.address?.gpsAddress?.gpsLocation?.long
        },
        accuracy: selectedShop?.value?.address?.gpsAddress?.accuracy
      }
    };
    // let address = `${dataForm.value.bizAddress.name} ${dataForm.value.bizAddress.line1} ${dataForm.value.bizAddress.district} ${dataForm.value.bizAddress.city} ${dataForm.value.bizAddress.province} ${dataForm.value.bizAddress.state} ${dataForm.value.bizAddress.country} ${dataForm.value.bizAddress.postalCode}`;
    showGpsStatus.value = "คุณได้ระบุสถานที่ตั้งแล้ว";
  } else {
    dataForm.value.checkGpsValidate = "";
    showGpsStatus.value = "ยังไม่ระบุ";
  }

});

const displayShopLogo = computed(() => {
  if (selectedShopLogoHost.value && selectedShopLogoPath.value) {
    return lib.getUrl(selectedShopLogoHost.value, selectedShopLogoPath.value);
  }
  else {
    return "https://failfast.blob.core.windows.net/mcontent-imgs/defaults/dfshop.png"
  }
});

const displayEscrow = computed(() => {
  return listInfo.value =
    [{
      // label: 'ค่าบริการร้านค้า 10-30% (ปัจจุบัน 30%)',
      label: `Delivery ${data?.value?.deliverySharePercentage} %`,
      src: 'i-heroicons-building-storefront-20-solid',
      value: '',
      status: ''
    }, {
      // label: 'ค่าบริการ Shop 60-70% (ปัจจุบัน 70%) + ค่าส่วนเกิน',
      label: `Shop ${data?.value?.restaurantSharePercentage} %`,
      src: 'i-heroicons-truck-solid',
      value: '',
      status: ''
    }];
});

const validationRules = z.object({
  acceptances: z.string().min(1, "Invalid request"),
  ba: z.string().min(1, "Invalid request"),
  checkGpsValidate: z.string().min(1, "Invalid request"),
});

type Schema = z.output<typeof validationRules>;

const dataForm = ref({
  acceptances: "",
  ba: "",
  bizAddress: {
    name: "",
    line1: "",
    district: "",
    city: "",
    province: "",
    state: "",
    country: "",
    postalCode: "",
    remark: "",
    gpsAddress: {
      gpsLocation: {
        lat: 0,
        long: 0
      },
      accuracy: 0
    }
  },
  checkGpsValidate: ""
});

const onSelectBA = async () => {
  let optionDlgResult = await lib.showOptionDlg("partnerships-delivery-consent-shopSelect", "1btn", JSON.stringify({}), 'close', '', 'f');

  if (optionDlgResult && !optionDlgResult.isCancel) {
    dataForm.value.acceptances = optionDlgResult?.selection.shopId;
    dataForm.value.ba = optionDlgResult?.selection.shopId;
    dataForm.value.bizAddress = optionDlgResult?.selection.shopLocation;
    shopName.value = optionDlgResult?.selection.shopName;
    imgUrlShop.value = optionDlgResult?.selection.shopSrc;
    selectedShopLogoHost.value = optionDlgResult?.selection.shopLogoHost;
    selectedShopLogoPath.value = optionDlgResult?.selection.shopLogoPath;
    if (optionDlgResult?.selection?.shopLocation?.gpsAddress?.gpsLocation?.lat) {
      dataForm.value.checkGpsValidate = "validatePass";
      showGpsStatus.value = "คุณได้ระบุสถานที่ตั้งแล้ว";
      await lib.setGpsAddress(optionDlgResult?.selection.shopLocation);
    } else {
      dataForm.value.checkGpsValidate = "";
      showGpsStatus.value = "ยังไม่ระบุ";
    }
  }
}

const onSelectAddress = async () => {
  let optionDlgResult = await lib.showOptionDlg("set-address", "1btn", JSON.stringify(dataForm.value.bizAddress), "close", 'ok', 'f');

  if (optionDlgResult && !optionDlgResult.isCancel) {
    dataForm.value.checkGpsValidate = "validatePass";
    showGpsStatus.value = "คุณได้ระบุสถานที่ตั้งแล้ว";

    dataForm.value.bizAddress = {
      name: '',
      line1: optionDlgResult?.selection?.line1,
      district: optionDlgResult?.selection?.district,
      city: optionDlgResult?.selection?.amphoe,
      province: optionDlgResult?.selection?.province,
      state: '',
      country: '',
      postalCode: optionDlgResult?.selection?.zipcode,
      remark: optionDlgResult?.selection?.remark,
      gpsAddress: {
        gpsLocation: {
          lat: optionDlgResult?.selection?.gpsAddress?.gpsLocation?.lat,
          long: optionDlgResult?.selection?.gpsAddress?.gpsLocation?.long
        },
        accuracy: optionDlgResult?.selection?.gpsAddress?.accuracy
      }
    }
    await lib.setGpsAddress(dataForm.value.bizAddress);
  }
  else {
    dataForm.value.checkGpsValidate = "";
    showGpsStatus.value = "ยังไม่ระบุ";
  }
};

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (event.data) {
    var formdata = {
      Acceptances: [dataForm.value.acceptances],
      BA: dataForm.value.ba,
      BizAddress: dataForm.value.bizAddress,
    };
    await postSubmitConsentData(formdata, "post-partnerships-delivery-consent-shop");
  }
}

</script>
