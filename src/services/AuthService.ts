import { Constants } from "@utils/Constants";
import CrudHelper from "./CrudHelper";
import { IAuthService } from "./IAuthService";
import { ComponentLoggingConfig } from "@utils/ComponentLoggingConfig";
import UserLoginDTO from "@models/DTO/UserLoginDTO";
import UserRegistrationDTO from "@models/DTO/UserRegistrationDTO";

export class AuthService implements IAuthService {

    private prefix: string = `%c[APIService]`;
    private color: string = ComponentLoggingConfig.Lightgreen;
    private apiBaseUrl: string;
    private crudHelper: CrudHelper;
    private loggingEnabled: boolean = Constants.loggingEnabled;

    constructor(_apiBaseUrl: string) {
        this.apiBaseUrl = _apiBaseUrl;
        this.crudHelper = new CrudHelper(Constants.loggingEnabled);

        if (Constants.loggingEnabled) {
            console.log(`${this.prefix} initialized!`, this.color);
        }
    }

    async registerUser(userRegistrationDTO: UserRegistrationDTO): Promise<void> {
        return await this.crudHelper.create(`${this.apiBaseUrl}/Auth/Register`, "userRegistrationDTO", userRegistrationDTO);
    }
    async login(userLoginDTO: UserLoginDTO): Promise<string> {
        const t1 = performance.now();
        if (this.loggingEnabled) {
            console.log(`${this.prefix} attempting to create userRegistrationDTO`, this.color);
        }

        try {
            const response = await fetch(`${this.apiBaseUrl}`, {
                method: 'GET',
                body: JSON.stringify(userLoginDTO),
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                if (this.loggingEnabled) {
                    const t2 = performance.now();
                    ComponentLoggingConfig.printPerformanceMessage(`${this.prefix} Status: (${response.status}) Statusmessage: (${response.statusText})`, t1, t2, this.color);
                }
                return await response.json() as string;
            } else {
                console.log(`${this.prefix} failed to login user  ${userLoginDTO.email}. Status: ${response.status} ${response.statusText}`, this.color);
                return "";
            }
        } catch (error) {
            console.error("Error", error);
        }
    }
}
