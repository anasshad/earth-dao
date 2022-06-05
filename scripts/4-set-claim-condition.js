import sdk from "./1-initialize-sdk.js";
import {MaxUint256} from '@ethersproject/constants'

const editionDrop = sdk.getEditionDrop("0xbD45bd7EAb169bea6cE8b7CDcc8Bc320b9ae1f19");

(async () => {
  try{
    const claimConditions = [{
      startTime: new Date(),
      maxQuantity: 50_000,
      price: 0,
      quantityLimitPerTransaction:1,
      waitInSeconds:MaxUint256
    }]

    await editionDrop.claimConditions.set("1", claimConditions);
        console.log("✅ Successfully set claim condition!");

  }  catch(err){
        console.error("Failed to set claim condition", error);

  }
})()