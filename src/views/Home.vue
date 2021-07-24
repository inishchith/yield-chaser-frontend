<template>
    <Selector @deselect-asset="deselectAsset" @remove-asset="removeAsset" :assets="assets"/>
    <div id="container">
        <div id="product-title"> Welcome </div>
    <!-- <div v-on:click="logout()" id="login">Logout</div> -->
    </div>

</template>

<script>

import Selector from '../components/Selector.vue'

export default {
    name: "Home",
    data() {
        return {
            assets: [
                {
                    id: 1,
                    name: "BTC",
                    selected: true,
                },
                {
                    id: 2,
                    name: "ETH",
                    selected: false,
                },
                {
                    id: 3,
                    name: "MATIC",
                    selected: true,
                },
                {
                    id: 4,
                    name: "DOGE",
                    selected: false,
                },
            ]
        }
    },
    components: {
        Selector
    },
    created() {

    },
    methods: {
        removeAsset(assetId) {
        // this.assets.pop(assetId);
        this.assets = this.assets.filter((asset) => asset.id !== assetId)
        },
        deselectAsset(assetId) {
        this.assets = this.assets.map(
            (asset) => asset.id === assetId
            ? {...asset, selected: !asset.selected} : asset
        )
        // this.assets[assetId - 1].selected = !this.assets[assetId - 1].selected
        }
    }
}
</script>

<style>

</style>