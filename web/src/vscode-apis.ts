import { GlobalState } from "./atoms/global-atom";

declare var acquireVsCodeApi: any;

export const vscodeAPIInstance =
    typeof acquireVsCodeApi === "function"
        ? acquireVsCodeApi()
        : {
            postMessage: (e: any) => {
                if (e?.action) {
                    if (e.promiseId) {
                        if (e.action === "GET_INITIAL_VALUES") {
                            promiseQueue[e.promiseId].resolve({ view: "getting-started" });
                        }
                    }
                }
            },
            postMessageAndWait: () => { },
            onReply: () => { },
        };

const promiseQueue: { [key: string]: any } = {};

const uuidv4 = () => {
    const gen = (c: string) => {
        var r = (Math.random() * 16) | 0,
            v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    };
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, gen);
};

const vscodeAPI = {
    postMessage: (message: { action: string; payload: { [key: string]: any } }) => {
        vscodeAPIInstance.postMessage(message);
    },
    postMessageAndWait: (message: { action: string; payload: { [key: string]: any } }) => {
        const promiseId = uuidv4();
        vscodeAPIInstance.postMessage({ ...message, isWaiting: true, promiseId });
        return new Promise(resolve => {
            promiseQueue[promiseId] = { resolve };
        });
    },
    onReply: (message: any) => {
        promiseQueue[message.promiseId].resolve(message);
    },
};

/**
 *
 */

const getInitialValues = async () => {
    console.log("inside vscodeapi react, getInitialValue")
    const data = await vscodeAPI.postMessageAndWait({ action: "GET_INITIAL_VALUES", payload: {} }) as GlobalState;
    console.log("data", data);
    return data;
};

/**
 * 
 */
const vscodeAPIs = {
    getInitialValues
};

export default vscodeAPIs;