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
  deviceSelected = { alias: '', apellido: '', descripcion_servicio: '', finalizacion: '', inscripcion: '', nombre: '', serie: ''  };
  device = '';
  periodo = 'm';
  devices = [ 
  { alias: '', apellido: '', descripcion_servicio: '', finalizacion: '', inscripcion: '', nombre: '', serie: ''  }
  ];
  periodos = [
	{ codigo: 'h', description: 'Diario'	},	
	{ codigo: 'd', description: 'Semanal'	},
	{ codigo: 'm', description: 'Mensual'	},
	{ codigo: 'a', description: 'Anual'	}
  ];
  mensaje = '';
  consumosaqua = [];
  consumos2 = [
	{id: 1, mes: "Enero", consumo: '125', precio: "250.00"	},
	{id: 2, mes: "Febrero", consumo: '145', precio: "290.00"	},
	{id: 3, mes: "Marzo", consumo: '70', precio: "140.00"	}
  ];

  constructor(public usersService: UsersService, private SpinnerService: NgxSpinnerService) { 
   this.inicio = new Date().toISOString().split('T')[0];
   this.fin = new Date().toISOString().split('T')[0];
   this.loadDevices();
  }


 exportToExcel() {
  const ws: xlsx.WorkSheet =   
  xlsx.utils.table_to_sheet(this.epltable.nativeElement);
  const wb: xlsx.WorkBook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
  xlsx.writeFile(wb, 'reporteMensual.xlsx');
 }
 
	ngOnInit() {
		//this.load();
	}

	public loadReporte() {
		console.log("INIC..........................");
		console.log("device:::"+this.device);
		this.load();
	
	}

	public loadDevices() {

		let request = {
			body: { token: localStorage.getItem('token')
				  }			
		};

	this.SpinnerService.show();  
	this.usersService.rptOnlyServicesByDevice(request).subscribe((res) => {
		console.log("rptOnlyServicesByDevice")	
		console.log(res)	
      if (res.error == null) {
		console.log('Inicio rptOnlyServicesByDevice');		  
		console.log(res.body.body);		  
		this.devices = res.body.body;
		this.SpinnerService.hide();  
		this.device = this.devices[0].serie;	
      } else {
		console.log("Error rptAquaMonth")		  
		console.log(res.error);		  
		this.SpinnerService.hide();  
	  }
	  
    }, error => ( this.mensaje = 'Ocurrió un error, volver a intentar' )
	)
	
	
	}



	public load() {

		let request = {
			body: { token: localStorage.getItem('token'),
					device: this.device,
					periodo: this.periodo
				  }			
		};

	this.SpinnerService.show();  

	///this.usersService.rptAquaMonth(request).subscribe((res) => {
	this.usersService.rptDashBoardDeviceClient(request).subscribe((res) => {
		console.log("rptAquaMonth")	
		console.log(res)	
      if (res.body.error == null) {
		console.log('Inicio rptDashBoardDeviceClient');		  
		console.log(res.body.body);		  
		this.consumosaqua = res.body.body.consumos;
        //this.router.navigate(['dashboard']);

		if(this.consumosaqua.length > 0) {
		let totallitro = 0;
		let totalmetro3 = parseFloat('0');
		let totalmonto =  parseFloat('0');
		
		for(var objets of this.consumosaqua) {
			totalmonto = totalmonto + parseFloat(objets.monto);
			totalmetro3 = totalmetro3 + parseFloat(objets.metro3);
			totallitro = totallitro + parseFloat(objets.litros);
		}
		
		//totalmetro3 = parseFloat(totalmetro3).toFixed(3);
		//totalmonto = parseFloat(totalmonto).toFixed(2);
		
		let item = {
			id: '099',
			litros: totallitro,
			mes: '',
			metro3: totalmetro3.toFixed(3),
			monto: totalmonto,
			periodo: 'TOTAL',
			values: 'TOTAL'		
		};		


		for(var dev of this.devices) {
			if(this.device == dev.serie) {
				this.deviceSelected = dev;
				console.log("this.deviceSelected:::::::::::::::")		  
				console.log(this.deviceSelected)		  
			}	
		}


		this.consumosaqua.push(item);
		}
		
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
