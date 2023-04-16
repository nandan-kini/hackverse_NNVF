import { ethers } from "ethers";
import { useContext } from "react";
import address from './artifacts/address.json';
import Verifier from './artifacts/Verifier.json';

import { generateCalldata, generateWitnessOnly } from './circuit_js/generate_calldata';
import { ProofContext } from "./components/Context";

let verifier: ethers.Contract;

export async function connectContract() {
    const { ethereum } = window; 

    let provider = new ethers.providers.Web3Provider(ethereum);
    let signer = provider.getSigner();
    console.log('signer: ', await signer.getAddress());

    verifier = new ethers.Contract(address['Verifier'], Verifier.abi, signer);

    console.log("Connect to Verifier Contract:", Verifier);
}

export async function VerifyProof(input: Object, wasmBuffer: ArrayBuffer) {

    await connectContract();
    // const {proof,setProof} = useContext(ProofContext);
    let calldata = await generateCalldata(input, wasmBuffer);
    //This is the proof, we shall print this
    // setProof("hello");
    console.log(calldata);
    if (calldata) {
        let valid = await verifier.verifyProof(calldata[0], calldata[1], calldata[2], calldata[3]);
        if (valid) {
            return calldata;
        }
        else {
            throw new Error("Invalid proof.");
        }
    }
    else {
        throw new Error("Witness generation failed.");
    }
}

export async function verifyProofLocal(input: Object, wasmBuffer: ArrayBuffer, numOutputs: number) {

    await connectContract();

    let witness = await generateWitnessOnly(input, wasmBuffer, numOutputs);

    return witness;
}