import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { UsersService } from './../../shared/services/users.service';
import { NgxSpinnerService } from "ngx-spinner";  

import * as xlsx from 'xlsx';

@Component({
  templateUrl: 'consumomensual.component.html'
})
export class ConsumomensualComponent implements OnInit {
 @ViewChild('epltable', { static: false }) epltable: ElementRef;

 inicio: any;
  fin: any;
  periodo = new Date().getFullYear();
  periodos = [
	{anio: 2020, description: '2020'	}	
  ];
  mensaje = '';
  consumos = [];
  consumos2 = [
	{id: 1, mes: "Enero", consumo: '125', precio: "250.00"	},
	{id: 2, mes: "Febrero", consumo: '145', precio: "290.00"	},
	{id: 3, mes: "Marzo", consumo: '70', precio: "140.00"	}
  ];

  constructor(public usersService: UsersService, private SpinnerService: NgxSpinnerService) { 
   this.inicio = new Date().toISOString().split('T')[0];
   this.fin = new Date().toISOString().split('T')[0];
  }


 exportToExcel() {
  const ws: xlsx.WorkSheet =   
  xlsx.utils.table_to_sheet(this.epltable.nativeElement);
  const wb: xlsx.WorkBook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
  xlsx.writeFile(wb, 'reporteMensual.xlsx');
 }
 
	ngOnInit() {
		this.load();
	}

	public load() {

		let request = {
			body: { token: localStorage.getItem('token'),
					periodo: this.periodo
				  }			
		};

	this.SpinnerService.show();  
	this.usersService.rptAquaMonth(request).subscribe((res) => {
		console.log("rptAquaMonth")	
		console.log(res)	
      if (res.error == null) {
		console.log('Inicio rptAquaMonth');		  
		console.log(res.body);		  
		this.consumos = res.body;
        //this.router.navigate(['dashboard']);

		this.SpinnerService.hide();  

      } else {
		console.log("Error rptAquaMonth")		  
		console.log(res.error);		  
		this.SpinnerService.hide();  
	  }
	  
    }, error => ( this.mensaje = 'Ocurrió un error, volver a intentar' )
	)
	
	
	}

  
}
