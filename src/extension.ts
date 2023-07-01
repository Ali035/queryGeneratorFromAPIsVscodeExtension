// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "api-generator.createFiles",
    createFiles
  );

  context.subscriptions.push(disposable);
}

function createFiles(args: vscode.Uri) {
  vscode.window
    .showInputBox({
      ignoreFocusOut: true,
      placeHolder: "e.g. `medical device - device - devices`",
      title:
        "Please enter folder name - entity name - plural form of your entity",
      prompt: "Your given names will change to camelCase format.",
    })
    .then((featureName) => {
      if (featureName === undefined) {
        return;
      }
      const splitedName = featureName.split("-");
      const folderName = lowerCaseFirstLetter(camelCase(splitedName[0]));
      const entityName =
        splitedName.length === 1
          ? capitalizeFirstLetter(folderName)
          : capitalizeFirstLetter(camelCase(splitedName[1]));

      const pluralEntityName =
        splitedName.length > 2
          ? capitalizeFirstLetter(camelCase(splitedName[2]))
          : entityName + "s";
      const incomingPath = args.path;
      const newFolderPath = incomingPath + path.sep + folderName;

      if (fs.existsSync(newFolderPath)) {
        vscode.window.showErrorMessage("Folder already exists.");
        return;
      }

      fs.mkdirSync(newFolderPath);
      openTemplateAndSaveNewFile(
        "type",
        entityName,
        pluralEntityName,
        newFolderPath
      );
      openTemplateAndSaveNewFile(
        "api",
        entityName,
        pluralEntityName,
        newFolderPath
      );
      openTemplateAndSaveNewFile(
        "queries",
        entityName,
        pluralEntityName,
        newFolderPath
      );
      openTemplateAndSaveNewFile(
        "index",
        entityName,
        pluralEntityName,
        newFolderPath
      );
    });
}

function openTemplateAndSaveNewFile(
  filename: "api" | "index" | "queries" | "type",
  featureName: string,
  pluralFeatureName: string,
  folderPath: string
) {
  const templateFileName = filename + ".tmpl";
  const extension = vscode.extensions.getExtension("AliPourpanah.api-scaffold");
  if (!extension) {
    vscode.window.showErrorMessage("Unable to found extension");
    return;
  }
  const filePath = extension.extensionPath + "/templates/" + templateFileName;
  if (!fs.existsSync(filePath)) {
    vscode.window.showErrorMessage(`Unable to find file '${filePath}'`);
    return;
  }
  vscode.workspace
    .openTextDocument(filePath)
    .then((doc: vscode.TextDocument) => {
      let text = doc.getText();
      const regex = /\${featureName}/gi;
      const pluralRegex = /\${pluralFeatureName}/gi;
      text = text.replace(regex, featureName);
      text = text.replace(pluralRegex, pluralFeatureName);
      const file = folderPath + path.sep + filename + ".ts";
      fs.writeFileSync(file, text);
    });
}

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function lowerCaseFirstLetter(str: string) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

function camelCase(str: string) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
}

// This method is called when your extension is deactivated
export function deactivate() {}
