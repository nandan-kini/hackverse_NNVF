import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { ProofContext } from "./Context";
import { CopyBlock, dracula } from "react-code-blocks";


function ProofBox() {

    const { proof } = useContext(ProofContext);
    // let transformProof = ()=> proof.flat(2).replace("/\/g","");
    return (
        <>
            <Typography variant="h5" component="h2">
                Proof
            </Typography>
            {/* <Box
        display={'flex'}
        overflow={'scroll'}
        flexWrap={'wrap'}
            border={'1px solid white'}
            padding={'10px'}
            textAlign={'center'}>

            {proof}
        </Box> */}
            <Box position={'relative'} display={'flex'} alignItems={'center'} justifyContent={'center'} width={'100vw'} minHeight={"10px"}
                margin={'0 auto'}>
                <CopyBlock
                    text={JSON.stringify(proof)
                        .replace(/\\/g, " ")
                        .replace(/\n/g, "\n\n")
                        .split(",")
                        .join("\n")
                        .substring(0,proof.length-69)}
                    language="json"
                    theme={dracula}
                />

            </Box>
        </>
    );
}

export default ProofBox;