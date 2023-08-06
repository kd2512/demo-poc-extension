import {atom} from 'recoil';

export interface GlobalState {
    view: string;
}

const defaultState: GlobalState = {
    view: "getting-started",
};

const globalStateAtom = atom({
    key: "global-atom",
    default: defaultState,
});

export default globalStateAtom;