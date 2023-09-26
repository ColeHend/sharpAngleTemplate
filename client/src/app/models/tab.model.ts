

export interface Tab {
    name: string;
    component?: any;
    callback?: Function
    link?:Array<string | object>;
}