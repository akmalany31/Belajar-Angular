import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, HostListener, Inject, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective implements OnInit{

  // ini input kalau mau warnanya diinput sendiri, kalau ga mah hapus aja
  // ini kan pake color:, bisa juga langsung pake nama selectornya. contoh: 
  // input kaya dibawah appHover: string = 'red', lalu pass ke bawah yg asalnya this.color jadi this.appHover. 
  // Jadi pas di htmlnya gausah appHover color='red', tinggal appHover='red' aja
  @Input() color: string = 'red';

  constructor(
    private element: ElementRef,
    private renderer: Renderer2
    ) {
        console.log(this.element.nativeElement);
      }

  ngOnInit(): void {
    // elementRef
    // this.element.nativeElement.style.backgroundColor = this.color;

    // renderer
    this.renderer.setStyle( 
      this.element.nativeElement,
      'backgroundColor',
      this.color
    );
  }

  // kalau mousenya mengarah ke area yang dikasih selector apphover, nanti ganti warna jadi green
  @HostListener('mouseenter') onmouseenter(){
    this.renderer.setStyle( 
      this.element.nativeElement,
      'backgroundColor',
      'green'
    )
  }; 

  // kalau ga ngarah lagi warnanya jadi putih
  @HostListener('mouseleave') onmouseleave(){
    this.renderer.setStyle( 
      this.element.nativeElement,
      'backgroundColor',
      'white'
    )
  }; 
}
