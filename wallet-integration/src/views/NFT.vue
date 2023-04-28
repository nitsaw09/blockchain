<template>
  <div class="login">
    <b-button class="btn btn-primary" @click="nftVoucher()"
      >NFT Vaucher</b-button
    >
  </div>
</template>

<script>
import { Voucher } from "../utils/NFT/ERC721/voucher";
import { env } from "../../config";
export default {
  name: "NFT",
  data() {
    return {
      nft: null
    };
  },
  methods: {
    async nftVoucher() {
      const contractAddress = env.CONTRACT_ADDRESS;
      const provider = global.provider;
      const voucher = new Voucher(contractAddress, provider);

      const tokenId = Math.floor(Math.random() * (9999 - 1000 + 1) + 100);
      const nftVoucher = await voucher.getVoucher(
        tokenId,
        "ipfs://QmaW5LWtgmAAd8W3Hb71QyAp9mhjMw1sgopuUBSRLXhuSD",
        "0.01"
      );
      console.log(nftVoucher);
      this.nft = [
        nftVoucher.tokenId,
        nftVoucher.minPrice,
        nftVoucher.uri,
        nftVoucher.signature
      ];
    }
  }
};
</script>

<style scoped>
.btn {
  margin-left: 20px;
}
</style>
