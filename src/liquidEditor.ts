import { Editor } from "./shared/editor";

class LiquidEditor extends Editor<string> {
  textToValue(content: string): string {
    return content;
  }

  valueToText(content: string): string {
    return content;
  }
}

export { LiquidEditor };

