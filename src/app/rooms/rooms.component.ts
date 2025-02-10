import { AfterViewChecked, AfterViewInit, Component, DoCheck, OnInit, QueryList, SkipSelf, ViewChild, ViewChildren } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RoomList, Room } from './rooms';
import { RoomsService } from './services/rooms.service';
import { catchError, map, Observable, of, Subject, Subscription } from 'rxjs';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent  implements OnInit,DoCheck, AfterViewInit, AfterViewChecked {

  title = 'Room List';

  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  @ViewChildren(HeaderComponent) headerChildrenComponent!: QueryList<HeaderComponent>;

  numberOfRooms = 10;

  hideRooms = false;

  roomList: RoomList[] = [];

  // Ini coba observable pake yang RxJS, tanpa http. masi bingung juga. Ini katanya belajar stream data. Jadi observer ngirim data ke subscriber.
  stream = new Observable(observer => {
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.complete();
    //observer.error('error');
  });

  // coba pake asyncPipe
  subscription! : Subscription;

  //rooms$ = this.roomsService.getRooms$;
  //getError$ = this.roomsService.getError$; // Pakai dari service

  // Ini aku pindahin ke roomservice. karena bagusnya disana. 
  //subject -> base class for all the type dari stream
  error$ : Subject<string> = new Subject<string>();
  getError$ = this.error$.asObservable();

  // pake pipe buat handle exception i
  rooms$ = this.roomsService.getRooms$.pipe(
    catchError((error) => {
      // console.log(error);
      this.error$.next(error.message);
      return of([]);
    })
  );
  
  // Pake MAP
  roomsCount$ = this.roomsService.getRooms$.pipe(
    map(rooms => rooms.length)
  ) 

  // manual untuk instance services
  // roomService = new RoomServices();

  // with injection, lalu lebih baik diprivate agar ga semua template bisa akses. 
  constructor(private roomsService: RoomsService){}

  totalBytes = 0;

  ngOnInit(): void {
    this.roomsService.getPhotos().subscribe((event) => {
      // cek data
      // console.log(data);
      switch (event.type) {
        case (HttpEventType.Sent): {
          console.log('Request has been made!');
          break;
        }
        case (HttpEventType.ResponseHeader): {
          console.log('Response success!');
          break;
        }
        case (HttpEventType.DownloadProgress): {
          this.totalBytes+= event.loaded;
          break;
        }
        case (HttpEventType.Response): {
          console.log(event.body);
        }
      }
    });

    this.stream.subscribe({
      //ini data
      // next: (data) => console.log(data),
      //ini value, intinya bisa diganti namanya, ga harus data
      next: (value) => console.log(value),
      error: (err) => console.log(err),
      complete: () => console.log('complete')
    });
    this.stream.subscribe((data) => console.log(data));
    // ini tadi pake observable http si masuknya
    // this.roomsService.getRooms().subscribe(rooms => {
    //   this.roomList = rooms;
    // });
    // Lalu ini pake shareReplay(1) di service, jadi ga perlu subscribe lagi, maksudnya gaada pengulangan. 
    // this.subscription ini implementasi dari asyncPipe
    // this.subscription = this.roomsService.getRooms$.subscribe(rooms => {
    //   this.roomList = rooms;
    // });
  }

  toggle(){
    this.hideRooms = !this.hideRooms;
    // Jika hideRooms bernilai false, maka akan diubah menjadi true. Jika hideRooms bernilai true, maka akan diubah menjadi false.
    console.log('hideRooms:', this.hideRooms);
  }

  rooms : Room = {
    totalRooms: 20,
    availableRooms: 3,
    bookedRooms: 5
  }

  selectRoom(room : RoomList){
    // (this) Menyimpan data untuk digunakan di komponen.
    this.selectedRoom = room;
  }

  selectedRoom!: RoomList;

  addRoom(){
    const room : RoomList = {
      roomNumber: '',
      roomType: 'Single',
      amenities: 'AC, TV, Wifi',
      price: 300,
      photos: 'https://via.placeholder.com/150',
      checkInTime: new Date('12-Jan-2025'),
      checkOutTime: new Date('14-Jan-2025'),
      rating: 3.8964667,
    };
    // Menambahkan data room ke dalam roomList (tapi Mutability, data asli langsung diubah. Jadi mending pake konsep immutability, menggunakan changeDetection).
    //this.roomList.push(room); 

    //addroom yang API
    this.roomsService.addRoom(room).subscribe((data) => {
      this.roomList = data;
    });

    // Menambahkan data room ke dalam roomList (Immutability).
    // this.roomList = [...this.roomList, room]; 
    //... (spread operator) untuk nyalin array roomList ke array baru, lalu menambahkan data room ke dalam array baru tersebut.
  }

  editRoom(){
    const room : RoomList = {
      roomNumber: '3',
      roomType: 'Single',
      amenities: 'AC, TV, Wifi',
      price: 300,
      photos: 'https://via.placeholder.com/150',
      checkInTime: new Date('12-Jan-2025'),
      checkOutTime: new Date('14-Jan-2025'),
      rating: 3.8964667,
    };
    this.roomsService.editRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }

  deleteRoom(){
    this.roomsService.deleteRoom('3').subscribe((data) => {
      this.roomList = data;
    });
  }

  //lanjutan dari asyncPipe untuk unsubscribe
  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  ngDoCheck() {
    console.log('no changes is called');
  }
  
  ngAfterViewInit() {
    this.headerComponent.title = "Rooms View";
    this.headerChildrenComponent.last.title = "Last Name";
    // this.headerChildrenComponent.get(0).title = "First Name";
  }

  ngAfterViewChecked() {
    console.log('ngAfterViewChecked');
  }  
}

// getData -> addData -> getData

// getData -> continous stream of data -> addData