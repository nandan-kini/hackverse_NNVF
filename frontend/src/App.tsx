import { useState } from 'react';
import Classify from './components/Classify';
import './App.css';
import WalletConnector from './components/walletConnect';
import { ImageContext,PredictionContext, ProofContext } from './components/Context';
import ProofBox from './components/ProofBox'

function App() {
  const [image, setImage] = useState<number[][]>([]);
  const [prediction,setPrediction] = useState<String>("");
  const [proof, setProof] = useState<String>("");
  return (
    <div className="App">
      <WalletConnector />
      <ImageContext.Provider value={{ image, setImage}}>
      <PredictionContext.Provider value={{prediction,setPrediction} }>
      <ProofContext.Provider  value={{proof, setProof}}>
        <Classify />
      </ProofContext.Provider>
      </PredictionContext.Provider>
      </ImageContext.Provider>
    </div>
  );
}

export default App;
