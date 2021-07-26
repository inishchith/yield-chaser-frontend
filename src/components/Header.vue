<template>
	<div id="topbar">
		<div id="logo"> YC </div>
		<div id="links">
			<ul>
				<li>
					<router-link to="/"> Home </router-link>
				</li>
				<li>
					<router-link to="/about"> About </router-link>
				</li>
				<li v-if="isUserLoggedIn == true">
					<span id="highlight" @click="showUserWallet()">
						{{ shortWalletAddress }}</span>
					<span @click="userLogout()"> Logout </span>
					<span @click="subscribe()"> Subscribe </span>
				</li>
				<li v-else>
					<span id="highlight" @click="connectWallet()"> Connect Wallet </span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import Portis from "@portis/web3";
import Web3 from "web3";
import epnsABI from '@/assets/epnsABI.json';

export default {
	name: "Header",
	props: ["wallet"],
	data() {
		return {
			web3: null,
			portis: null,
			isUserLoggedIn: false,
			walletAddress: null,
		};
	},
	computed: {
		shortWalletAddress() {
			return (
				this.walletAddress.substr(0, 5) + "..." + this.walletAddress.substr(-3)
			);
		},
	},
	created() {
		this.portis = new Portis(
			process.env.VUE_APP_DAPP_ID,
			process.env.VUE_APP_NETWORK
		);
		this.web3 = new Web3(this.portis.provider);
		this.checkUserLoggedIn();
	},
	mounted() {
		let that = this;
		this.portis.onLogin((walletAddress, email, reputation) => {
			console.log("User logged in", walletAddress, email, reputation);
			localStorage.setItem("walletAddress", walletAddress);
			that.setLogin();
		});
		this.portis.onLogout(() => {
			console.log("User logged out");
		});
	},
	methods: {
		subscribe() {
			// TODO: NEED TO CREATE A SINGLETON FOR THIS.

			// const web3 = new Web3(provider);
			// const fromAddress = "0xd4dda0daf5e7e822ff123b1be092415750a8f273";;
			const myContract = new this.web3.eth.Contract(epnsABI, process.env.VUE_APP_CONTRACT_ADDRESS);


			const tx = {
				from: this.walletAddress,
				to: process.env.VUE_APP_CONTRACT_ADDRESS,
				data: myContract.methods.subscribe(process.env.VUE_APP_CHANNEL_ADDRESS).encodeABI()
			};

			const signPromise = this.web3.eth.signTransaction(tx, tx.from);
			let that = this;

			signPromise.then((signedTx) => {
				const sentTx = that.web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);
				sentTx.on("receipt", receipt => {
					console.log(receipt);
					this.$toast({
						title: "Subscribed!",
						description: `Etherscan: nishchith.com`,
						status: "success",
						duration: 2000,
						position: "bottom-left",
						isClosable: true,
					});
				});
				sentTx.on("error", error => {
					console.log(error);
					this.$toast({
						title: "Something went wrong",
						description: `${error.message}`,
						status: "error",
						duration: 2000,
						position: "bottom-left",
						isClosable: true,
					});
				});
			}).catch((error) => {
				this.$toast({
					title: "Something went wrong",
					description: `${error.message}`,
					status: "error",
					duration: 2000,
					position: "bottom-left",
					isClosable: true,
				});
			});
		},
		connectWallet() {
			/* TODO:
				- This button is supposed to be generic. hence, push this method to root
				- Login Flow
				- Portis: DONE
				- Metamask: NOT YET
			*/
			this.web3.eth.getAccounts((error, accounts) => {
				console.log(error, accounts);
			});
		},
		userLogout() {
			console.log("USER LOGOUT");
			this.isUserLoggedIn = false;
			this.portis.logout();
		},
		checkUserLoggedIn() {
			let that = this;
			that.portis.isLoggedIn().then(({ error, result }) => {
				if (result) {
					that.setLogin();
				} else {
					console.log(error);
				}
			});
		},
		showUserWallet() {
			this.portis.showPortis();
		},
		setLogin() {
			this.isUserLoggedIn = true;
			this.walletAddress = localStorage.getItem("walletAddress");
		},
	},
};
</script>

<style scoped>
#highlight {
	position: relative;
	font-size: 16px;
	text-align: center;
	justify-content: center;
	padding: 10px;
	border-radius: 12px;
	background-color: var(--def-color);
}

#highlight:hover {
	font-size: 16px;
	border-radius: 16px;
	cursor: pointer;
}
</style>
