<template>
  <span @click="connectWallet()" id="login"> {{ text }} </span>
</template>

<script>
import Portis from "@portis/web3";
import Web3 from "web3";
export default {
    name: "Button",
    props: ["text"],
    methods: {
        connectWallet() {
            /* TODO:
                - This button is supposed to be generic. hence, push this method to root
                - Portis: DONE
                - Metamask: NOT YET
            */
            const portis = new Portis('DAPP_ID', 'mainnet');
            const web3 = new Web3(portis.provider);
            web3.eth.getAccounts((error, accounts) => {
                console.log(accounts);
            });
        }
    }
}
</script>

<style scoped>
#login {
    position: relative;
    font-size: 16px;
    text-align: center;
    justify-content: center;
    padding: 10px;
    border-radius: 12px;
    background-color: #1A2735;
}
#login:hover {
    color: #ffffff;
    font-size: 16px;
    /* margin: -2px -2px 0 0; */
    border-radius: 16px;
    cursor: pointer;
}
</style>