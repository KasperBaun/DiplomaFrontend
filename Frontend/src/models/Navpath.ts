export class Navpath {
    navigationClick: () => void;
    title: string;
    icon?: JSX.Element;
    child?: Navpath[];
}

export type NavPath = {
    path: string;
    text: string;
  }