<template>
  <div class="login">
    <b-button id="metaLoginBtn" class="btn btn-primary" @click="metaConnect()"
      >Metamask Login</b-button
    >
  </div>
</template>

<script>
import axios from "axios";
import Auth from "../../utils/NFT/Auth";

export default {
  name: "MetaMask",
  methods: {
    async metaConnect() {
      try {
        const ethereum = window.ethereum;
        if (ethereum && ethereum.isMetaMask) {
          const auth = new Auth(ethereum);
          const account = await auth.connectWallet();
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
    },
    async userAccount(account) {
      return await axios
        .post("http://localhost:3001/api/auth/user/account", {
          account
        })
        .then(result => result.data)
        .catch(err => new Error(err.message));
    },
    async metaLogin(account, signature) {
      return await axios
        .post("http://localhost:3001/api/auth/login", {
          account,
          signature
        })
        .then(result => result.data)
        .catch(err => new Error(err.message));
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
