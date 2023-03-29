import { makeAutoObservable, runInAction } from 'mobx';
import { ComponentLoggingConfig } from '@utils/ComponentLoggingConfig';
import { Constants } from '@utils/Constants';
import { RootStore } from './RootStore';
import UserRegistrationDTO from '@models/DTO/UserRegistrationDTO';
import { AuthService } from '@services/AuthService';
import UserLoginDTO from '@models/DTO/UserLoginDTO';
import { WebAPIResponse } from '@services/IAPIService';


export class AuthStore {
    private static _Instance: AuthStore;
    private rootStore: RootStore;
    private prefix: string = `%c[BackofficeStore]`;
    private color: string = ComponentLoggingConfig.DarkPurple;
    private loaded: boolean = false;
    private authService: AuthService;
    private userRole: string;
    private _userAuthenticated: boolean = false;
    private accessToken: string;


    constructor(_rootStore: RootStore, _authService: AuthService) {
        this.authService = _authService;
        this.rootStore = _rootStore;
        makeAutoObservable(this);
    }

    public async init(): Promise<boolean> {


        if (Constants.loggingEnabled) {
            console.log(`${this.prefix} initialized!`, this.color);
        }
        runInAction(() => {
            this.loaded = true;
        })
        return this.loaded;
    }

    public static GetInstance(_rootStore: RootStore, _authService: AuthService): AuthStore {
        if (!AuthStore._Instance) {
            AuthStore._Instance = new AuthStore(_rootStore, _authService);
        }
        return AuthStore._Instance;
    }

    public get isLoaded(): boolean {
        return this.loaded;
    }

    public get userAuthenticated(): boolean {
        return this._userAuthenticated;
    }

    public setUserAuthenticated(value: boolean) {
        runInAction(() => {
            this._userAuthenticated = value;
        });
    }

    public async registerUser(userRegistrationDTO: UserRegistrationDTO): Promise<WebAPIResponse> {
        return await this.authService.registerUser(userRegistrationDTO);
    }

    public async login(userLoginDTO: UserLoginDTO): Promise<boolean> {
        let response;
        try {
            response = await this.authService.login(userLoginDTO);

        } catch (err) {
            console.error(err);
        }
        if (response && response !== "") {
            this._userAuthenticated = true;
            this.setToken(response);
            return true;
        }
        return false;
    }

    private setToken(token: string): void {
        // TODO: Set token in localstorage and AuthStore and assign role
    }
}
