import { Component, OnInit, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CnpjService } from './cnpj.service';
import { MessageService } from 'primeng/api';
import { CNPJData } from './cnpj-data.interface'; // Verifique se o caminho está correto

@Component({
  selector: 'app-cnpj',
  templateUrl: './cnpj.component.html',
  styleUrls: ['./cnpj.component.css']
})
export class CnpjComponent implements OnInit {
  @Input() titleHome = 'Consultando CNPJ';
  buscacnpj: string = '';
  buscar: boolean = false;
  dadosCnpj: CNPJData | null = null;

  constructor(
    private cnpjService: CnpjService,
    private messageService: MessageService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Buscando CNPJ');
  }

  buscarCNPJ(buscacnpj: string) {
    const cnpjLimpo = buscacnpj.replace(/[^0-9]/g, '');

    if (cnpjLimpo && cnpjLimpo.length === 14) {
      this.buscar = true;
      this.dadosCnpj = null;

      this.cnpjService.getCnpjDetails(cnpjLimpo).subscribe({
        next: (response: CNPJData) => {
          console.log('Dados retornados:', response);
          this.dadosCnpj = response;
          this.buscar = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'CNPJ encontrado'
          });
        },
        error: (error) => {
          console.error('Erro na consulta:', error);
          this.buscar = false;
          this.dadosCnpj = null;
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao consultar CNPJ'
          });
        }
      });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'CNPJ deve ter 14 dígitos'
      });
    }
  }

  formatarData(data: string): string {
    if (!data) return '';
    const date = new Date(data);
    return date.toLocaleDateString('pt-BR');
  }

  formatarCNPJ(cnpj: string): string {
    if (!cnpj) return '';
    return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
  }

  formatarCEP(cep: string): string {
    if (!cep) return '';
    return cep.replace(/^(\d{5})(\d{3})/, "$1-$2");
  }
}
