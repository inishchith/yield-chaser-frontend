<template>
    <div id="container">
	    <c-Box mb="6" rounded="lg" bg="var(--def-color)" m=auto max-w="60vh">
            <c-flex padding="6" direction="row" wrap="wrap" justify-content="center">
                 <c-icon :name="icon" size="15vh" />
            </c-flex>
            <c-heading p="3" size="lg" font-size="24px"> {{ title }} </c-heading>
            <span v-if="status">
                <c-text p="10" pt="2" color="gray.200" fontSize="18px" fontWeight="600">
                    Head over to to your EPNS app or install the <u> <a href="https://chrome.google.com/webstore/detail/epns-staging-protocol-alp/bjiennpmhdcandkpigcploafccldlakj" target="_blank"> Chrome Extension</a></u>. Our welcome notification is waiting for you :)
                </c-text>
            </span>
            <span v-else>
                <c-text p="10" pt="2" color="gray.200" fontSize="18px" fontWeight="600">
                    We hate to see you going, hoping to see you back soon :)
                </c-text>
            </span>
	    </c-Box>
        <c-button
            mt=6
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
	props: ["title", "status", "icon", "type"],
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
