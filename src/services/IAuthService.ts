import UserLoginDTO from "@models/DTO/UserLoginDTO";
import UserRegistrationDTO from "@models/DTO/UserRegistrationDTO";

export interface IAuthService {
    registerUser(userRegistrationDTO: UserRegistrationDTO): Promise<void>;
    login(userLoginDTO: UserLoginDTO): Promise<string>;
}