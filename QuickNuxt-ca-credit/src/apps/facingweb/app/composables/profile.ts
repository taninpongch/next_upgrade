import { defineStore } from "pinia";
import { getManaContext } from "@manaapp/ui";

export const useProfileStore = defineStore('profileStore', () => {
  const subscriptionId = "profile";

  var getUrl = ref("");
  const { data, error: errorMsg, pending, execute: executeGet } = useMFetch<any>(getUrl, { method: "GET", headers: { "Accept": "application/json" } });

  async function getData(pathParam: string) {
    const lib = await getManaContext();
    getUrl.value = lib.getUrl(`api/subscriptions/${subscriptionId}/contracts/default/${pathParam}`);
    await executeGet();
  }

  return {
    data,
    errorMsg,
    pending,
    getData
  }
})