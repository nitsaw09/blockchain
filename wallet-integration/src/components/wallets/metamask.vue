<template>
  <div class="login">
    <b-button id="metaLoginBtn" class="btn btn-primary" @click="metaConnect()"
      >Metamask Login</b-button
    >
  </div>
</template>

<script>
import Auth from "../../utils/NFT/Auth";

export default {
  name: "MetaMask",
  methods: {
    async metaConnect() {
      try {
        const ethereum = window.ethereum;
        if (ethereum && ethereum.isMetaMask) {
          const metaMask = new Auth(ethereum);
          const account = await metaMask.connectWallet();
          if (account) {
            localStorage.setItem("wallet", "MetaMask");
            localStorage.setItem("account", account);
          }
          return account;
        } else {
          alert("MetMask is not installed");
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  }
};
</script>

<style>
#metaLoginBtn {
  width: 200px;
  margin-bottom: 20px;
}
</style>
