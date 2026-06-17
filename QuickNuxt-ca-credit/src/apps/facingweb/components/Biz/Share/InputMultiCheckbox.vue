<template>
  <div class="space-y-2">
    <BizShareSessionTitle v-if="heading" :label="heading" :isBold="true" />
    <div class="divide-y-2 space-y-2 pt-2">
      <BizShareInputCheckbox :modelValue="allSelected" @update:modelValue="onSelectAll" textCheckbox="เลือกทั้งหมด" />
      <div v-for="item in data" :key="item.id" class="pt-4 flex items-center justify-between">
        <BizShareInputCheckbox class="" :modelValue="selectedMap[item.id] === true"
          @update:modelValue="(val) => onItemToggle(item.id, val)" :textCheckbox="item.name ? item.name : 'empty'" />
        <BizShareText v-if="item.endpointId" color="gray" text="เพิ่มเติม" class="text-right "
          @click="navigate(item.endpointId)"></BizShareText>
      </div>
    </div>
    <!-- <UDivider class=" pt-4" /> -->
  </div>
</template>

<script setup lang="ts">
import { getManaContext } from "@manaapp/ui";
const lib = await getManaContext();
import { computed, reactive, ref, watch } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue?: string[];
    heading?: string;
    data?:
    {
      id: string;
      name?: string;
      endpointId?: string;
    }[];
    uuid?: string;
    checkName?: string;
    checkLinkText?: string;
    flow?: string;
  }>(),
  { checkName: "chk" }
);

const emits = defineEmits(["update:modelValue"]);

// map of id -> boolean
const selectedMap = reactive<Record<string, boolean>>({});

// initialize selectedMap from props.modelValue and props.data
function initializeMap() {
  // clear
  Object.keys(selectedMap).forEach((k) => delete selectedMap[k]);
  if (props.data) {
    for (const item of props.data) {
      selectedMap[item.id] =
        Array.isArray(props.modelValue) && props.modelValue.includes(item.id);
    }
  }
}

initializeMap();

watch(
  () => props.modelValue,
  (nv) => {
    if (Array.isArray(nv)) {
      // sync map
      if (props.data) {
        for (const item of props.data) {
          selectedMap[item.id] = nv.includes(item.id);
        }
      }
    }
  }
);

watch(
  () => props.data,
  () => {
    initializeMap();
  }
);

const allSelected = computed<boolean>({
  get() {
    if (!props.data || props.data.length === 0) return false;
    return props.data.every((d) => selectedMap[d.id] === true);
  },
  set(val: boolean) {
    if (!props.data) return;
    for (const d of props.data) selectedMap[d.id] = val;
    // emit updated ids
    const ids = props.data.filter((d) => selectedMap[d.id]).map((d) => d.id);
    emits("update:modelValue", ids);
  },
});

function onSelectAll(val: boolean) {
  allSelected.value = val;
}

function onItemToggle(id: string, val: boolean) {
  selectedMap[id] = !!val;
  // compute selected ids and emit
  const ids = props.data
    ? props.data.filter((d) => selectedMap[d.id]).map((d) => d.id)
    : [];
  emits("update:modelValue", ids);
}

// keep a small uuid generator for potential label 'for' targets (not used by InputCheckbox path)
function generateUuid() {
  if (
    typeof globalThis !== "undefined" &&
    "crypto" in globalThis &&
    typeof (globalThis as any).crypto.randomUUID === "function"
  ) {
    return `inp${(globalThis as any).crypto.randomUUID()}`;
  }
  return `inp${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

const uuidValue = props.uuid || generateUuid();

const navigate = async (linkUrl: string) => {
  if (props.flow == "create") {
    await lib.visit("payroll", `default/consent-employee-create-detail?endpointId=${linkUrl}`)
  } else if (props.flow == "dismiss") {
    await lib.visit("payroll", `default/consent-employee-dismiss-detail?endpointId=${linkUrl}`)
  } else if (props.flow == "edit") {
    await lib.visit("payroll", `default/consent-employee-edit-detail?endpointId=${linkUrl}`)
  } else if (props.flow == "suspend") {
    await lib.visit("payroll", `default/consent-employee-suspend-detail?endpointId=${linkUrl}`)
  } else if (props.flow == "unsuspend") {
    await lib.visit("payroll", `default/consent-employee-unsuspend-detail?endpointId=${linkUrl}`)
  } else if (props.flow == "assignoperator") {
    await lib.visit("payroll", `default/consent-employee-assign-operator-detail?endpointId=${linkUrl}`)
  } else { }
  // TODO use goVisit
  // await lib.visit("payroll", `default/consent-employee-detail?endpointId=${linkUrl}`)

}
</script>
