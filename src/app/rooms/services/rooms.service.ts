import { Inject, Injectable } from '@angular/core';
import { RoomList } from '../rooms';
import { environment } from 'src/environments/environment';
import { app_service_config } from 'src/app/AppConfig/appconfig.service';
import { AppConfig } from 'src/app/AppConfig/appconfig.interface';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { catchError, shareReplay, Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RoomsService {
  
  roomList : RoomList[] = [];
  
  //Ini harusnya api/rooms. Tapi jadi room dulu buat belajar catchError atau handle exception.
  // headers = new HttpHeaders({token: '1234abcd'});
  getRooms$ = this.http.get<RoomList[]>('api/rooms').pipe(shareReplay(1));
  

  private errorSubject = new Subject<string>();
  getError$ = this.errorSubject.asObservable(); // Observable buat error

  // getRooms$ = this.http.get<RoomList[]>('api/rooms').pipe(
  //   catchError((error) => {
  //     this.errorSubject.next(error.message); // Kirim error ke subscriber
  //     return throwError(() => new Error(error.message)); // Teruskan error jika perlu
  //   }),
  //   shareReplay(1)
  // );

  constructor(@Inject(app_service_config) private config:AppConfig,
  private http: HttpClient) { 
    console.log(this.config.apiEndpoint);
    console.log('Room Service Initialized...');
  }

  getRooms(){
    // katanya gausah https 3000 gitu, langsung aja kaya gini karena pake proxy
    return this.http.get<RoomList[]>('api/rooms');
  }

  // CRUD

  addRoom(room: RoomList){
    return this.http.post<RoomList[]>('api/rooms', room);
  }

  // ini tuh di apinya pake put, lalu pake ${}. Ini namanya put call. 
  // Backtick (`) di editRoom()`? 
  // Di dalam editRoom(), perlu menyisipkan nilai dinamis (room.roomNumber) ke dalam URL.
  // Kalau pakai tanda kutip biasa ('api/rooms/${room.roomNumber}'), itu akan dianggap sebagai string literal tanpa evaluasi.
  // Dengan backtick (`), ${room.roomNumber}` akan dievaluasi sebagai variabel, bukan teks biasa.
  editRoom(room: RoomList) {
    return this.http.put<RoomList[]>(`api/rooms/${room.roomNumber}`, room);
  }
  
  deleteRoom(id: string) {
    return this.http.delete<RoomList[]>(`api/rooms/${id}`);
  }

  // request foto dari API
  getPhotos() {
    const request = new HttpRequest(
      'GET', 
      // `${this.config.apiEndpoint}/api/rooms/photos`,
      `https://jsonplaceholder.typicode.com/photos`, 
      {
        reportProgress: true,
      }
    );
    return this.http.request(request);
  }
}
