import * as vscode from 'vscode';
import * as fs from "fs";
import * as os from "os";
import * as path from "path";

function html(exPath: string,) {
    console.log("inside html", path.join(exPath, "media", "index.html"));
    return fs.readFileSync(path.join(exPath, "media", "index.html"), {
        encoding: "utf-8",
    });
}

class ActivityBarWebview_1 implements vscode.WebviewViewProvider {
    public static readonly viewType = "chatbot_poc_activity_bar_1";
    public webviewView: vscode.WebviewView | null = null;

    context: vscode.ExtensionContext;

    constructor(context: vscode.ExtensionContext) {
        this.context = context;
    }

    public resolveWebviewView(webviewView: vscode.WebviewView) {
        this.webviewView = webviewView;
        webviewView.webview.options = {
            enableScripts: true,
        };
        webviewView.webview.onDidReceiveMessage(this.onDidReceiveMessageHandler);
        webviewView.webview.html = html(this.context.extensionPath);
    }
    onDidReceiveMessageHandler = async ({ action, payload, promiseId }: { action: string; payload: { [key: string]: any }; promiseId: string }) => {
        console.log("insied message handler")
        switch (action) {
            case "GET_INITIAL_VALUES": {
                console.log("inside getInitalvaiulsue")
                this.webviewView?.webview.postMessage({
                    view: ActivityBarWebview_1.viewType,
                });
                break;
            }
        }
    };
}

const webviewContainer = {
    ActivityBarWebview_1,
};

export default webviewContainer;