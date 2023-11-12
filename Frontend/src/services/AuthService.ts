import { Constants } from "@utils/Constants";
import { IAuthService } from "./IAuthService";
import { ComponentLoggingConfig } from "@utils/ComponentLoggingConfig";
import { UserLoginDTO } from "@models/DTO/UserLoginDTO";
import { UserRegistrationDTO } from "@models/DTO/UserRegistrationDTO";
import { WebAPIResponse } from "@models/types/WebApiResponse";

export class AuthService implements IAuthService {

    private prefix: string = `%c[AuthService]`;
    private color: string = ComponentLoggingConfig.Lightgreen;
    private apiBaseUrl: string;
    private loggingEnabled: boolean = Constants.loggingEnabled;
    private headers: HeadersInit = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    };
    private mode: RequestMode = 'cors';

    constructor(_apiBaseUrl: string) {
        this.apiBaseUrl = _apiBaseUrl;

        if (Constants.loggingEnabled) {
            console.log(`${this.prefix} initialized!`, this.color);
        }
    }

    async registerUser(userRegistrationDTO: UserRegistrationDTO): Promise<WebAPIResponse> {
        const t1 = performance.now();
        if (this.loggingEnabled) {
            console.log(`${this.prefix} attempting to create userRegistrationDTO`, this.color);
        }

        try {
            const userRegistrationJson = JSON.stringify(userRegistrationDTO);
            console.log("userReg", userRegistrationJson);
            const response = await fetch(`${this.apiBaseUrl}/Auth/Register`, {
                method: 'POST',
                body: userRegistrationJson,
                headers: this.headers,
                mode: this.mode
            });

            if (response.ok) {
                if (this.loggingEnabled) {
                    const t2 = performance.now();
                    ComponentLoggingConfig.printPerformanceMessage(`${this.prefix} Status: (${response.status}) Statusmessage: (${response.statusText})`, t1, t2, this.color);
                }

                return {
                    message: response.statusText,
                    statusCode: response.status,
                    success: response.ok,
                    data: await response.json() as UserRegistrationDTO
                }
            } else {
                console.log(`${this.prefix} failed to create user  ${userRegistrationDTO.email}. Status: ${response.status} ${response.statusText}`, this.color);
                return {
                    message: response.statusText,
                    statusCode: response.status,
                    success: false
                }
            }
        } catch (error) {
            console.error("Error", error);
        }
    }

    async login(userLoginDTO: UserLoginDTO): Promise<string> {
        const t1 = performance.now();
        if (this.loggingEnabled) {
            console.log(`${this.prefix} attempting to login user: ${userLoginDTO.email}`, this.color);
        }

        try {
            const response = await fetch(`${this.apiBaseUrl}/Auth/Login`, {
                method: 'POST',
                body: JSON.stringify(userLoginDTO),
                headers: this.headers,
                mode: this.mode
            });

            if (response.ok) {
                if (this.loggingEnabled) {
                    const t2 = performance.now();
                    ComponentLoggingConfig.printPerformanceMessage(`${this.prefix} Status: (${response.status}) Statusmessage: (${response.statusText})`, t1, t2, this.color);
                }
                const token = await response.text();
                return token;
            } else {
                console.log(`${this.prefix} failed to login user  ${userLoginDTO.email}. Status: ${response.status} ${response.statusText}`, this.color);
                return "";
            }
        } catch (error) {
            console.error("Error", error);
        }
    }
}
