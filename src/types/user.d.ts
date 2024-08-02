export type Student = {
    age: number | null;
    class: number | null;
    gpa: number | null;
    name: string | null;
    sex: string | null;
    siblings: number | null;
    uuid: number | null;
    isNew?: boolean;
};

export type UpdateResponse = {
    success?: boolean;
    uuid?: number
}

export type APIInit = {
    method: string,
    headers?: any,
    body?: string,
}

export type InitialState = {
    recent: Student | null;
};

export type RootState = {
    lookupReducer: InitialState;
};