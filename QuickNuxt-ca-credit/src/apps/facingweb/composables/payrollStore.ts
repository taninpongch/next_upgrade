import { defineStore } from "pinia";
import { getManaContext } from "@manaapp/ui";

export const usePayrollStore = defineStore('payrollStore', () => {
  const subscriptionId = "payroll";

  var getUrl = ref("");
  const { data, error: errorMsg, pending, execute: executeGet } = useMFetch<any>(getUrl, { method: "GET", headers: { "Accept": "application/json" } });

  var postUrl = ref("");
  var postFormData = ref({});
  const { execute: executePost } = useMFetch<any>(postUrl, { method: "POST", headers: { "Accept": "application/json" }, body: postFormData });

  async function getData(pathParam: string) {
    const lib = await getManaContext();
    getUrl.value = lib.getUrl(`api/self/contracts/default/${pathParam}`);
    await executeGet();
  }

  async function postData(data: any, pathParam: string) {
    const lib = await getManaContext();
    postUrl.value = lib.getUrl(`api/self/contracts/default/${pathParam}`);
    postFormData.value = data;
    await executePost();
  }

  async function postSubmitConsentData(formData: any, pathParam: string, subscriptionIdOverride: string = subscriptionId) {
    const lib = await getManaContext();
    postUrl.value = lib.getUrl(`api/subscriptions/${subscriptionIdOverride}/consent/default/${pathParam}`);
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
    pending,
    errorMsg,
    getData,
    postData,
    postSubmitConsentData,
    postOptionSelect
  }
})