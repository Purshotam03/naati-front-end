import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AudioRecorderPage } from './audio-recorder.page';

describe('AudioRecorderPage', () => {
  let component: AudioRecorderPage;
  let fixture: ComponentFixture<AudioRecorderPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AudioRecorderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
