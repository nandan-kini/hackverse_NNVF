import { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import { VerifyProof } from "../contract";
import model from "../mnist/public_model.json";
import images from "../mnist/image.json";
import labels from "../mnist/label.json";
import { HeatMapGrid } from "react-grid-heatmap";
import '../Classify.css'
import Loading from "./Load";
import PixelGrid from './PixelGrid';
import { ImageContext,PredictionContext, ProofContext } from "./Context";
import ProofBox from "./ProofBox";

const Classify = () => {
    const [prediction, setPrediction] = useState("");
    const [hash, setHash] = useState("");
    const [error, setError] = useState(false);
    const [verifying, setVerifying] = useState(false)
    const [errorMsg, setErrorMsg] = useState("");
    const [index, setIndex] = useState(0);
    const [correct, setCorrect] = useState(0);
    const [total, setTotal] = useState(0);
    const {proof,setProof} = useContext(ProofContext);

    const { image } = useContext(ImageContext);
    

    const verify = async (event: any) => {
        // console.log("image is ", image);

        setError(false);
        const res = await fetch("circuit.wasm");
        const buffer = await res.arrayBuffer();
        setVerifying(true);
        let image = images[index].in.flat();
        // let Image = image.flat(
        // console.log("images : ", images);
        console.log("image : ", image);
//[[],[],[],[],[]]
        let json = { ...{ "in": image }, ...model };

        let callData = await VerifyProof(json, buffer)
            .catch((error: any) => {
                setErrorMsg(error.toString());
                setError(true);
                setVerifying(false);
            });
        
        setPrediction(callData![3][0]);
        setHash(callData![3][1]);
        setProof(JSON.stringify(callData));
        setVerifying(false);
        setTotal(total + 1);
        if (callData![3][0].toString() === labels[index].toString()) {
            setCorrect(correct + 1);
        }
        event.preventDefault();
    }
    const changeNumber = async (e: any) => {
        e.preventDefault();
        setPrediction("");
        setIndex(Math.floor(Math.random() * 100));
        e.preventDefault();
    }
    //Create some loading screen here
    return (
        <Box>
            <Typography variant="h3" my={10}>Classify Digit Using Model</Typography>
            <>
            <Button
            onClick={changeNumber}
            disabled={false}
            variant="contained">
            change Digit
        </Button>
        <section className="flexing">
                <div className="heatMap"> 
                <HeatMapGrid
                data={images[index].in}
                square={true}
                cellHeight="1rem"
/>
                {/* <div className="app">
                    <PixelGrid rows={28} cols={28} />
                </div> */}
                </div>
            </section>
            <Button
                onClick={verify}
                variant="contained"
            >
                Classify
            </Button><br /><br /></>
            {verifying ? <Loading text="Verifying..." /> : <div />}
            {error ? <Alert severity="error" sx={{ textAlign: "left" }}>
                {errorMsg}</Alert> : <div />}
            <Typography>Prediction: {prediction}</Typography>
            <Typography>Model hash: {hash}</Typography>
            <Typography mb={5}>Current accuracy:
                {(correct * 100 / total).toFixed(2)} %
            </Typography>
            <ProofBox/>
        </Box>
    
)}

export default Classify;