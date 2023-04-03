export interface INavpath {
    navigationClick: () => void;
    title: string;
    icon?: JSX.Element;
    child?: INavpath[];
}