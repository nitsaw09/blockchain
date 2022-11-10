<template>
  <div id="nav">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand to="#">NavBar</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/nft" v-if="isLogin">NFT</b-nav-item>
          <b-nav-item to="/" v-if="!isLogin">Login</b-nav-item>
          <b-nav-item to="/" v-if="isLogin" @click="logout()"
            >Logout</b-nav-item
          >
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      isLogin: false,
      account: sessionStorage.getItem("account")
    };
  },
  mounted() {
    setInterval(() => {
      if (window.torus && window.torus.isLoggedIn) {
        this.isLogin = true;
        global.provider = window.torus.ethereum;
        this.account = window.torus.ethereum.selectedAddress;
        localStorage.setItem("account", this.account);
      } else if (
        localStorage.getItem("wallet") === "MetaMask" &&
        localStorage.getItem("account")
      ) {
        this.isLogin = true;
        global.provider = window.ethereum;
        this.account = window.ethereum.selectedAddress;
        localStorage.setItem("account", this.account);
      } else {
        this.logout();
      }
    }, 100);
  },
  methods: {
    async logout() {
      const wallet = localStorage.getItem("wallet");
      if (wallet === "Torus") {
        await window.torus.logout();
      }
      localStorage.removeItem("wallet");
      localStorage.removeItem("account");
      delete window.provider;
      this.isLogin = false;
      this.account = 0;
    }
  }
};
</script>
