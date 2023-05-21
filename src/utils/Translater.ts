import { LanguageStore } from '@stores/LanguageStore';

export class Translater{
    
    getCategoryBasedOnLanguage(languageStore : LanguageStore , name: string){   
        const splitIndex = name.indexOf('|');

        if (languageStore.getCurrentLanguageCode() === "da_DK"){
            if (splitIndex > 0){
           let nameval = name.slice(0, splitIndex);
           return nameval;
            }
            else return name; 
        }
        else {
            if (splitIndex > 0){
                let nameval = name.slice(splitIndex+1, name.length+1);
                return nameval;
            }
            else return name;
        }
    }
}