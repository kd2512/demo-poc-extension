import * as vscode from 'vscode';
import registerWebviews from './register-webviews';

export async function activate(context: vscode.ExtensionContext) {
	console.log("inside activate");
	registerWebviews(context); 
}


// This method is called when your extension is deactivated
export function deactivate() {}
