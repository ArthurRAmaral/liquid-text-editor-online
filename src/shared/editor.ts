import { Observable, ReplaySubject } from "rxjs";

export abstract class Editor<T> {
  private onChangeSubject = new ReplaySubject<T>(1);

  constructor(protected editor: HTMLTextAreaElement, initialContent: T) {
    editor.value = this.valueToText(initialContent);
    this.registerOnChange();
  }

  private registerOnChange() {
    this.editor.addEventListener("input", (event) => {
      const { value } = event.target as HTMLTextAreaElement;
      this.handleNewValue(value);
    });
  }

  protected handleNewValue(value: string, updateValue = false) {
    try {
      const content = this.textToValue(value || "");
      this.onChangeSubject.next(content);

      if (updateValue) {
        this.editor.value = this.valueToText(content);
      }
    } catch (e) {
      this.editor.value = this.catchToValueErro(value, e);
    }
  }

  abstract textToValue(content: string): T;
  abstract valueToText(content: T): string;
  abstract catchToValueErro(errorValue: string, content: any): string;

  public get onChange(): Observable<T> {
    return this.onChangeSubject.asObservable();
  }
}

