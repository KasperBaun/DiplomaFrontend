import SniperModel from "@models/SniperModel";
import { Container } from "@mui/material";
import MobXContext from "@stores/MobXContext";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

interface IProps {
    setSnipedResults : Dispatch<SetStateAction<SniperModel[]>>;
    setHasSnipedValues : Dispatch<SetStateAction<boolean>>;
    snipedResults : SniperModel[];
}

const SniperForm = ({ setSnipedResults, setHasSnipedValues }: IProps) => {
    const { sniperStore, languageStore } = useContext(MobXContext);
    const [searchValue, setSearchValue] = useState<string>("");
    const placeholders: string[] = ["Royal Copenhagen Musselmalet Stel", "Bing og Grøndal Frokosttallerken", "Rosenborg Sterling Sølv"];
    const [currentPlaceholder, setCurrentPlaceholder] = useState<number>(0);
    const [typedPlaceholder, setTypedPlaceholder] = useState<string>("");
    
    useEffect(() => {
      const timeoutId: NodeJS.Timeout = setTimeout(() => {
        setCurrentPlaceholder((currentPlaceholder + 1) % placeholders.length);
        setTypedPlaceholder("");
      }, 6000);
      return () => clearTimeout(timeoutId);
    }, [currentPlaceholder, placeholders.length]);
    
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
    }, [currentPlaceholder, typedPlaceholder, placeholders.length]);

    const placeholder = `${typedPlaceholder}`

    const handleOnSniperSearchSubmit = async () => {
        try {
        const results = await sniperStore.GetSniping(searchValue) 
        setSnipedResults(results);
        setHasSnipedValues(true);
        if(results) {
            console.log(JSON.stringify(results));
        }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container>
            <h2 style={{ textAlign: "center" }}>Price Sniper</h2>
            <Form>
                <Form.Label>Enter Search Value</Form.Label>
                <InputGroup className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder={placeholder}
                        onChange={(event) => {
                            let temp = event.currentTarget.value;
                            setSearchValue(temp);
                        }}
                    />
                    <Button variant="outline-primary"
                        onClick={() => {handleOnSniperSearchSubmit()}}
                    >Submit</Button>
                </InputGroup>
                <Form.Text className="text-muted">
                    Currently we will look for data on Lauritz.com
                </Form.Text>
            </Form>
        </Container>
    )
}

export default SniperForm;