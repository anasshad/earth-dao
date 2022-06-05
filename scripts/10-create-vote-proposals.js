import sdk from './1-initialize-sdk.js';
import {ethers} from 'ethers'

const vote = sdk.getVote('0xF03Cc39b1086749002f56ea8aF6413868aF6a077');
const token = sdk.getToken('0x8f33Ac1470bE338d73e6a8367649f02ba3A39c68');

(async () => {
  try{
    const amount = 420_000;
    const description = 'Should the dao mint an additional '+amount+' tokens into the treasury?';
    const executions = [
      {
        toAddress: token.getAddress(),
        nativeTokenValue: 0,
        transactionData: token.encoder.encode(
          "mintTo",[
            vote.getAddress(),
            ethers.utils.parseUnits(amount.toString(), 18)
          ]
        )
      }
    ]
    await vote.propose(description, executions);
    console.log('Successfully created proposal')
  } catch(err){
    console.log('Failed to create proposal: ',err)
    process.exit(1)
  }

  try{
    const amount = 50_000;
    const description = "Send "+amount+" to " + process.env.WALLET_ADDRESS;
    const executions = [{
      toAddress: token.getAddress(),
      nativeTokenValue: 0,
      transactionData: token.encoder.encode(
        "transfer",[
          process.env.WALLET_ADDRESS,
          ethers.utils.parseUnits(amount.toString(), 18)
        ]
      )
    }]
    await vote.propose(description, executions);

    console.log(
      "✅ Successfully created proposal to reward ourselves from the treasury, let's hope people vote for it!"
    );
  } catch(err){
        console.error("failed to create second proposal", err);

  }
})()