import { Component, ElementRef, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { LoggerService } from './logger.service';
import { localStorageToken } from './localstorage.token';
import { InitService } from './init.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'hotelinventoryapp';

  // Jika static: true, maka ViewChild akan bisa diakses di ngOnInit. Jika static: false, maka ViewChild baru bisa diakses setelah view selesai, yaitu di ngAfterViewInit.
  @ViewChild('name', { static: true }) name!: ElementRef;

  constructor(@Optional() private loggerService: LoggerService,
  @Inject(localStorageToken) private localStorage: any,
  private initService: InitService
  ){
    console.log(initService.config);
  }

  ngOnInit() {
    this.loggerService?.log('AppComponent, ngOnInit()');
    this.name.nativeElement.innerText = "Hotel Inventory App";
    this.localStorage.setItem('name', 'Hotel Inventory App');
  }

  // Saat ingin membuat komponen secara dinamis, misalnya popup, notifikasi, form yang berubah-ubah. 

  // @ViewChild('user', {read: ViewContainerRef}) ver!: ViewContainerRef;

  // ngAfterViewInit() {
  //   const componentRef = this.ver.createComponent(RoomsComponent);
  //   componentRef.instance.numberOfRooms = 50;
  // }
}
