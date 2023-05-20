import { Container, Box, TextField, Button, Typography, InputAdornment } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import MobXContext from "@stores/MobXContext";
import { SniperResult } from "@models/SniperResult";
import Loading from "@components/loading/Loading";

type SniperSearchProps = {
  onSnipeComplete: (result: SniperResult) => void;
}

export const SniperSearch: React.FC<SniperSearchProps> = observer(({ onSnipeComplete }: SniperSearchProps) => {

  const [currentPlaceholder, setCurrentPlaceholder] = useState<number>(0);
  const [typedPlaceholder, setTypedPlaceholder] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const { languageStore, sniperStore } = useContext(MobXContext);
  const placeholder = `${typedPlaceholder}`

  useEffect(() => {
    const timeoutId: NodeJS.Timeout = setTimeout(() => {
      setCurrentPlaceholder((currentPlaceholder + 1) % placeholders.length);
      setTypedPlaceholder("");
    }, 6000);
    return () => clearTimeout(timeoutId);
  });

  useEffect(() => {
    let typingTimerId: NodeJS.Timeout;
    let currentIndex: number = currentPlaceholder;
    const typeNextChar = () => {
      const currentPlaceholderText = placeholders[currentIndex];
      if (typedPlaceholder === currentPlaceholderText) {
        typingTimerId = setTimeout(() => {
          setCurrentPlaceholder((currentIndex + 1) % placeholders.length);
          setTypedPlaceholder("");
        }, 1000);
      } else if (typedPlaceholder.length < currentPlaceholderText.length) {
        setTypedPlaceholder((prev: string) => prev + currentPlaceholderText[prev.length]);
        typingTimerId = setTimeout(typeNextChar, 100);
      }
    };
    typingTimerId = setTimeout(typeNextChar, 100);
    return () => clearTimeout(typingTimerId);
  });

  const handleOnSubmitClicked = async () => {
    sniperStore.isSniping = true;
    const snipedResults: SniperResult = {
      product: {
        name: searchValue,
        id: 0,
        manufacturer: "",
        material: 1,
        modelNumber: "",
        subcategories: [],
        design: "",
        dimension: "",
      },
      sniperResult: await sniperStore.GetSniping(searchValue)
    }
    onSnipeComplete(snipedResults);
  }



  return (
    <Container>
      <Box style={{ textAlign: 'center', marginBottom: 3 }}>
        <Typography variant="h2">
          {languageStore.currentLanguage.SniperFormTitleText}
        </Typography>
      </Box>

      <Box component="form" noValidate>

        <Box marginBottom={1} display="flex" alignItems="flex-end">
          <TextField
            fullWidth
            disabled={sniperStore.isSniping}
            placeholder={placeholder}
            label={languageStore.currentLanguage.SniperFormLabelText}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event) => {
              let temp = event.target.value;
              setSearchValue(temp);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    variant="contained"
                    disabled={sniperStore.isSniping}
                    onClick={handleOnSubmitClicked}
                  >
                    <Typography variant="body2">
                      {languageStore.currentLanguage.search}
                    </Typography>
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box marginBottom={1}>
          <Typography variant="body2" color="text.secondary">
            {languageStore.currentLanguage.SniperFormMutedText}
          </Typography>
        </Box>
        {sniperStore.isSniping && <Loading height={'50px'} />}
      </Box>

    </Container>
  )
});


const placeholders: string[] = [
  "Royal Copenhagen Musselmalet Stel",
  "Bing og Grøndal Frokosttallerken",
  "Rosenborg Sterling Sølv",
  "Isbjørn Figur",
  "Kâhler Vase",
  "Aluminia Tenera Spejl",
  "Georg Jensen Julepynt",
  "O.V. Mogensen sølv",
  "Holmegaard Viol"];