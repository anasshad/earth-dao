import Earth from '../earth.gif';

const Mint = ({isClaiming, mintNFT}) => {
    
    return (
        <div className="mint-nft">
      <img src={Earth} alt="earth-gif"  />
      <h1>Welcome to EarthDAO</h1>
      <h2>Mint your EarthDAO NFT</h2>
      <button disabled={isClaiming} onClick={mintNFT}>
        {isClaiming ? "Minting..." : "Mint your NFT"}
      </button>
    </div>
    )
}

export default Mint;