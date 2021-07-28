<template>
	<div id="container">
		<Selector
			:assets="assets"
			@deselect-asset="deselectAsset"
			@remove-asset="removeAsset"/>
		<br />
		<span v-if="!isSubscribed">
			<c-button
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
					size="md"
					height="50px"
					width="28vh"
					variant-color="vue"
					variant="solid"
					@click="updateAssets">
					Update assets
				</c-button>
				<c-button
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
} from "@chakra-ui/vue";

export default {
	name: "Home",
	components: {
		Selector,
		CButton,
		CButtonGroup
	},
	data() {
		return {
			isSubscribed: false,
			assets: [],
		};
	},
	computed: {},
	created() {
		this.assets = this.$web2Utils.getSupportedAssets();
	},
	methods: {
		async confirmSubscribe() {
			if (!this.$web3Utils.isUserLoggedIn()) {
				this.$toast({
					title: "Connect your wallet",
					status: "error",
					duration: 2000,
					position: "bottom-left",
					isClosable: false,
				});
				return;
			}

			console.log(this.assets);
			// TODO: API call to backend

			// NOTE: Commented for better tests ATM
			// let receipt = await this.$web3Utils.subscribe();
			// this.notify(receipt);

			this.$router.push(
				{
					name: "Update",
					params: {
						title: " Subscribed successfully",
						text: "Head over to to your EPNS app our welcome notification is waiting for you",
						icon: "check-circle",
					}
				}
			)
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
			console.log(this.assets);
			// TODO: API call to backend

			// NOTE: Commented for better tests ATM
			// let result = await this.$web3Utils.unsubscribe();
			// this.notify(result);

			this.$router.push(
				{
					name: "Update",
					params: {
						title: "Unsubscribed successfully",
						text: "We hate to see you going, hoping to see you back soon :)",
						icon: "exclamation",
					}
				}
			)
		},
		notify(result) {
			// TODO:
			// - Add is logged in | subscribe button disabled
			// - Add loading button for Txn

			console.log(result);
			if (result.status) {
				console.log(result);
				this.$toast({
					title: "Subscribed!",
					description: "message which is intentionally happy sounding lol",
					status: "success",
					duration: 2000,
					position: "bottom-left",
					isClosable: true,
				});
			} else {
				this.$toast({
					title: "Something went wrong",
					description: `https://ropsten.etherscan.io/tx/${result.receipt["transactionHash"]}`,
					status: "error",
					duration: 2000,
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
		deselectAsset(_asset) {
			if (_asset.selected) {
				this.$toast({
					title: "Asset Removed",
					description: `Removed ${_asset.name} from selection`,
					status: "error",
					duration: 2000,
					position: "bottom-left",
					isClosable: true,
				});
			} else {
				this.$toast({
					title: "Asset Added",
					description: `Added ${_asset.name} to selection`,
					status: "success",
					duration: 2000,
					position: "bottom-left",
					isClosable: true,
				});
			}

			_asset.selected = !_asset.selected;

			// this.assets = this.assets.map((asset) =>
			//   asset.id === assetId ? { ...asset, selected: !asset.selected } : asset
			// );
			// this.assets[assetId - 1].selected = !this.assets[assetId - 1].selected
		},
	},
};
</script>
