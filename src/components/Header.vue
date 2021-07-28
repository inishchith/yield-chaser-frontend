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
				</li>
				<li v-else>
					<span id="highlight" @click="connectWallet()"> Connect Wallet </span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>

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
	async created() {
		let status = await this.$web3Utils.checkUserLoggedIn();
		if (status) this.setLogin();
	},
	mounted() {},
	methods: {
		async connectWallet() {
			let status = await this.$web3Utils.login();
			if (status) this.setLogin();
		},
		userLogout() {
			this.isUserLoggedIn = false;
			this.$web3Utils.logout();
		},
		showUserWallet() {
			this.$web3Utils.openWallet();
		},
		setLogin() {
			this.walletAddress = localStorage.getItem("walletAddress");
			this.isUserLoggedIn = true;
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
