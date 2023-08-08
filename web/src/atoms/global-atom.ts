import { atom } from 'recoil';

export interface GlobalState {
    view: string;
    promiseId: string;
}

const defaultState: GlobalState = {
    view: "getting-started",
    promiseId: ""
};

const globalStateAtom = atom({
    key: "global-atom",
    default: defaultState,
});

export default globalStateAtom;