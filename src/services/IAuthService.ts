import UserLoginDTO from "@models/DTO/UserLoginDTO";
import UserRegistrationDTO from "@models/DTO/UserRegistrationDTO";
import { WebAPIResponse } from "./IAPIService";

export interface IAuthService {
    registerUser(userRegistrationDTO: UserRegistrationDTO): Promise<WebAPIResponse>;
    login(userLoginDTO: UserLoginDTO): Promise<string>;
}