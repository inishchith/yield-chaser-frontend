import Vue from "vue";
import Chakra, {
	CThemeProvider,
	CColorModeProvider,
	CBox,
	CReset,
} from "@chakra-ui/vue";
import App from "./App.vue";
import router from "./router";


Vue.config.productionTip = false;

Vue.use(Chakra);

new Vue({
	router,
	render(h) {
		return h(CThemeProvider, [
		  h(CColorModeProvider, [h(CBox, [h(CReset), h(App)])])
		]);
	}
}).$mount("#app");