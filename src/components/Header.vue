<template>
	<div id="topbar">
		<div id="logo">YC</div>
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
						{{ shortWalletAddress }}</span
					>
					<span @click="userLogout()"> Logout </span>
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

export default {
	name: "Header",
	components: {},
	props: ["wallet"],
	data() {
		return {
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
		connectWallet() {
			/* TODO:
				- This button is supposed to be generic. hence, push this method to root
				- Login Flow
				- Portis: DONE
				- Metamask: NOT YET
			*/
			const web3 = new Web3(this.portis.provider);
			web3.eth.getAccounts((error, accounts) => {
				console.log(accounts);
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
	color: #ffffff;
	font-size: 16px;
	/* margin: -2px -2px 0 0; */
	border-radius: 16px;
	cursor: pointer;
}
</style>
