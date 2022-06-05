import sdk from './1-initialize-sdk.js'

(async () => {
  try{
    const voteContractAddress = await sdk.deployer.deployVote({
      name: "Earth DAO",
      voting_token_address: "0x8f33Ac1470bE338d73e6a8367649f02ba3A39c68",
      voting_delay_in_blocks: 0,
      voting_period_in_blocks: 6570,
      voting_quorum_fraction: 0,
      proposal_token_threshold: 0,
    })
    console.log('Successfully deployed vote contract: ', voteContractAddress)
  } catch(err){
    console.log('Failed to create vote contract: ', err)
  }
})()