import { UserLoginDTO } from "@models/DTO/UserLoginDTO";
import { UserRegistrationDTO } from "@models/DTO/UserRegistrationDTO";
import { WebAPIResponse } from "@models/types/WebApiResponse";

export interface IAuthService {
    registerUser(userRegistrationDTO: UserRegistrationDTO): Promise<WebAPIResponse>;
    login(userLoginDTO: UserLoginDTO): Promise<string>;
}