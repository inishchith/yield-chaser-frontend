<template>
  <div id="topbar">
    <div id="logo"> YC </div>
    <div id="links">
        <ul>
            <li><a href="https://github.com/"> Github </a></li>
            <li> {{ wallet.id }}</li>
            <li> <Button text="Connect Wallet"/> </li>
        </ul>
    </div>
    </div>
</template>

<script>
import Button from './Button.vue'

export default {
    name: "Header",
    props: ['wallet'],
    components: {
        Button
    }
}
</script>

<style scoped>

</style>