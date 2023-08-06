import * as vscode from 'vscode';
import webviewContainer from './webview-container';

const registerWebviews = (context: vscode.ExtensionContext) => {
    console.log("inside regosterWebview")
    /**
     *
     */
    vscode.window.registerWebviewViewProvider(
        webviewContainer.ActivityBarWebview_1.viewType,
        new webviewContainer.ActivityBarWebview_1(context),
        {
            webviewOptions: { retainContextWhenHidden: true },
        },
    );
};

export default registerWebviews;