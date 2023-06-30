import {Component, OnInit, ViewChild} from '@angular/core';
import { SwiperComponent } from 'swiper/angular';
import {Navigation, SwiperOptions} from "swiper";
import SwiperCore, { Pagination } from 'swiper';

SwiperCore.use([Pagination, Navigation]);

@Component({
  selector: 'app-onboarding',
  templateUrl: 'onboarding.page.html',
  styleUrls: ['onboarding.page.scss'],
})
export class OnboardingPage implements OnInit  {
  @ViewChild('swiper') swiper: SwiperComponent;

  config : SwiperOptions ={
    pagination: true,
  }


  onSlideChange() {
   /* if (!this.isLastSlide()) {
      this.continueOnboarding();
    }*/
    this.swiper.swiperRef.slideNext();
  }

  continueOnboarding() {
    this.swiper.swiperRef.slideNext();
  }

  isLastSlide() {
   // return this.swiper.swiperRef.isEnd;
  }

  onSwiperReady() {
    //const swiper = this.swiper.swiperRef;
    //swiper.lockSwipes();
  }

  ngOnInit(): void {
  }
}
