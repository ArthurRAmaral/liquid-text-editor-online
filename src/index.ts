import "./styles/global.css";
import { JsonEditor } from "./components/jsonEditor";
import { LiquidPreviewer } from "./components/liquidPreview";
import { ReplaySubject } from "rxjs";
import { LiquidEditor } from "./components/liquidEditor";

// JSON
let initialData = {
  offer: {
    name: "OFFER_NAME",
  },
  order: {
    order_id: "ORDER_ID",
  },
  buyer: {
    user_id: "USER_ID",
  },
  refund_items: [
    {
      quantity: 123,
      name: "PROD_1",
      sku: 123,
    },
    {
      quantity: 234,
      name: "PROD_2",
    },
    {
      quantity: 356,
      name: "PROD_3",
      sku: 456,
    },
    {
      quantity: 456,
      name: "PROD_4",
    },
  ],
};

const dataSubject = new ReplaySubject<any>(1);
dataSubject.next(initialData);

const jsonTextArea = document.getElementById(
  "data-input"
) as HTMLTextAreaElement;
const jsonEditor = new JsonEditor(jsonTextArea, initialData);

jsonEditor.onChange.subscribe((content) => {
  dataSubject.next(content);
});

// Beautify JSON
const beautifyButton = document.getElementById("beautify-button");
beautifyButton?.addEventListener("click", () => {
  jsonEditor.beautify();
});

// Liquid
const initialLiquidTemplate = `Olá, tudo bem? Houve um estorno parcial em uma compra na lista {{offer.name}}, segue os detalhes do estorno:

Order Number = {{order.order_id}}

Cliente = {{buyer.user_id}}

Janela da Entrega = <Data da Entrega>  <Horário da Janela>

Valor estorno parcial:
{% for item in refund_items %}
  *{{item.quantity}} x {{item.name}}*
  {% if item.sku %}Variante = {{item.sku}}{% endif %}
{% endfor %}
`;

const templateSubject = new ReplaySubject<string>(1);
templateSubject.next(initialLiquidTemplate);

const liquidTemplateTextArea = document.getElementById(
  "template-input"
) as HTMLTextAreaElement;
const liquidEditor = new LiquidEditor(
  liquidTemplateTextArea,
  initialLiquidTemplate
);

liquidEditor.onChange.subscribe((content) => {
  templateSubject.next(content);
});

// Liquid Preview
const previewer = document.getElementById("preview-content") as HTMLElement;
new LiquidPreviewer(previewer, templateSubject, dataSubject);

