import sdk from './1-initialize-sdk.js'

const vote = sdk.getVote('0xF03Cc39b1086749002f56ea8aF6413868aF6a077');
const token = sdk.getToken('0x8f33Ac1470bE338d73e6a8367649f02ba3A39c68');

(async () => {
  try{
    await token.roles.grant("minter",vote.getAddress() )
    console.log(
      "Successfully gave vote contract permissions to act on token contract"
    );
  }catch(err){
    console.log('Failed to give vote contract permissions: ',err)
    process.exit(1)
  }

  try{
    const ownedTokenWallet = await token.balanceOf(process.env.WALLET_ADDRESS);
    const ownedAmount = ownedTokenWallet.displayValue;
    const percentage = 50;
    const amount = ownedAmount/100 * percentage;

    await token.transfer(vote.getAddress(), amount);
    console.log('Successfully transferred '+percentage+' to vote contract')
    
  }catch(err){
    console.error("failed to transfer tokens to vote contract", err);
  }
})()