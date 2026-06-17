import { defineStore } from "pinia";
import { getManaContext } from "@manaapp/ui";

export const useKymStore = defineStore('kymStore', () => {
  const subscriptionId = "kym";
  var getUrl = ref("");
  const { data, error: errorMsg, pending, execute: executeGet } = useMFetch<any>(getUrl, { method: "GET", headers: { "Accept": "application/json" } });

  var postUrl = ref("");
  const postFormData = ref<any>();
  const { execute: executePost } = useMFetch<any>(postUrl, { method: "POST", headers: { "Accept": "application/json" }, body: postFormData });

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

  return {
    data,
    errorMsg,
    pending,
    subscriptionId,
    getData,
    postData,
    postOptionSelect
  }
})