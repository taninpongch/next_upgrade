<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        title: string,
        image: string,
        ckeckList?: any[]
    }>(), {}
)
const items = [
    props.image
];
const types: any = {
    done: {
        icon: 'i-lets-icons-check-fill',
        color: 'text-blue-500'
    },
    going: {
        icon: 'i-lets-icons-check-fill',
        color: 'text-gray-500'
    }
}
const links = [{
    label: 'สแกนบัตรประชาชน',
    type: 'done'
}, {
    label: 'กรอกข้อมูล',
    type: 'going'
}]

</script>

<template>
    <UCard>
        <UFormGroup :label="title">
            <UCarousel v-slot="{ item }" :items="items" :ui="{ item: 'basis-full' }"
                class="w-64 mx-auto rounded-lg overflow-hidden">
                <img :src="item" class="w-full" draggable="false">
            </UCarousel>
            <UVerticalNavigation :links="links" :ui="{ wrapper: 'truncate' }">
                <template #icon="{ link }">
                    <UIcon v-if="link.type" :name="types[link.type].icon" :class="types[link.type].color"
                        class="text-base" />
                    <UIcon v-else :name="types.default.icon" :class="types.default.color" class="text-base" />
                </template>
            </UVerticalNavigation>
        </UFormGroup>
    </UCard>
</template>