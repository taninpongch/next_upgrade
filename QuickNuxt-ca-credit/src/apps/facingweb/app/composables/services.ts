import { getManaContext } from "@manaapp/ui";

export const useManaService = (() => {

  async function goVisit(subscription: string, flow: string, endpointId: string, closeEndppoint?: string) {
    const lib = await getManaContext();
    if (closeEndppoint) {
      lib.visit(subscription, `default/${flow}?endpointId=${endpointId}&closeEndpointId=${closeEndppoint}`)
    }
    else {
      lib.visit(subscription, `default/${flow}?endpointId=${endpointId}`)
    }
  }

  async function getlistbank(banklist: any, id: any) {
    const data = banklist.find((it: any) => it.id == id);
    return data
  }

  async function goVisitWithEndpoint(endpointId: string) {
    const lib = await getManaContext();
    lib.visit(endpointId)
  }

  async function goVisitWithFlow(flow: string) {
    const lib = await getManaContext();
    lib.visit(`default/${flow}`)
  }

  return {
    goVisit, getlistbank, goVisitWithEndpoint, goVisitWithFlow
  }
})