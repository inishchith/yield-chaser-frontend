<template>
    <div id="container">
	    <c-Box mb="6" rounded="lg" bg="var(--def-color)">
            <c-flex padding="6" direction="row" wrap="wrap" justify-content="center">
                 <c-icon :name="icon" size="15vh" />
            </c-flex>
            <c-heading p="3" size="lg" font-size="24px"> {{ title }} </c-heading>
            <c-text p="10" pt="2" color="gray.200" fontSize="18px" fontWeight="600"> 
                {{ text }}
            </c-text>
	    </c-Box>
        <c-button
            size="md"
            height="50px"
            width="60vh"
            variant-color="vue"
            variant="solid"
            @click="backToDashboard">
            Go to Dashboard
		</c-button>
    </div>
</template>

<script>
import {
	CBox,
    CButton,
    CFlex,
	CHeading,
    CIcon,
    CText
} from "@chakra-ui/vue";

export default {
	name: "Update",
	components: {
        CBox,
        CButton,
        CFlex,
        CHeading,
        CIcon,
        CText
	},
	props: ["title", "text", "icon", "type"],
	data() {
		return {};
	},
	created() {},
	methods: {
        backToDashboard() {
            this.$router.push({name: 'Home'})
        }
    },
};
</script>
