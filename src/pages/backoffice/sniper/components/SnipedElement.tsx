import SniperModel from "@models/SniperModel";
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import MobXContext from "@stores/MobXContext";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { Spinner } from "react-bootstrap";
import SniperImageModal from "./SniperImageModal";

interface IProps {
    snipedResults : SniperModel[];
    isSniping : boolean;
    setIsSniping : Dispatch<SetStateAction<boolean>>;
}

const SnipedElements = ( {snipedResults, isSniping, setIsSniping} : IProps ) => {

    const { languageStore } = useContext(MobXContext);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);
    const [imageUrls, setImageUrls] = useState([]);

    const handleUrlClick = (url : string) => {
        if(url)
            window.open(url);
    }

    const openImageModal = (imageUrls : string[]) => {
        // result.imageUrls[0]
        handleOpen();
        setImageUrls(imageUrls);
    }

    if(snipedResults) {
        setIsSniping(false);
        return (
            <Container>
                <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell> {languageStore.currentLanguage.TableEntrySniperVN} </TableCell>
                            <TableCell> {languageStore.currentLanguage.TableEntrySniperTitle} </TableCell>
                            <TableCell> {languageStore.currentLanguage.TableEntrySniperBuyNowPrice} </TableCell>
                            <TableCell> {languageStore.currentLanguage.TableEntrySniperNextBid} </TableCell>
                            <TableCell> {languageStore.currentLanguage.TableEntrySniperPriceEst} </TableCell>
                            <TableCell> {languageStore.currentLanguage.TableEntrySniperDescription} </TableCell>
                            <TableCell> {languageStore.currentLanguage.TableEntrySniperImages} </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    
                        { snipedResults.map((result, index) => (
                            <TableRow>
                                <TableCell onClick={() => handleUrlClick(result.itemUrl)} size="small" key={`vn_${index}`}>{result.varenummer}</TableCell>
                                <TableCell onClick={() => handleUrlClick(result.itemUrl)} key={`title_${index}`}>{result.itemTitle}</TableCell>
                                <TableCell onClick={() => handleUrlClick(result.itemUrl)} key={`bnp_${index}`}>{result.buyNowPrice}</TableCell>
                                <TableCell onClick={() => handleUrlClick(result.itemUrl)} key={`nb_${index}`}>{result.nextBid}</TableCell>
                                <TableCell onClick={() => handleUrlClick(result.itemUrl)} key={`pe_${index}`}>{result.priceEstimate}</TableCell>
                                <TableCell onClick={() => handleUrlClick(result.itemUrl)} key={`desc_${index}`}>{result.description}</TableCell>
                                <TableCell onClick={() => openImageModal(result.imageUrls)} size="small" key={`im_${index}`}>{languageStore.currentLanguage.TableEntrySniperItemUrl}</TableCell>
                            </TableRow>
                        )) }

                    </TableBody>
                </Table>
            </TableContainer>
            <SniperImageModal show={show} handleClose={handleClose} imageUrls={imageUrls} />
            </Container>
        )
    }
    else if(isSniping) {
        return (
            <Spinner animation="grow" />
        )
    }
}

export default SnipedElements;