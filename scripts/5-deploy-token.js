import {AddressZero} from '@ethersproject/constants'
import sdk from './1-initialize-sdk.js'

(async () => {
  try {
    const tokenAddress = await sdk.deployer.deployToken({
      name: 'EarthDAO Governance Token',
      symbol: 'EDAO',
      primary_sale_recipient: AddressZero
    });
    console.log('Successfully deployed token: ', tokenAddress);
  } catch(err){
    console.log('Failed to deploy token: ', err)
  }
})()