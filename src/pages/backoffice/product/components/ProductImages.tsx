import ImageIcon from "@components/svgs/ImageIcon";
import Image from "@models/Image";
import { Grid, Typography } from "@mui/material";
import MobXContext, { IMobXContext } from "@stores/MobXContext";
import { useContext } from "react";

const ProductImages: React.FC<{ images: Image[] }> = (props) => {

    const { images } = props;
    const { languageStore } = useContext<IMobXContext>(MobXContext);
    const numberOfImages: number = images.length;

    const Items = () => {
        if (numberOfImages === 0) {
            return (
                <Grid container height={'100%'} width={'100%'} padding={2} alignItems={'center'} flexDirection={'column'}>
                    <Grid item xs={12} >
                        <Typography variant="h6">{languageStore.currentLanguage.productImages}</Typography>
                    </Grid>
                    <Grid item xs={12} >
                        <ImageIcon />
                    </Grid>
                </Grid >
            )
        } else {
            return (
                <div></div>
            )
        }
    }

    return (
        <Grid container spacing={2}>
            <Items />
        </Grid>
    )
};

export default ProductImages;
