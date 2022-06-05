import sdk from "./1-initialize-sdk.js";

const editionDrop = sdk.getEditionDrop("0xbD45bd7EAb169bea6cE8b7CDcc8Bc320b9ae1f19");

const token = sdk.getToken("0x8f33Ac1470bE338d73e6a8367649f02ba3A39c68");


(async () => {
  console.log(token)
  try {
    const walletAddresses = await editionDrop.history.getAllClaimerAddresses(1);

    console.log(walletAddresses)

    if (walletAddresses.length === 0) {
      console.log(
        "No NFTs have been claimed yet, maybe get some friends to claim your free NFTs!",
      );
      process.exit(0);
    }

    // Loop through the array of addresses.
    const airdropTargets = walletAddresses.map((address) => {

    const amount = 10_000;
      
      // Set up the target.
      const airdropTarget = {
        toAddress: address,
        amount: amount,
      };

      return airdropTarget;
    });

    // Call transferBatch on all our airdrop targets.
    console.log("🌈 Starting airdrop...");
    await token.transferBatch(airdropTargets);
    console.log("✅ Successfully airdropped tokens to all the holders of the NFT!");
  } catch (err) {
    console.error("Failed to airdrop tokens", err);
  }
})();