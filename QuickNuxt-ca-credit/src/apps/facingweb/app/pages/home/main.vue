<template>
  <div v-if="loading">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage>
      <!-- <MuiHeader title="Home" /> -->
      <BizHomeShortcutMenu :data="shortcutItems" @on-tapped="visitEndpoint" />
      <BizHomeFeedMenu :data="feedItems" @on-tapped="visitEndpoint" />
    </MuiPage>
  </div>
</template>

<style scoped>
div:last-of-type {
  @apply mb-6
}
</style>

<script setup lang="ts">
import { getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const { goVisit, goVisitWithEndpoint } = useManaService();
const loading = ref<boolean>(true);
const data = ref<any>();
(<any>window).getFeed = (rsp: any) => {
  data.value = rsp;
  loading.value = false;
};
(<any>window).isReady = () => { return true };

const shortcutItems = computed(() => {
  if (!data.value || !data.value[1]) {
    return null;
  }

  return data.value[1].map((it: any) => {
    return {
      name: it.title,
      src: it.logoUrl,
      endpointUrl: it.endpointUrl,
      noti: it.isAlert,
      subscriptionId: it.subscriptionId
    }
  });
});

const feedItems = computed(() => {
  if (!data.value || !data.value[0]) {
    return null;
  }

  let feeds = [];
  let isOldArchitecture = data.value[0].update && data.value[0].seemore && data.value[0].update.feeds && data.value[0].seemore.feeds;
  if (isOldArchitecture) {
    feeds = data.value[0].update?.feeds.concat(data.value[0].seemore?.feeds);
  }
  else {
    feeds = data.value[0];
  }

  return feeds.map((it: any) => {
    return {
      id: it.id,
      title: it.messages[0].title,
      description: it.messages[0].description,
      src: it.messages[0].thumbnailImageUrl,
      expirationDate: it.expirationDate,
      endpointId: it.endpointId,
      endpointUrl: it.endpointUrl,
      status: it.status,
      subscriptionId: it.subscriptionId
    }
  });
})

const visitEndpoint = (item: any) => {

  if (item.endpointUrl) {

    let isNewArchitecture = item.subscriptionId;
    if (isNewArchitecture) {

      const { flowId, endpointId: endpointIdFromUrl } = getDataFromUrl(item.endpointUrl)
      let endpointId = item.endpointId ?? endpointIdFromUrl;

      goVisit(item.subscriptionId, flowId, endpointId);
    }
    else {
      let endpoint = item.endpointUrl.replace(/\//g, "_");
      goVisitWithEndpoint(endpoint);
    }
  }

};

const getDataFromUrl = (url: string) => {

  let flowId = "";
  let endpointId = "";

  if (url && url.includes('?')) {

    var splited = url.split('/');
    var splited2 = splited[splited.length - 1].split('?');

    flowId = splited2[0];
    endpointId = splited2[1].split('endpointid=')[1];
  }

  return { flowId, endpointId }
}
</script>
