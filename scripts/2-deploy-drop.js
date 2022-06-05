import {AddressZero} from '@ethersproject/constants'
import sdk from './1-initialize-sdk.js'
import {readFileSync} from 'fs'

(async()=> {
  try{
    const editionDropAddress = await sdk.deployer.deployEditionDrop({
      // The collection's name, ex. CryptoPunks
      name: "EarthDAO Membership",
      // A description for the collection.
      description: "A DAO to invest in projects that save mother Earth",
      // The image that will be held on our NFT! The fun part :).
      image: readFileSync("scripts/assets/earth.png"),
      
      primary_sale_recipient: AddressZero,
    })
    const editionDrop = sdk.getEditionDrop(editionDropAddress)  
  const metadata = await editionDrop.metadata.get();

  console.log('Successfully deployed editionDrop contract, address: ', editionDropAddress);
  console.log('EditionDrop metadata: ',metadata);

  }catch(err){
    console.log(error)
  }

  
})()

