<template>
  <div id="app">
    <Header :wallet="walletInfo"/>
    <router-view/>
  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: "App",
  data() {
    return  {
      walletInfo: {
        type: "default",
        id: "0x1234"
      },
    }
  },
  components: {
    Header,
  },
}
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
    background-color: var(--background-color);
    color: var(--text-color);
    font-family: 'Inter', sans-serif;
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
    font-size: 26px;
    margin-left: 8%;
}

ul {
    list-style: none;
}

#links {
    position: absolute;
    right: 8%;
    display: flex;
}

li {
    margin: 0 10px;
    display: inline;
    font-size: 18px;
}

#container {
    position: absolute;
    text-align: center;
    justify-content: center;
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
    color: #028b75;
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
        --author: #028b75;
        --link-text: #888;
        --background-color: #0c0c0c;
        --text-color: #ffffff;
    }
}
@media screen and (min-width: 768px) {
    :root {
        --link-text: #028b75;
        --author: #1A2537;
        --background-color: #0c0c0c;
        --text-color: #ffffff;
        --border-color: #ffffff;
    }
}

</style>
