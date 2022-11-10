<template>
  <div class="login">
    <b-button class="btn btn-primary" @click="nftVoucher()"
      >NFT Voucher</b-button
    >
  </div>
</template>

<script>
import { Voucher } from "../utils/NFT/ERC721/voucher";
import { env } from "../../config";
export default {
  name: "NFT",
  methods: {
    async nftVoucher() {
      const contractAddress = env.CONTRACT_ADDRESS;
      const provider = global.provider;
      console.log(provider);
      const voucher = new Voucher(contractAddress, provider);
      const nft = await voucher.getVoucher(1, "http://xyz.com", 1);
      console.log(nft);
    }
  }
};
</script>
