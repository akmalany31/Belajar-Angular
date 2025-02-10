import { AfterContentInit, Component, ContentChild, Host, OnInit } from '@angular/core';
import { EmployeeComponent } from '../employee/employee.component';
// import { RoomsService } from '../rooms/services/rooms.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  //providers: [RoomsService]
})
export class ContainerComponent implements OnInit, AfterContentInit {
  
  @ContentChild(EmployeeComponent) employee!: EmployeeComponent;

  //ini yang buat double ditampilan kalau di app-roomnya juga double. kalau di app-roomnya satu nanti 1 juga
  constructor(){}

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    console.log(this.employee);
    // this.employee.empName = 'Anna';
  }

}
