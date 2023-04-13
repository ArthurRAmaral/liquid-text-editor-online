import { Editor } from "./shared/editor";

class LiquidEditor extends Editor<string> {
  textToValue(content: string): string {
    return content;
  }

  valueToText(content: string): string {
    return content;
  }

  catchToValueErro(errorValue: string, content: any): string {
    console.error("Error parsing liquid template", content);
    return errorValue;
  }
}

export { LiquidEditor };

