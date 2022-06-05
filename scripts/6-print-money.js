import sdk from './1-initialize-sdk.js'

const token =  sdk.getToken('0xa2e5AAf19aeA742B67Df2C58be49e94d3A0B3545');

(async() => {
  try{
    const amount = 10_000_000;
    await token.mintTo(process.env.WALLET_ADDRESS, amount );
    const totalSupply = await token.totalSupply();

    console.log('EDAO total supply: ', totalSupply)
  } catch(err){
    console.log('Failed to mint token', err)
  }
})()