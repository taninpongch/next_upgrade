import { defineStore } from "pinia";
import { getManaContext, getMagicKey } from "@manaapp/ui";

export const useDeliveryStore = defineStore('deliveryStore', () => {
  const subscriptionId = "delivery";
  var getUrl = ref("");
  const { data, error: errorMsg, pending, execute: executeGet } = useMFetch<any>(getUrl, { method: "GET", headers: { "Accept": "application/json" } });
  const { data: dataSeemore, execute: executeGetSeemore } = useMFetch<any>(getUrl, { method: "GET", headers: { "Accept": "application/json" } });

  var postUrl = ref("");
  const postFormData = ref<any>();
  const { execute: executePost } = useMFetch<any>(postUrl, { method: "POST", headers: { "Accept": "application/json" }, body: postFormData });

  // async function getData(pathParam: string) {
  //   const lib = await getManaContext();
  //   getUrl.value = lib.getUrl(`api/subscriptions/${subscriptionId}/contracts/default/${pathParam}`);
  //   await executeGet();
  // }

  async function getData(pathParam: string) {
    const lib = await getManaContext();
    getUrl.value = lib.getUrl(`api/self/contracts/default/${pathParam}`);
    // getUrl.value = lib.getUrl(`api/subscriptions/${subscriptionId}/contracts/default/${pathParam}`);
    await executeGet();
  }

  async function getDataSeemore(pathParam: string) {
    const lib = await getManaContext();
    getUrl.value = lib.getUrl(`api/self/contracts/default/${pathParam}`);
    // getUrl.value = lib.getUrl(`api/subscriptions/${subscriptionId}/contracts/default/${pathParam}`);
    await executeGetSeemore();
  }

  async function getOptionDialogSelection() {
    const lib = await getManaContext();
    data.value = await lib.getDefaultSelection();
  }

  async function postSubmitConsentData(formData: any, pathParam: string, subscriptionParam?: string) {
    console.log("postFormDataxxx", postFormData);
    const lib = await getManaContext();
    let subscriptionid = subscriptionParam ? subscriptionParam : subscriptionId;
    postFormData.value = formData;
    // postUrl.value = lib.getUrl(`api/subscriptions/${subscriptionId}/consent/default/${pathParam}`);
    // await executePost();
   
    var url = lib.getUrl(`api/subscriptions/${subscriptionid}/consent/default/${pathParam}`);
    console.log("url", url);
    await useFetch(url, { method: "POST", headers: { "Accept": "application/json", 'Magic-Key': getMagicKey() }, body: postFormData.value });
  }

  async function postData(formData: any, pathParam: string, subscriptionParam?: string) {
    const lib = await getManaContext();
    let subscriptionid = subscriptionParam ? subscriptionParam : subscriptionId;
    postUrl.value = lib.getUrl(`api/subscriptions/${subscriptionid}/contracts/default/${pathParam}`);
    // postUrl.value = lib.getUrl(`api/self/contracts/default/${pathParam}`);

    postFormData.value = formData;
    await executePost();
  }

  async function postOptionSelect(formData: any) {
    const lib = await getManaContext();
    postUrl.value = lib.getUrl(`api/self/contracts/self`);
    postFormData.value = formData;
    await executePost();
  }

  return {
    data,
    errorMsg,
    pending,
    getData,
    postData,
    getDataSeemore,
    dataSeemore,
    postSubmitConsentData,
    getOptionDialogSelection,
    postOptionSelect,
  }
})