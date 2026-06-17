import { defineStore } from "pinia";
import { getManaContext } from "@manaapp/ui";

export const useJergunStore = defineStore('jergunStore', () => {
  const _subscriptionId = "jergun";

  var getUrl = ref("");
  const { data: dataJergun, error: errorMsg, pending, execute: executeGet } = useMFetch<any>(getUrl, { method: "GET", headers: { "Accept": "application/json" } });

  var postUrl = ref("");
  const postFormData = ref<any>({});
  const { execute: executePost } = useMFetch<any>(postUrl, { method: "POST", headers: { "Accept": "application/json" }, body: postFormData });

  async function getData(pathParam: string, subscriptionParam?: string) {
    const lib = await getManaContext();
    let subscriptionId = subscriptionParam ? subscriptionParam : _subscriptionId;
    getUrl.value = lib.getUrl(`api/subscriptions/${subscriptionId}/contracts/default/${pathParam}`);
    console.log("URL", getUrl.value);

    await executeGet();
  }

  // TODO: code review อีกที
  async function getOptionDialogSelection() {
    const lib = await getManaContext();
    dataJergun.value = await lib.getDefaultSelection();
  }

  async function postSubmitConsentData(formData: any, pathParam: string, subscriptionParam?: string) {
    const lib = await getManaContext();
    let subscriptionId = subscriptionParam ? subscriptionParam : _subscriptionId;
    postUrl.value = lib.getUrl(`api/subscriptions/${subscriptionId}/consent/default/${pathParam}`);
    postFormData.value = formData;
    await executePost();
  }

  async function postData(formData: any, pathParam: string, subscriptionParam?: string) {
    const lib = await getManaContext();
    let subscriptionId = subscriptionParam ? subscriptionParam : _subscriptionId;
    postUrl.value = lib.getUrl(`api/subscriptions/${subscriptionId}/contracts/default/${pathParam}`);
    postFormData.value = formData;
    await executePost();
  }

  async function postOptionSelect(formData: any) {
    console.log("postOptionSelect-formData", formData);
    const lib = await getManaContext();
    postUrl.value = lib.getUrl(`api/self/contracts/self`);
    postFormData.value = formData;
    await executePost();
    console.log("DonePostOptionSelect");

  }


  return {
    getData,
    postSubmitConsentData,
    postData,
    postOptionSelect,
    getOptionDialogSelection,
    pending,
    dataJergun
  }
})