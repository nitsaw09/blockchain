<template>
  <div class="login">
    <MetaMask v-if="!account"></MetaMask>
    <Torus v-if="!account"></Torus>
    <h1 v-if="account">User: {{ this.account }}</h1>
  </div>
</template>

<script>
import MetaMask from "@/components/wallets/metamask";
import Torus from "@/components/wallets/torus";

export default {
  name: "App",
  data() {
    return {
      account: null
    };
  },
  mounted() {
    setInterval(() => {
      this.account = localStorage.getItem("account");
    }, 500);
  },
  components: {
    MetaMask,
    Torus
  }
};
</script>
