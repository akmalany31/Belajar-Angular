import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-rooms-booking',
  templateUrl: './rooms-booking.component.html',
  styleUrls: ['./rooms-booking.component.scss']
})
export class RoomsBookingComponent implements OnInit {

  id: number = 0;

  // pake observable (rxjs), seperti map. Tapi params masih bisa error. 
  // id$ = this.router.params.pipe(map((params) => params['id']));

  // Pake ini aja, paramMap lebih aman dan lebih baik.
  id$ = this.router.paramMap.pipe(map((params) => params.get('id')));

  constructor(private router: ActivatedRoute) { }

  ngOnInit(): void {
    // ini coba pake subscribe, tapi ga direkomendasi, bisa memory leak.
    // this.router.params.subscribe((params) => {
    //   this.id = params['id'];
    // });

    // ini pake snapshot, tapi gabisa di beberapa kasus. Snapshot hanya mengambil nilai sekali saat komponen di-load. Tidak akan memperbarui nilai jika parameter berubah saat masih di halaman yang sama.
    // this.id = this.router.snapshot.params['id'];


  }

}
