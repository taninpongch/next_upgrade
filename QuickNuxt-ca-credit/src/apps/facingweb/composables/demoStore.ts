import { defineStore } from "pinia";
import { getManaContext } from "@manaapp/ui";

export const useDemoStore = defineStore('demoStore', () => {
  const subscriptionId = "";
  var getUrl = ref("https://jsonplaceholder.typicode.com/todos/1");
  const { data: demoData, error: errorMsg, pending, execute: executeGet } = useMFetch(getUrl, { method: "GET", headers: { "Accept": "application/json" } });

  var postUrl = ref("");
  const postFormData = ref<any>();
  const { execute: executePost } = useMFetch(postUrl, { method: "POST", headers: { "Accept": "application/json" }, body: postFormData });

  async function getData(pathParam: string) {
    const lib = await getManaContext();
    // getUrl.value = lib.getUrl(`api/subscriptions/${subscriptionParam}/contracts/default/${pathParam}`);
    await executeGet();
  }

  async function postData(formData: any, pathParam: string) {
    const lib = await getManaContext();
    getUrl.value = lib.getUrl(`api/subscriptions/${subscriptionId}/contracts/default/${pathParam}`);
    postFormData.value = formData;
    await executePost();
  }

  return {
    postData, demoData, getData, errorMsg, pending
  }
})
