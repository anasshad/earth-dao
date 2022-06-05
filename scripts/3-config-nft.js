import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const editionDrop = sdk.getEditionDrop("0xbD45bd7EAb169bea6cE8b7CDcc8Bc320b9ae1f19");

(async () => {
  try {
    await editionDrop.createBatch([
      {
        name: "Green Earth",
        description: "Green Earth NFT will give you access to EarthDAO",
        image: readFileSync("scripts/assets/green-earth.png"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();