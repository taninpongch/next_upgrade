import { defineStore } from "pinia";
import { getManaContext } from "@manaapp/ui";

export const useNexumStore = defineStore('nexumStore', () => {

  const subscriptionId = "nexum";

  var getUrl = ref("");
  const { data, error: errorMsg, pending, execute: executeGet } = useMFetch<any>(getUrl, { method: "GET", headers: { "Accept": "application/json" } });

  var postUrl = ref("");
  var postFormData = ref<any>({});
  const { execute: executePost } = useMFetch<any>(postUrl, { method: "POST", headers: { "Accept": "application/json" }, body: postFormData });
  async function getData(pathParam: string) {
    const lib = await getManaContext();
    getUrl.value = lib.getUrl(`api/self/contracts/default/${pathParam}`);
    await executeGet();
  }
  async function postData(formData: any, pathParam: string) {
    const lib = await getManaContext();
    postUrl.value = lib.getUrl(`api/self/contracts/default/${pathParam}`);
    postFormData.value = formData;
    await executePost();
  }

  async function postSubmitConsentData(formData: any, pathParam: string, pageSubscriptionId?: string) {
    const lib = await getManaContext();
    var subscriptionIdToUse = pageSubscriptionId ? pageSubscriptionId : subscriptionId;
    postUrl.value = lib.getUrl(`api/subscriptions/${subscriptionIdToUse}/consent/default/${pathParam}`);
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
    postData,
    postOptionSelect,
    postSubmitConsentData,
    data,
    pending
  }
})