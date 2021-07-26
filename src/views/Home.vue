<template>
	<div id="container">
		<Selector
			:assets="assets"
			@deselect-asset="deselectAsset"
			@remove-asset="removeAsset"/>
		<br />
		<c-button
			right-icon="arrow-forward"
			size="md"
			height="50px"
			width="60vh"
			variant-color="vue"
			variant="solid"
			@click="openModal">
			Subscribe to channel
		</c-button>
		<c-modal
			:is-open="isModalOpen"
			:on-close="closeModal"
			:close-on-overlay-click="true">
			<c-modal-content ref="content">
				<c-modal-header color="black"> Confirm Subscription </c-modal-header>
				<c-modal-close-button />
				<c-modal-body color="black">
					The content provided this website does not constitute investment
					advice, financial advice, trading advice, or any other advice.
				</c-modal-body>
				<c-modal-footer>
					<c-button variant-color="blue" mr="3"> Save </c-button>
					<c-button @click="closeModal"> Cancel </c-button>
				</c-modal-footer>
			</c-modal-content>
			<c-modal-overlay />
		</c-modal>
	</div>
</template>

<script>
import Selector from "@/components/Selector.vue";
import {
	CButton,
	CModal,
	CModalOverlay,
	CModalContent,
	CModalHeader,
	CModalFooter,
	CModalBody,
	CModalCloseButton,
} from "@chakra-ui/vue";

export default {
	name: "Home",
	components: {
		Selector,
		CButton,
		CModal,
		CModalOverlay,
		CModalContent,
		CModalHeader,
		CModalFooter,
		CModalBody,
		CModalCloseButton,
	},
	data() {
		return {
			isModalOpen: false,
			assets: [
				{
					id: 1,
					name: "ETH",
					selected: false,
				},
				{
					id: 2,
					name: "YFI",
					selected: false,
				},
				{
					id: 3,
					name: "MATIC",
					selected: false,
				},
				{
					id: 4,
					name: "WETH",
					selected: false,
				},
				{
					id: 5,
					name: "DAI",
					selected: false,
				},
				{
					id: 6,
					name: "CRV",
					selected: false,
				},
				{
					id: 7,
					name: "WBTC",
					selected: false,
				},
				{
					id: 8,
					name: "BAL",
					selected: false,
				},
				{
					id: 9,
					name: "BUSD",
					selected: false,
				},
				{
					id: 10,
					name: "USDC",
					selected: false,
				},
				{
					id: 11,
					name: "MKR",
					selected: false,
				},
				{
					id: 12,
					name: "AAVE",
					selected: false,
				},
			],
		};
	},
	computed: {},
	created() {},
	methods: {
		openModal() {
			this.isModalOpen = true;
		},
		closeModal() {
			this.isModalOpen = false;
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
