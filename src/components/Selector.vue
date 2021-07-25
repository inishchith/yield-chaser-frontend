<template>
	<c-Box rounded="lg" bg="var(--def-color)">
		<c-heading p="3" size="lg" font-size="24px"> Choose your Assets </c-heading>
		<c-flex padding="6" direction="row" wrap="wrap" justify-content="left">
			<c-tag
				v-for="asset in assets"
				:key="asset.id"
				size="lg"
				mr="3"
				ml="3"
				mb="2"
				mt="4"
				variant-color="vue">
				<span @click="$emit('deselect-asset', asset)">
					<c-tag-label> {{ asset.name }} </c-tag-label>
					<c-tag-icon v-if="!asset.selected" icon="add" size="2" />
					<c-tag-icon v-else icon="close" size="2" />
				</span>
			</c-tag>
		</c-flex>
	</c-Box>
</template>

<script>
import {
	CBox,
	CHeading,
	CTag,
	CTagIcon,
	CTagLabel,
	CFlex,
} from "@chakra-ui/vue";

export default {
	name: "Selector",
	components: {
		CTag,
		CTagIcon,
		CTagLabel,
		CFlex,
		CBox,
		CHeading,
	},
	props: ["assets"],
	data() {
		return {};
	},
	created() {},
	methods: {},
};
</script>

<style scoped>
.selected {
	color: grey;
}

/* #asset-bar {
	position: absolute;
	text-align: center;
	justify-content: center;
	width: 100%;
} */
</style>
