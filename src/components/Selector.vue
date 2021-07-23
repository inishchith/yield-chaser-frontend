<template>
    <div id="asset-bar">
        <span @click="removeChip()"> Remove </span>
        <div :key="asset.id" v-for="asset in assets">
            <h1> {{ asset.name }} </h1>
        </div>
    </div>
</template>

<script>
export default {
    name: "Selector",
    props: ["assets"],
    created() {
        console.log("Selector")
    },
    methods: {
        removeChip() {
            this.$emit('remove-prop');
        }
    }
}
</script>

<style scoped>
#asset-bar {
    position: absolute;
    text-align: center;
    justify-content: center;
    width: 100%;
}
</style>