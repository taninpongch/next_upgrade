import { defineStore } from "pinia";
import { getManaContext } from "@manaapp/ui";

export const useWithdrawStore = defineStore('withdrawStore', () => {
  const subscriptionId = "withdraw";

  var getUrl = ref("");
  const { data: dataWithdraw, error: errorMsg, pending, execute: executeGet } = useMFetch<any>(getUrl, { method: "GET", headers: { "Accept": "application/json" }});

  var postUrl = ref("");
  var postFormData = ref({});
  const { execute: executePost } = useMFetch<any>(postUrl, { method: "POST", headers: { "Accept": "application/json" }, body: postFormData});

  async function getData(pathParam: string) {
    const lib = await getManaContext();
    getUrl.value = lib.getUrl(`api/subscriptions/${subscriptionId}/contracts/default/${pathParam}`);
    await executeGet();
  }

  async function postData(data: any, pathParam: string) {
    const lib = await getManaContext();
    postUrl.value = lib.getUrl(`api/subscriptions/${subscriptionId}/contracts/default/${pathParam}`);
    postFormData.value = data;
    await executePost();
  }

  return {
    getData,
    postData,
    pending,
    dataWithdraw
  }
})