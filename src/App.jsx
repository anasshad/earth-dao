import {useAddress, useMetamask} from '@thirdweb-dev/react';

const App = () => {
  const address = useAddress();
  const connectWithMetamask = useMetamask();

  if(!address){
    return (
      <div className="landing">
        <h1>Welcome to EarthDAO</h1>
        <button onClick={connectWithMetamask} className="btn-hero">
          Connect Wallet
        </button>
      </div>
    )
  }
  
  return (
    <div className="landing">
      <h1>Welcome to EarthDAO</h1>
      <h2>Wallet Connected</h2>
    </div>
  );
};

export default App;
