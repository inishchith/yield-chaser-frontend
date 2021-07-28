import Vue from "vue";
import Chakra, {
	CThemeProvider,
	CColorModeProvider,
	CBox,
	CReset,
} from "@chakra-ui/vue";
import App from "./App.vue";
import router from "./router";
import Web2Utils from './services/web2Utils';
import Web3Utils from './services/web3Utils';

Vue.config.productionTip = false;

Vue.prototype.$web2Utils = new Web2Utils();
Vue.prototype.$web3Utils = new Web3Utils();


Vue.use(Chakra);

new Vue({
	router,
	render(h) {
		return h(CThemeProvider, [
		  h(CColorModeProvider, [h(CBox, [h(CReset), h(App)])])
		]);
	}
}).$mount("#app");