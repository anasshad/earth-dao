import { useAddress, useMetamask, useEditionDrop, useToken, useVote, useNetwork } from '@thirdweb-dev/react';
import { useEffect, useState, useMemo } from 'react'
import {ChainId} from '@thirdweb-dev/sdk';
import Earth from './earth.gif';

//IMPORT COMPONENTS
import Mint from './components/Mint';

const App = () => {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const editionDrop = useEditionDrop('0xbD45bd7EAb169bea6cE8b7CDcc8Bc320b9ae1f19');
  const token = useToken('0x8f33Ac1470bE338d73e6a8367649f02ba3A39c68')
  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const [memberAddresses, setMemberAddresses] = useState([]);
  const [memberTokenAmounts, setMemberTokenAmounts] = useState([]);
  const vote = useVote('0xF03Cc39b1086749002f56ea8aF6413868aF6a077')
  const [proposals, setProposals] = useState([]);
  const [isVoting, setIsVoting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
const network = useNetwork();
  
  useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }

    const getAllProposals = async () => {
      try {
        const proposals = await vote.getAll();
        setProposals(proposals)
        console.log('Proposals: ', proposals);
      } catch (err) {
        console.log('Failed to get proposals: ', err)
      }
    }
    getAllProposals();
  }, [hasClaimedNFT, vote])

  const shortenAddress = (str) => {
    return str.substring(0, 6) + '...' + str.substring(str.length - 4)
  }

  useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }

    const getAllAddresses = async () => {
      try {
        const members = await editionDrop.history.getAllClaimerAddresses(1);
        setMemberAddresses(members)

      } catch (err) {
        console.log('Failed to fetch claimer addresses: ', err)
      }
    }

    getAllAddresses();
  }, [hasClaimedNFT, editionDrop.history])

  useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }

    if (!proposals.length) {
      return;
    }

    const checkIfUserHasVoted = async () => {
      try {
        const hasVoted = await vote.hasVoted(proposals[0].proposalId, address);
        setHasVoted(hasVoted);
        if (hasVoted) {
          console.log("🥵 User has already voted");
        } else {
          console.log("🙂 User has not voted yet");
        }
      } catch (err) {
        console.log('Failed to check if user has voted: ', err)
      }
    }
  }, [])

  useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }

    const getAllBalances = async () => {
      try {
        const balances = await token.history.getAllHolderBalances();
        setMemberTokenAmounts(balances)

      } catch (err) {
        console.log('Failed to fetch claimer balances: ', err)
      }
    }
    getAllBalances()
  }, [hasClaimedNFT, token.history])

  useEffect(() => {
    if (!address) {
      return;
    }
    const checkBalance = async () => {
      try {
        const balance = await editionDrop.balanceOf(address, '1');
        if (balance.gt(0)) {
          setHasClaimedNFT(true);
          console.log('The user already has membership NFT')
        } else {
          setHasClaimedNFT(false);
          console.log('Ther user does not have membership NFT')
        }
      } catch (err) {
        setHasClaimedNFT(false);
        console.log(err)
      }
    }
    checkBalance();
  }, [address, editionDrop])

  const mintNFT = async () => {
    try {
      setIsClaiming(true);
      await editionDrop.claim('1', 1);
      console.log(`Successfully minted, view it on Opensea: https://testnets.opensea.io/assets/${editionDrop.getAddress()}/1`)
      setHasClaimedNFT(true)
    } catch (err) {
      setHasClaimedNFT(false);
      console.log('Failed to mint: ', err);

    } finally {
      setIsClaiming(false);
    }
  }

  const memberList = useMemo(() => {
    return memberAddresses.map((address) => {

      const member = memberTokenAmounts ?.find(({ holder }) => holder === address);

      return {
        address,
        tokenAmount: member ?.balance.displayValue || "0",
      }
    });
  }, [memberAddresses, memberTokenAmounts]);

  if(address && (network?.[0].data.chain.id !== ChainId.Rinkeby)){
    return(
      <div className="unsupported-network" >
        <h2>Please connect to Rinkeby</h2>
        <p>
          Please switch on the Rinkeby networks
        </p>
      </div>
    )
  }
  
  if (!address) {
    return (
      <div className="landing">
        <img src={Earth} alt="earth-gif"  />
        <h1>Welcome to EarthDAO</h1>
        <button onClick={connectWithMetamask} className="btn-hero">
          Connect Wallet
        </button>
      </div>
    )
  }

  console.log(memberList)

  if (hasClaimedNFT) {
    return (
      <div className="member-page" >
        <img src={Earth} alt="earth-gif"  />
        <h1>Earth DAO</h1>
        <h3>Welcome tso EarthDAO</h3>
        <div>
        <div>
          <h2>Member List</h2>
          <table className="card" >
            <thead>
              <tr>
                <th>Address</th>
                <th>Token Amount</th>
              </tr>
            </thead>
            <tbody>
              {
                memberList.map((member, index) => {
                  return (
                    <tr key={index} >
                      <td>{shortenAddress(member.address)}</td>
                      <td>{member.tokenAmount}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table></div>
        <div>
          <h2>Active Proposals</h2>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              e.stopPropagation();

              //before we do async things, we want to disable the button to prevent double clicks
              setIsVoting(true);

              // lets get the votes from the form for the values
              const votes = proposals.map((proposal) => {
                const voteResult = {
                  proposalId: proposal.proposalId,
                  //abstain by default
                  vote: 2,
                };
                proposal.votes.forEach((vote) => {
                  const elem = document.getElementById(
                    proposal.proposalId + "-" + vote.type
                  );

                  if (elem.checked) {
                    voteResult.vote = vote.type;
                    return;
                  }
                });
                return voteResult;
              });

              // first we need to make sure the user delegates their token to vote
              try {
                //we'll check if the wallet still needs to delegate their tokens before they can vote
                const delegation = await token.getDelegationOf(address);
                // if the delegation is the 0x0 address that means they have not delegated their governance tokens yet
                if (delegation === AddressZero) {
                  //if they haven't delegated their tokens yet, we'll have them delegate them before voting
                  await token.delegateTo(address);
                }
                // then we need to vote on the proposals
                try {
                  await Promise.all(
                    votes.map(async ({ proposalId, vote: _vote }) => {
                      // before voting we first need to check whether the proposal is open for voting
                      // we first need to get the latest state of the proposal
                      const proposal = await vote.get(proposalId);
                      // then we check if the proposal is open for voting (state === 1 means it is open)
                      if (proposal.state === 1) {
                        // if it is open for voting, we'll vote on it
                        return vote.vote(proposalId, _vote);
                      }
                      // if the proposal is not open for voting we just return nothing, letting us continue
                      return;
                    })
                  );
                  try {
                    // if any of the propsals are ready to be executed we'll need to execute them
                    // a proposal is ready to be executed if it is in state 4
                    await Promise.all(
                      votes.map(async ({ proposalId }) => {
                        // we'll first get the latest state of the proposal again, since we may have just voted before
                        const proposal = await vote.get(proposalId);

                        //if the state is in state 4 (meaning that it is ready to be executed), we'll execute the proposal
                        if (proposal.state === 4) {
                          return vote.execute(proposalId);
                        }
                      })
                    );
                    // if we get here that means we successfully voted, so let's set the "hasVoted" state to true
                    setHasVoted(true);
                    // and log out a success message
                    console.log("successfully voted");
                  } catch (err) {
                    console.error("failed to execute votes", err);
                  }
                } catch (err) {
                  console.error("failed to vote", err);
                }
              } catch (err) {
                console.error("failed to delegate tokens");
              } finally {
                // in *either* case we need to set the isVoting state to false to enable the button again
                setIsVoting(false);
              }
            }}
          >
            {proposals.map((proposal) => (
              <div key={proposal.proposalId} className="card">
                <h5>{proposal.description}</h5>
                <div>
                  {proposal.votes.map(({ type, label }) => (
                    <div key={type}>
                      <input
                        type="radio"
                        id={proposal.proposalId + "-" + type}
                        name={proposal.proposalId}
                        value={type}
                        //default the "abstain" vote to checked
                        defaultChecked={type === 2}
                      />
                      <label htmlFor={proposal.proposalId + "-" + type}>
                        {label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button disabled={isVoting || hasVoted} type="submit">
              {isVoting
                ? "Voting..."
                : hasVoted
                  ? "You Already Voted"
                  : "Submit Votes"}
            </button>
            {!hasVoted && (
              <small>
                This will trigger multiple transactions that you will need to
                sign.
                </small>
            )}
          </form>
        </div>
        </div>
        
      </div>
    )
  }

  return (
    <Mint isClaiming={isClaiming} mintNFT={mintNFT}/>
  );
};

export default App;
