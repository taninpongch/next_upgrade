import { defineStore } from "pinia";
import { getManaContext } from "@manaapp/ui";

export const useKycStore = defineStore('kycStore', () => {
  const subscriptionId = "kyc";
  var getUrl = ref("");
  const { data: datakyc, error: errorMsg, pending, execute: executeGet } = useMFetch<any>(getUrl, { method: "GET", headers: { "Accept": "application/json" } });
  const { data: dataphone, execute: executeGetPhone } = useMFetch<any>(getUrl, { method: "GET", headers: { "Accept": "application/json" } });

  var postUrl = ref("");
  const postFormData = ref<any>();
  const { execute: executePost } = useMFetch<any>(postUrl, { method: "POST", headers: { "Accept": "application/json" }, body: postFormData });

  async function getData(pathParam: string) {
    const lib = await getManaContext();
    getUrl.value = lib.getUrl(`api/subscriptions/${subscriptionId}/contracts/default/${pathParam}`);
    await executeGet();
  }

  async function getDataCheckVerifyPhone(pathParam: string) {
    const lib = await getManaContext();
    getUrl.value = lib.getUrl(`api/subscriptions/${subscriptionId}/contracts/default/${pathParam}`);
    await executeGetPhone();
  }

  async function postData(formData: any, pathParam: string) {
    const lib = await getManaContext();
    postUrl.value = lib.getUrl(`api/subscriptions/${subscriptionId}/contracts/default/${pathParam}`);
    postFormData.value = formData;
    await executePost();
  }

  async function postSubmitConsentData(formData: any, pathParam: string) {
    const lib = await getManaContext();
    postUrl.value = lib.getUrl(`api/subscriptions/${subscriptionId}/consent/default/${pathParam}`);
    postFormData.value = formData;
    await executePost();
  }

  const getAddress = (addressData: any) => {
    if (addressData) {
      return `${addressData.line1} ${addressData.district} ${addressData.amphoe} ${addressData.province} ${addressData.zipcode} หมายเหตุ ${addressData.remark ? addressData.remark : "-"}`
    }
    else {
      return 'คุณยังไม่ระบุ';
    }
  }

  var dataLocal = ref();
  async function getOptionDialogSelection() {
    const lib = await getManaContext();
    dataLocal.value = await lib.getDefaultSelection();
    console.log("dataLocal.value", dataLocal.value);
  }

  async function postOptionSelect(formData: any) {
    const lib = await getManaContext();
    postUrl.value = lib.getUrl(`api/self/contracts/self`);
    postFormData.value = formData;
    await executePost();
  }

  return {
    postData, getData, errorMsg, pending, datakyc, subscriptionId, getAddress, postSubmitConsentData,
    getOptionDialogSelection, dataLocal, postOptionSelect, getDataCheckVerifyPhone, dataphone
  }
})
