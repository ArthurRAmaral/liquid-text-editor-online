import { Observable } from "rxjs";
import { Liquid } from "liquidjs";

export class LiquidPreviewer {
  private template!: string;
  private data!: any;
  private engine = new Liquid();

  constructor(
    private previewer: HTMLElement,
    template: Observable<string>,
    data: Observable<any>
  ) {
    template.subscribe((template) => {
      this.template = template;
      this.render();
    });

    data.subscribe((data) => {
      this.data = data;
      this.render();
    });
  }

  private render() {
    if (this.template && this.data) {
      try {
        const result: string = (this.previewer.innerHTML =
          this.engine.parseAndRenderSync(this.template, this.data));
        this.previewer.innerHTML = result
          .replaceAll(`\\n`, `<br>`)
          .replaceAll(`\n`, `<br>`);
      } catch (err) {
        this.previewer.textContent = "Error";
      }

      return;
    }

    this.previewer.textContent = "No data";
  }
}

