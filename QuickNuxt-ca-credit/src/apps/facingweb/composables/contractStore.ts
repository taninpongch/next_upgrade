import { defineStore } from "pinia";
import { getManaContext, getMagicKey } from "@manaapp/ui";

export const useContractStore = defineStore('contractStore', () => {
  const _subscriptionId = "contract";

  var getUrl = ref("");
  const { data: dataContract, error: errorMsg, pending, execute: executeGet } = useMFetch<any>(getUrl, { method: "GET", headers: { "Accept": "application/json" }, immediate: false, watch: false });

  var postUrl = ref("");
  const postFormData = ref<any>({});
  const { execute: executePost } = useMFetch<any>(postUrl, { method: "POST", headers: { "Accept": "application/json" }, body: postFormData, immediate: false, watch: false });
  async function getData(pathParam: string, subscriptionParam?: string) {
    const lib = await getManaContext();
    let subscriptionId = subscriptionParam ? subscriptionParam : _subscriptionId;
    getUrl.value = lib.getUrl(`api/subscriptions/${subscriptionId}/contracts/default/${pathParam}`);
    await executeGet();
  }

  // TODO: code review อีกที
  async function getOptionDialogSelection() {
    const lib = await getManaContext();
    dataContract.value = await lib.getDefaultSelection();
  }

  async function postSubmitConsentData(formData: any, pathParam: string, subscriptionParam?: string) {
    const lib = await getManaContext();
    let subscriptionId = subscriptionParam ? subscriptionParam : _subscriptionId;
    // postUrl.value = lib.getUrl(`api/subscriptions/${subscriptionId}/consent/default/${pathParam}`);
    postFormData.value = formData;
    // await executePost();
    var url = lib.getUrl(`api/subscriptions/${subscriptionId}/consent/default/${pathParam}`);
    await useFetch(url, { method: "POST", headers: { "Accept": "application/json", 'Magic-Key': getMagicKey() }, body: postFormData });
  }

  async function postData(formData: any, pathParam: string, subscriptionParam?: string) {
    const lib = await getManaContext();
    let subscriptionId = subscriptionParam ? subscriptionParam : _subscriptionId;
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


  return {
    getData,
    postSubmitConsentData,
    postData,
    postOptionSelect,
    getOptionDialogSelection,
    pending,
    dataContract
  }
})