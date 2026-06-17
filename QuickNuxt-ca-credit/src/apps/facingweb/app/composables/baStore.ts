import { defineStore } from "pinia";
import { getManaContext } from "@manaapp/ui";

export const useBAStore = defineStore('baStore', () => {
  const subscriptionId = "ba";
  var getUrl = ref("");
  const { data, error: errorMsg, pending, execute: executeGet } = useMFetch<any>(getUrl, { method: "GET", headers: { "Accept": "application/json"}});
  const { data: dataBankAcc, execute: executeGetBankAcc } = useMFetch<any>(getUrl, { method: "GET", headers: { "Accept": "application/json"} });

  var postUrl = ref("");
  const postFormData = ref<any>();
  const { execute: executePost } = useMFetch<any>(postUrl, { method: "POST", headers: { "Accept": "application/json"}, body: postFormData} );

  async function getData(pathParam: string) {
    const lib = await getManaContext();
    getUrl.value = lib.getUrl(`api/subscriptions/${subscriptionId}/contracts/default/${pathParam}`);
    await executeGet();
  }

  async function postData(formData: any, pathParam: string) {
    const lib = await getManaContext();
    postUrl.value = lib.getUrl(`api/subscriptions/${subscriptionId}/contracts/default/${pathParam}`);
    postFormData.value = formData;
    await executePost();
  }

  async function postOptionSelect(formData: any) {
    const lib = await getManaContext();
    postUrl.value = lib.getUrl(`api/self/contracts/self`);
    postFormData.value = formData;
    await executePost();
  }

  var dataLocal = ref();
  async function getOptionDialogSelection() {
    const lib = await getManaContext();
    dataLocal.value = await lib.getDefaultSelection();
  }

  async function getDataCheckBankAcc(pathParam: string, endpointId: string) {
    const lib = await getManaContext();
    getUrl.value = lib.getUrl(`api/subscriptions/${subscriptionId}/contracts/default/${pathParam}?endpointId=${endpointId}`);
    await executeGetBankAcc();
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

  return {
    data,
    dataLocal,
    errorMsg,
    pending,
    subscriptionId,
    dataBankAcc,
    getDataCheckBankAcc,
    getData,
    postData,
    postOptionSelect,
    getOptionDialogSelection,
    postSubmitConsentData,
    getAddress
  }
})