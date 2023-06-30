import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import WaveSurfer from "wavesurfer.js";
import RecordPlugin from "wavesurfer.js/dist/plugins/record";
import Crunker from "crunker";

interface QuestionData {
  questionUrl: string;
  answerUrl: string;
  answerFile: Blob;
}

@Component({
  selector: 'app-audio-recorder',
  templateUrl: './audio-recorder.page.html',
  styleUrls: ['./audio-recorder.page.scss'],
})
export class AudioRecorderPage implements OnInit {
  @ViewChild('waveform') waveformElement: ElementRef;
  @ViewChild('waveform1') waveformElement1: ElementRef;
  @ViewChild('waveformreview') waveformElement2: ElementRef;
  @ViewChild('waveformreview1') waveformElement3: ElementRef;

  chunks: Blob[] = [];
  waveform: WaveSurfer;
  waveform1: WaveSurfer;
  waveformreview: WaveSurfer;
  waveformreview1: WaveSurfer;

  isRecording: boolean = false;
  isRecordingCompleted: boolean = false;
  record: any;
  questionUrls: QuestionData[] = [
    {
      questionUrl: 'http://0.0.0.0:82/api/files/audio/audio1.mp3',
      answerUrl: '',
      answerFile: new Blob()
    },
    {
      questionUrl: 'http://0.0.0.0:82/api/files/audio/audio2.mp3',
      answerUrl: '',
      answerFile: new Blob()
    },
    {
      questionUrl: 'http://0.0.0.0:82/api/files/audio/audio3.mp3',
      answerUrl: '',
      answerFile: new Blob()
    },
    // Add more question URLs here
  ];
  currentQuestionIndex: number = 0;
  currentReviewIndex: number = 0;
  review: Boolean = false;

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.waveform = WaveSurfer.create({
      container: this.waveformElement.nativeElement,
      waveColor: 'green',
      progressColor: 'orange',
      cursorColor: '#b99d9d',
    });

    let crunker = new Crunker();
    this.loadQuestionAudio(this.questionUrls[this.currentQuestionIndex], crunker);

    this.record = this.waveform.registerPlugin(RecordPlugin.create());
    this.record.on('stopRecording', async () => {
      console.log(this.questionUrls)
      if (this.currentQuestionIndex < this.questionUrls.length - 1) {
        this.questionUrls[this.currentQuestionIndex].answerUrl = this.record.getRecordedUrl()
        const response = await fetch(this.record.getRecordedUrl());
        const blob = await response.blob();
        this.questionUrls[this.currentQuestionIndex].answerFile = blob;
        this.currentQuestionIndex++;
        this.waveform1.destroy();
        let crunker = new Crunker();
        this.loadQuestionAudio(this.questionUrls[this.currentQuestionIndex], crunker);
      } else {
        this.review = true;
        this.createReviewWaveForm();
      }
    })
  }

  async startAudio() {
    try {
      this.waveform1.play().then(() => {}).catch(e => {
        console.log(e);
      });
      this.isRecording = true;
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  }

  async stopRecording() {
    this.record.stopRecording();
    this.isRecording = false;
    this.isRecordingCompleted = true;

  }

  playAudio() {
    this.waveformreview.playPause().then(r => {});
  }

  playAudioAnswer() {
    this.waveformreview1.playPause().then(r => {});
  }

  loadQuestionAudio(questionData: QuestionData, crunker: Crunker) {
    this.waveform1 = WaveSurfer.create({
      container: this.waveformElement1.nativeElement,
      waveColor: 'purple',
      progressColor: 'purple',
      cursorColor: '#b99d9d',
    });
    crunker
      .fetchAudio(questionData.questionUrl, 'http://0.0.0.0:82/api/files/audio/chime.mp3')
      .then((buffers) => {
        return crunker.concatAudio(buffers);
      })
      .then((merged) => {
        return crunker.export(merged, 'audio/mp3');
      })
      .then((output) => {
        this.waveform1.load(output.url).then(() => {
          this.waveform1.on('finish', () => {
            this.record.startRecording();
            this.isRecording = true;
          });
        });
      })
      .catch((error) => {
        console.error('Error loading question audio:', error);
      });
  }

  next(){
    if (this.currentReviewIndex < this.questionUrls.length) {
      this.waveformreview.destroy();
      this.waveformreview1.destroy();
      this.currentReviewIndex++;
      this.createReviewWaveForm();
    }
  }


  createReviewWaveForm(){
    this.waveformreview = WaveSurfer.create({
      container: this.waveformElement2.nativeElement,
      waveColor: 'green',
      progressColor: 'orange',
      cursorColor: '#b99d9d',
    });
    this.waveformreview1 = WaveSurfer.create({
      container: this.waveformElement3.nativeElement,
      waveColor: 'purple',
      progressColor: 'orange',
      cursorColor: '#b99d9d',
    });
    this.waveformreview.load(this.questionUrls[this.currentReviewIndex].questionUrl).then(r => {})
    this.waveformreview1.load(URL.createObjectURL(this.questionUrls[this.currentReviewIndex].answerFile)).then(r => {})
  }
}
