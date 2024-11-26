import { Component } from '@angular/core';
import { CnpjService } from '../cnpj/cnpj.service';

@Component({
  selector: 'app-cnpj-search',
  templateUrl: './cnpj-search.component.html',
  styleUrls: ['./cnpj-search.component.css']
})
export class CnpjSearchComponent {
  cnpj: string = '';
  cnpjDetails: any;
  errorMessage: string = '';

  constructor(private cnpjService: CnpjService) {}

  searchCnpj(): void {
    this.cnpjService.getCnpjDetails(this.cnpj).subscribe({
      next: (data) => {
        this.cnpjDetails = data;
        this.errorMessage = '';
      },
      error: (error) => {
        this.cnpjDetails = null;
        this.errorMessage = 'CNPJ não encontrado ou inválido.';
      }
    });
  }
}
