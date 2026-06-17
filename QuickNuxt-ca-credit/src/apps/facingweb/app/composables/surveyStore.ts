import { defineStore } from "pinia";
import { getManaContext } from "@manaapp/ui";

export const useSurveyStore = defineStore('surveyStore', () => {
  const subscriptionId = "survey";

  var getUrl = ref("");
  const { data: dataRefund, error: errorMsg, pending, execute: executeGet } = useMFetch<any>(getUrl, { method: "GET", headers: { "Accept": "application/json" } });

  var postUrl = ref("");
  var postFormData = ref<any>({});
  const { execute: executePost } = useMFetch<any>(postUrl, { method: "POST", headers: { "Accept": "application/json" }, body: postFormData });
  async function postData(formData: any, pathParam: string) {
    const lib = await getManaContext();
    postUrl.value = lib.getUrl(`api/subscriptions/${subscriptionId}/contracts/default/${pathParam}`);
    postFormData.value = formData;
    await executePost();
  }

  return {
    postData,
    pending,
    dataRefund
  }
})