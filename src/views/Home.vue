<template>
	<div id="container">
		<c-box m=auto max-w="40rem">
			<c-heading mb="4">Yield Chaser</c-heading>
			<c-text font-size="xl">
				EPNS based notification service to keep track with best yield farms out there with assets of your choice
			</c-text>
		</c-box>
		<Selector
			:assets="assets"
			@toggle-asset="toggelAsset"
			@remove-asset="removeAsset"/>
		<br />
		<span v-if="!isSubscribed">
			<c-button
				:is-loading="isSubActionLoading"
				:is-disabled="isSubDisabled"
				right-icon="arrow-forward"
				size="md"
				height="50px"
				width="60vh"
				variant-color="vue"
				variant="solid"
				@click="confirmSubscribe">
				Subscribe to channel
			</c-button>
		</span>
		<span v-else>
			<c-button-group :spacing="6">
				<c-button
					:is-loading="isSubActionLoading"
					:is-disabled="isSubDisabled"
					size="md"
					height="50px"
					width="28vh"
					variant-color="vue"
					variant="solid"
					@click="confirmSubscribe">
					Update assets
				</c-button>
				<c-button
					:is-loading="isUnsubActionLoading"
					:is-disabled="isUnsubDisabled"
					size="md"
					height="50px"
					width="28vh"
					variant-color="red"
					variant="solid"
					@click="confirmUnsubscribe">
					Unsubscribe to channel
				</c-button>
			</c-button-group>
		</span>
	</div>
</template>

<script>
import Selector from "@/components/Selector.vue";
import {
	CButton,
	CButtonGroup,
	CHeading,
	CText,
	CBox
} from "@chakra-ui/vue";

export default {
	name: "Home",
	components: {
		Selector,
		CButton,
		CHeading,
		CText,
		CBox,
		CButtonGroup
	},
	data() {
		return {
			isSubscribed: false,
			isSubActionLoading: false,
			isUnsubActionLoading: false,
			isSubDisabled: false,
			isUnsubDisabled: false,
			assets: {},
		};
	},
	computed: {},
	async created() {
		this.assets = this.$web2Utils.getSupportedAssets();
	},
	async mounted() {
		await this.setSubscribedAssets();
		let that = this;
		this.$root.$on('setSubscriptions', async () => {
			await that.setSubscribedAssets();
		});
		this.$root.$on('releaseSubscriptions', () => {
			that.isSubscribed = false;
			that.assets = this.$web2Utils.getSupportedAssets();
		});
	},
	methods: {
		async setSubscribedAssets() {
			if (this.$web3Utils.isUserLoggedIn()) {
				var result = await this.$web2Utils.isSubscribed(this.$web3Utils.getWalletAddress());
				this.isSubscribed = result.status;
				if (result.status) {
					for(const _key of result.assets) {
						this.assets[_key].selected = true;
					}
				}
			}
		},
		async confirmSubscribe() {
			this.isSubActionLoading = true;
			if (!this.$web3Utils.isUserLoggedIn()) {
				this.isSubActionLoading = false;
				this.$toast({
					title: "Connect your wallet",
					status: "error",
					duration: 2000,
					position: "bottom-left",
					isClosable: false,
				});
				return;
			}

			let selectedAssets = [];

			for(const _key of Object.keys(this.assets)) {
				if (this.assets[_key].selected) selectedAssets.push(_key);
			}

			let status = await this.$web2Utils.subscribe(
				selectedAssets,
				this.$web3Utils.getWalletAddress()
			);
			console.debug(status);

			if(!this.isSubscribed) {
				let receipt = await this.$web3Utils.subscribe();
				this.notify(receipt);
			}

			this.isSubActionLoading = false;
			if(status) {
				this.$router.push(
					{
						name: "Update",
						params: {
							title: "Subscribed successfully",
							status: true,
							icon: "check-circle",
						}
					}
				)
			}
		},
		// TODO: Update assets call
		updateAssets() {
			this.$toast({
				title: "Changes Saved",
				status: "success",
				duration: 2000,
				position: "bottom-left",
				isClosable: false,
			});
		},
		async confirmUnsubscribe() {
			this.isUnsubActionLoading = true;
			console.debug(this.assets);
			let status = await this.$web2Utils.unsubscribe(this.$web3Utils.getWalletAddress());
			console.debug(status);
			let result = await this.$web3Utils.unsubscribe();
			this.notify(result);

			this.isUnsubActionLoading = false;
			this.$router.push(
				{
					name: "Update",
					params: {
						title: "Unsubscribed successfully",
						status: false,
						icon: "exclamation",
					}
				}
			)
		},
		notify(result) {
			// TODO:
			// - Add is logged in | subscribe button disabled
			// - Add loading button for Txn

			console.info(result);
			if (result.status) {
				this.$toast({
					title: "Subscribed!",
					description: "message which is intentionally happy sounding lol",
					status: "success",
					duration: 4000,
					position: "bottom-left",
					isClosable: true,
				});
			} else {
				this.$toast({
					title: "Something went wrong",
					description: `https://ropsten.etherscan.io/tx/${result.receipt["transactionHash"]}`,
					status: "error",
					duration: 4000,
					position: "bottom-left",
					isClosable: true,
				});
			}
		},
		removeAsset(_asset) {
			this.$toast({
				title: "Asset Removed",
				description: `Removed ${_asset.name} from selection`,
				status: "error",
				duration: 2000,
				isClosable: true,
			});

			this.assets = this.assets.filter((asset) => asset.id !== _asset.id);
		},
		toggelAsset(_asset_key) {
			if (this.assets[_asset_key].selected) {
				this.$toast({
					title: "Asset Removed",
					description: `Removed ${_asset_key} from selection`,
					status: "error",
					duration: 2000,
					position: "bottom-left",
					isClosable: true,
				});
			} else {
				this.$toast({
					title: "Asset Added",
					description: `Added ${_asset_key} to selection`,
					status: "success",
					duration: 2000,
					position: "bottom-left",
					isClosable: true,
				});
			}

			this.assets[_asset_key].selected = !this.assets[_asset_key].selected;
			// _asset.selected = !_asset.selected;

			// this.assets = this.assets.map((asset) =>
			//   asset.id === assetId ? { ...asset, selected: !asset.selected } : asset
			// );
			// this.assets[assetId - 1].selected = !this.assets[assetId - 1].selected
		},
	},
};
</script>
