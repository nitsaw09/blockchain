<template>
  <div class="login">
    <b-button id="torusLoginBtn" class="btn btn-primary" @click="login()"
      >Torus Login</b-button
    >
  </div>
</template>

<script>
import Torus from "@toruslabs/torus-embed";
import Auth from "../../utils/NFT/Auth";
export default {
  name: "Torus",
  methods: {
    async login() {
      const torus = new Torus({});
      window.torus = torus;
      await torus.init({
        enableLogging: false
      });
      await window.torus.login();
      const { ethereum, isLoggedIn } = window.torus;
      if (ethereum.selectedAddress && isLoggedIn) {
        localStorage.setItem("wallet", "Torus");
        const auth = new Auth(ethereum);
        const account = await auth.connectWallet();
        if (account) {
          localStorage.setItem("account", account);
          console.log(account);
        }
      }
    }
  }
};
</script>

<style>
#torusLoginBtn {
  width: 200px;
}
</style>
