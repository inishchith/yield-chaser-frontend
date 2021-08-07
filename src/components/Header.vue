<template>
	<div id="topbar">
		<c-image
			id="logo"
			size="60px"
			objectFit="contain"
			:src="require('@/assets/yc_logo.png')"
			alt="Yield Chaser"
		/>
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
				</li>
				<li v-if="isUserLoggedIn == true">
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
import { CImage } from "@chakra-ui/vue";

export default {
	name: "Header",
	props: ["wallet"],
	components: {
		CImage
	},
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
		if (status) this.userLogin();
	},
	mounted() {},
	methods: {
		async connectWallet() {
			let status = await this.$web3Utils.login();
			if (status) this.userLogin();
		},
		showUserWallet() {
			this.$web3Utils.openWallet();
		},
		userLogout() {
			this.isUserLoggedIn = false;
			this.$root.$emit('releaseSubscriptions');
			this.$web3Utils.logout();
		},
		userLogin() {
			this.walletAddress = this.$web3Utils.getWalletAddress();
			this.isUserLoggedIn = true;
			this.$root.$emit('setSubscriptions');
		}
	},
};
</script>

<style scoped>
#highlight {
	position: relative;
	font-size: 16px;
	text-align: center;
	justify-content: center;
	padding: 8px;
	border-radius: 8px;
	background-color: var(--def-color);
}

#highlight:hover {
	color: var(--link-text);
	font-size: 16px;
	border-radius: 8px;
}
</style>
