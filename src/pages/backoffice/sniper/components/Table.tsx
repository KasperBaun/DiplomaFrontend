import SniperModel from "@models/SniperModel";
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import MobXContext from "@stores/MobXContext";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import SniperImageModal from "./SniperImageModal";
import { observer } from "mobx-react-lite";
import Loading from "@components/loading/Loading";

interface IProps {
    snipedResults : SniperModel[];
    isSniping : boolean;
    setIsSniping : Dispatch<SetStateAction<boolean>>;
}

const SnipedTable = ({snipedResults, isSniping, setIsSniping} : IProps) => {
    const { languageStore } = useContext(MobXContext);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);
    const [imageUrl, setImageUrl] = useState<string>("");

    const handleUrlClick = (url : string) => {
        if(url)
            window.open(url);
    }

    const openImageModal = (imageUrl : string) => {
        if (imageUrl) {
            let image : string = imageUrl;
            console.log(image)
            setImageUrl(image);
        }
        handleOpen();
    }

    if(snipedResults) {
        setIsSniping(false);
        return (
            <Container>
                <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell> {languageStore.currentLanguage.TableEntrySniperSource} </TableCell>
                            <TableCell> {languageStore.currentLanguage.TableEntrySniperTitle} </TableCell>
                            <TableCell> {languageStore.currentLanguage.TableEntrySniperBuyNowPrice} </TableCell>
                            <TableCell> {languageStore.currentLanguage.TableEntrySniperDescription} </TableCell>
                            <TableCell> {languageStore.currentLanguage.TableEntrySniperImages} </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { snipedResults.map((result, index) => (
                            <TableRow>
                                <TableCell onClick={() => handleUrlClick(result.itemUrl ? result.itemUrl : result.dbaItemLink )} key={`src_${index + "_" + result.source.split(".")[0]}`}>{result.source}</TableCell>
                                <TableCell onClick={() => handleUrlClick(result.itemUrl ? result.itemUrl : result.dbaItemLink )} key={`title_${index + "_" + result.source.split(".")[0]}}`}>{result.description ? result.description.slice(0, 100) : result.dbaItemDescription.slice(0, 100) }</TableCell>
                                { result.priceEstimate !== null && result.priceEstimate !== "" ? (
                                    <TableCell onClick={() => handleUrlClick(result.itemUrl ? result.itemUrl : result.dbaItemLink )} key={`bnp_${index + "_" + result.source.split(".")[0]}}`}>{result.priceEstimate}</TableCell>
                                ) : (
                                    result.buyNowPrice !== null ? (
                                        <TableCell onClick={() => handleUrlClick(result.itemUrl ? result.itemUrl : result.dbaItemLink )} key={`bnp_${index + "_" + result.source.split(".")[0]}}`}>{result.buyNowPrice}</TableCell>
                                    ) : (
                                        <TableCell onClick={() => handleUrlClick(result.itemUrl ? result.itemUrl : result.dbaItemLink )} key={`bnp_${index + "_" + result.source.split(".")[0]}}`}>{ "DKK " + result.dbaItemPrice }</TableCell>
                                    )
                                ) }
                                <TableCell onClick={() => handleUrlClick(result.itemUrl ? result.itemUrl : result.dbaItemLink )} key={`desc_${index + "_" + result.source.split(".")[0]}}`}>{result.description ? result.description : result.dbaItemDescription }</TableCell>
                                { result.imageUrls[0] ? (
                                    <TableCell onClick={() => openImageModal(result.imageUrls[0] ? result.imageUrls[0] : result.dbaItemImages[0] )} size="small" key={`im_${index}`}>{languageStore.currentLanguage.TableEntrySniperItemUrl}</TableCell>
                                ) : (<></>) }
                            </TableRow>
                        )) }
                    </TableBody>
                </Table>
            </TableContainer>
            <SniperImageModal show={show} handleClose={handleClose} imageUrl={imageUrl} />
            </Container>
        )
    }
    if (isSniping)
        return (
            <Loading />
        )
    else {
        return (
            <></>
        )
    }
}

export default observer(SnipedTable);