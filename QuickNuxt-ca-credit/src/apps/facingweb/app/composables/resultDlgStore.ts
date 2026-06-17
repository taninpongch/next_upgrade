import { defineStore } from "pinia";
import { getManaContext, getMagicKey } from "@manaapp/ui";

export const useResultDlgStore = defineStore('resultDlg', () => {
  var rspUrl = ref("");
  const magicKey = ref("");
  const { data, error, pending, execute: executeGet } = useMFetch<any>(rspUrl, { method: "GET", headers: { "Accept": "application/json" }});

  async function getData() {
    const lib = await getManaContext();
    magicKey.value = await getMagicKey();
    rspUrl.value = lib.getUrl(`api/self/contracts/self`);
    await executeGet();
    console.log("datadata", data);
  }

  return { data, getData }
})