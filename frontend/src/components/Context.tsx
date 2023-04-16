import React from 'react';

// Define the interface for the context value
interface ImageContextValue {
  image: number[][];
  setImage: React.Dispatch<React.SetStateAction<number[][]>>;
}
interface PredictionContextValue{
  prediction:String;
  setPrediction:React.Dispatch<React.SetStateAction<String>>;
}
interface ProofContextValue{
  proof:String;
  setProof:React.Dispatch<React.SetStateAction<String>>;
}
// Create the image context with the context value type
export const ImageContext = React.createContext<ImageContextValue>({
  image: [],
  setImage: () => {},
});
export const PredictionContext = React.createContext<PredictionContextValue>({
  prediction:"",
  setPrediction: ()=>{},
});
export const ProofContext=React.createContext<ProofContextValue>({
  proof:"",
  setProof: ()=>{},
});


