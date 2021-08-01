<template>
	<c-Box rounded="lg" bg="var(--def-color)">
		<c-heading p="3" size="lg" font-size="24px"> Choose your assets </c-heading>
		<c-flex padding="6" direction="row" wrap="wrap" justify-content="center">
			<c-button
			 	v-for="(value, key) in assets" 
				:key="key"
				width="10vh"
				mr="3"
				ml="3"
				mb="2"
				mt="2"
				p="1"
				:icon-size="1"
				@click="$emit('toggle-asset', key)"
				:right-icon="value.selected ? '': ''"
				variant-color="vue" :variant="value.selected ? 'solid' : 'outline'">
				{{ key }}
			</c-button>
		</c-flex>
	</c-Box>
</template>

<script>
import {
	CBox,
	CHeading,
	CButton,
	CFlex
} from "@chakra-ui/vue";

export default {
	name: "Selector",
	components: {
		CButton,
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
