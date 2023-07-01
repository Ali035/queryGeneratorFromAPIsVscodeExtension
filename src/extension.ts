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
  let disposable1 = vscode.commands.registerCommand(
    "api-generator.createFormsFiles",
    createFormsFiles
  );
  let disposable2 = vscode.commands.registerCommand(
    "api-generator.createGroupFormsFiles",
    createGroupFormsFiles
  );

  context.subscriptions.push(disposable);
  context.subscriptions.push(disposable1);
  context.subscriptions.push(disposable2);
}
function createFormsFiles(args: vscode.Uri) {
  vscode.window
    .showInputBox({
      ignoreFocusOut: true,
      placeHolder: "e.g. `medical device - device`",
      title: "Please enter folder name - entity name",
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

      const incomingPath = args.path;
      const newFolderPath = incomingPath + path.sep + "registration";

      if (fs.existsSync(newFolderPath)) {
        vscode.window.showErrorMessage("Folder already exists.");
        return;
      }

      fs.mkdirSync(newFolderPath);
      openTemplateAndSaveNewFile(
        "formFields",
        entityName,
        entityName,
        newFolderPath,
        false,
        "registrationFormTemplates",
        incomingPath,
        folderName,
        ".tsx"
      );
      openTemplateAndSaveNewFile(
        "formikHandler",
        entityName,
        entityName,
        newFolderPath,
        false,
        "registrationFormTemplates",
        incomingPath,
        folderName,
        ".tsx"
      );
      openTemplateAndSaveNewFile(
        "IForm",
        entityName,
        entityName,
        newFolderPath,
        false,
        "registrationFormTemplates",
        incomingPath,
        folderName,
        ".ts"
      );
      openTemplateAndSaveNewFile(
        "form",
        entityName,
        entityName,
        newFolderPath,
        true,
        "registrationFormTemplates",
        incomingPath,
        folderName,
        ".tsx"
      );
    });
}

function createGroupFormsFiles(args: vscode.Uri) {
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
      let newFolderPath = incomingPath + path.sep + "groupRegistration";

      if (fs.existsSync(newFolderPath)) {
        vscode.window.showErrorMessage("Folder already exists.");
        return;
      }

      fs.mkdirSync(newFolderPath);
      openTemplateAndSaveNewFile(
        "formFields",
        entityName,
        pluralEntityName,
        newFolderPath,
        false,
        "groupRegistrationTemplates",
        incomingPath,
        folderName,
        ".tsx"
      );
      openTemplateAndSaveNewFile(
        "formikHandler",
        entityName,
        pluralEntityName,
        newFolderPath,
        false,
        "groupRegistrationTemplates",
        incomingPath,
        folderName,
        ".tsx"
      );
      openTemplateAndSaveNewFile(
        "IForm",
        entityName,
        pluralEntityName,
        newFolderPath,
        false,
        "groupRegistrationTemplates",
        incomingPath,
        folderName,
        ".ts"
      );
      openTemplateAndSaveNewFile(
        "form",
        entityName,
        pluralEntityName,
        newFolderPath,
        true,
        "groupRegistrationTemplates",
        incomingPath,
        folderName,
        ".tsx"
      );

      newFolderPath = incomingPath + path.sep + "registration";
      fs.mkdirSync(newFolderPath);
      openTemplateAndSaveNewFile(
        "formFields",
        entityName,
        entityName,
        newFolderPath,
        false,
        "registrationFormTemplates",
        incomingPath,
        folderName,
        ".tsx"
      );
      openTemplateAndSaveNewFile(
        "formikHandler",
        entityName,
        entityName,
        newFolderPath,
        false,
        "registrationFormTemplates",
        incomingPath,
        folderName,
        ".tsx"
      );
      openTemplateAndSaveNewFile(
        "IForm",
        entityName,
        entityName,
        newFolderPath,
        false,
        "registrationFormTemplates",
        incomingPath,
        folderName,
        ".ts"
      );
    });
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
        newFolderPath,
        false,
        "templates",
        incomingPath,
        folderName,
        ".ts"
      );
      openTemplateAndSaveNewFile(
        "api",
        entityName,
        pluralEntityName,
        newFolderPath,
        false,
        "templates",
        incomingPath,
        folderName,
        ".ts"
      );
      openTemplateAndSaveNewFile(
        "queries",
        entityName,
        pluralEntityName,
        newFolderPath,
        false,
        "templates",
        incomingPath,
        folderName,
        ".ts"
      );
      openTemplateAndSaveNewFile(
        "index",
        entityName,
        pluralEntityName,
        newFolderPath,
        false,
        "templates",
        incomingPath,
        folderName,
        ".ts"
      );
    });
}

function openTemplateAndSaveNewFile(
  filename: string,
  featureName: string,
  pluralFeatureName: string,
  folderPath: string,
  outerFile: boolean,
  templateFolderName:
    | "templates"
    | "registrationFormTemplates"
    | "groupRegistrationTemplates",
  originalPath: string,
  folderName: string,
  fileExtension: ".ts" | ".tsx"
) {
  const templateFileName = filename + ".tmpl";
  const extension = vscode.extensions.getExtension("AliPourpanah.api-scaffold");
  if (!extension) {
    vscode.window.showErrorMessage("Unable to found extension");
    return;
  }
  const templateFilePath =
    extension.extensionPath +
    path.sep +
    templateFolderName +
    path.sep +
    templateFileName;
  if (!fs.existsSync(templateFilePath)) {
    vscode.window.showErrorMessage(`Unable to find file '${templateFilePath}'`);
    return;
  }
  let filePath =
    (!outerFile ? folderPath : originalPath) +
    path.sep +
    filename +
    fileExtension;
  if (outerFile && fs.existsSync(filePath)) {
    filePath =
      (!outerFile ? folderPath : originalPath) +
      path.sep +
      filename +
      "(copy)" +
      fileExtension;
    filename = filename + "(copy)";
  }
  if (fs.existsSync(filePath)) {
    vscode.window.showErrorMessage(
      `${filename + fileExtension} already exists.`
    );
    return;
  }

  vscode.workspace
    .openTextDocument(templateFilePath)
    .then((doc: vscode.TextDocument) => {
      let text = doc.getText();
      const regex = /\${featureName}/gi;
      const pluralRegex = /\${pluralFeatureName}/gi;
      const folderNameRegex = /\${folderName}/gi;
      text = text.replace(regex, featureName);
      text = text.replace(pluralRegex, pluralFeatureName);
      text = text.replace(folderNameRegex, folderName);
      fs.writeFileSync(filePath, text);
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
