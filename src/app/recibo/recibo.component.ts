import {Component} from '@angular/core';

import * as pdfMake from 'pdfmake/build/pdfmake';


@Component({
  selector: 'app-recibo',
  templateUrl: './recibo.component.html',
  standalone: false,
  styleUrls: ['./recibo.component.scss']
})
export class ReciboComponent {
  cliente = 'João Chiziane';
  data = new Date();
  descricao = 'Serviços de transporte - Viagem Maputo a Xai-Xai';
  valor = 5000;

  gerarPDF() {
    const docDef: any = {
      content: [
        {text: 'Transportes Chiziane', style: 'header'},
        {text: 'Recibo de Pagamento', style: 'subheader'},
        {text: `Cliente: ${this.cliente}`},
        {text: `Data: ${this.data.toLocaleDateString()}`},
        {text: `Descrição: ${this.descricao}`},
        {text: `Valor: ${this.valor} MZN`, bold: true, margin: [0, 10, 0, 0]},
        {text: '\n\nAssinatura: ____________________________', margin: [0, 30, 0, 0]},
      ],
      styles: {
        header: {fontSize: 18, bold: true, alignment: 'center', margin: [0, 0, 0, 10]},
        subheader: {fontSize: 14, bold: true, margin: [0, 10, 0, 10]}
      }
    };

    pdfMake.createPdf(docDef).open();
  }
}
