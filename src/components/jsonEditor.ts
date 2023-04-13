import { Editor } from "../shared/editor";
import { Toast } from "../shared/toast";

class JsonEditor extends Editor<any> {
  textToValue(content: string): any {
    return JSON.parse(content);
  }

  valueToText(content: any): string {
    try {
      return JSON.stringify(content, null, 2);
    } catch (e) {
      return "";
    }
  }

  catchToValueErro(errorValue: string, content: any): string {
    new Toast(content.message, "error");
    // return (
    //   errorValue.slice(0, errorPosition) +
    //   `<span class="json-error">` +
    //   errorValue.slice(errorPosition, errorPosition + 1) +
    //   "</span>" +
    //   errorValue.slice(errorPosition + 1)
    // );

    return errorValue;
  }

  public beautify() {
    this.handleNewValue(this.editor.value, true);
  }
}

export { JsonEditor };

