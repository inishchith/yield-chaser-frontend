<template>
    <div id="asset-bar">
        <div :key="asset.id" v-for="asset in assets">
            <span
                @click="$emit('deselect-asset', asset.id)"
                :class="[asset.selected ? 'selected': '',]">
                {{ asset.name }}
            </span>
            <span @click="$emit('remove-asset', asset.id)" :class="[asset.selected ? 'selected': '',]"> X </span>
        </div>
    </div>
</template>

<script>
export default {
    name: "Selector",
    props: ["assets"],
    created() {},
    methods: {}
}
</script>

<style scoped>

.selected {
    color: grey;
}

#asset-bar {
    position: absolute;
    text-align: center;
    justify-content: center;
    width: 100%;
}
</style>