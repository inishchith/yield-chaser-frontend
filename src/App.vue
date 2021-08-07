<template>
	<div id="app">
		<div class="container">
			<Header :wallet="walletInfo" />
		</div>
		<router-view />
	</div>
</template>

<script>
import Header from "./components/Header.vue";

export default {
	name: "App",
	components: {
		Header,
	},
	data() {
		return {
			walletInfo: {
				type: "default",
				id: "0x1234",
			}
		};
	},
};
</script>

<style>
/* #app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
} */

@import "https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap";
* {
	padding: 0;
	margin: 0;
}

body {
	position: absolute;
	background-color: var(--background-color);
	color: var(--text-color);
	width: 100%;
	height: 100%;
	font-family: "Inter", sans-serif;
	margin: 0;
	padding: 0;
}

#topbar {
	width: 100%;
	margin-top: 3%;
	display: flex;
	align-items: center;
}

#logo {
	font-size: 32px;
	margin-left: 8%;
	font-weight: bold;
}

ul {
	list-style: none;
}

#links {
	position: absolute;
	right: 8%;
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	padding: 0px;
}

li {
	margin: 0 12px;
	display: inline;
	font-size: 18px;
	font-weight: bold;
	cursor: pointer;
}

li:hover {
	color: var(--link-text);
}

#container {
	position: absolute;
	text-align: center;
	justify-content: center;
	width: 60vh;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}

#product-title {
	font-size: 42px;
	font-weight: 500;
	margin-bottom: 24px;
}

a {
	text-decoration: none;
	color: #ffffff;
}

a:hover {
	color: var(--link-text);
}

::selection {
	color: white;
	background: #b2b2b2;
}

::-moz-selection {
	color: white;
	background: #b2b2b2;
}

@media screen and (max-width: 768px) {
	:root {
		--author: #55c392;
		--link-text: #888;
		--background-color: #0E0E0C;
		--text-color: #ffffff;
		--def-color: #1a2735;
		--asset-color: #319795;
	}
}

@media screen and (min-width: 768px) {
	:root {
		--link-text: #55c392;
		--author: #1a2537;
		--background-color: #0E0E0C;
		--text-color: #ffffff;
		--border-color: #ffffff;
		--def-color: #1a2735;
		--asset-color: #319795;
	}
}
</style>
