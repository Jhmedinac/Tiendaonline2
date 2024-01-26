import { AfterViewInit, Component , ElementRef, ViewChild } from '@angular/core';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';
import { Card } from './../../models/card.model';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css']
})
export class CarruselComponent implements AfterViewInit {
  @ViewChild('swiper') swiper!: ElementRef<SwiperContainer>;
  @ViewChild('swiperThumbs') swiperThumbs!: ElementRef<SwiperContainer>;
  title = 'Tienda Online two';
  contents: Card[] = [
    {
      title: 'Computer',
      description: 'Description about computer...',
      url: 'https://picsum.photos/id/1/640/480',
    },
    {
      title: 'Building',
      description: 'Building description...',
      url: 'https://picsum.photos/id/101/640/480',
    },
    {
      title: 'Glass over a computer',
      description: 'Description of a glass over a computer',
      url: 'https://picsum.photos/id/201/640/480',
    },
    {
      title: 'Autumn',
      description: 'Description about autumn leaves',
      url: 'https://picsum.photos/id/301/640/480',
    },
    {
      title: 'Balloon',
      description: 'Coloured balloon',
      url: 'https://picsum.photos/id/401/640/480',
    },
  ];

  index = 0;

  // Swiper
  swiperConfig: SwiperOptions = {
    spaceBetween: 10,
    navigation: true,
  };

  swiperThumbsConfig: SwiperOptions = {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
  };

  ngAfterViewInit() {
    this.swiper.nativeElement.swiper.activeIndex = this.index;
    this.swiperThumbs.nativeElement.swiper.activeIndex = this.index;
  }

  onSlideChange(swiper: any) {
    // this.index =  ;
    // console.log(swiper.detail[0].activeIndex);
    // if (this.index!== 2) {
    //   this.index= 3;
    //   console.log('changed: ', 4);
    // }

    this.index = swiper.detail[0].activeIndex;
  }

  sliderOnChange(value: number) {
    if (this.index!== value) {
      this.index= value;
      console.log('changed: ', value);
    }
  }
