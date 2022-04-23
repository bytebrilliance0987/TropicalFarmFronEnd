import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { toBase64 } from '../utilities.model';

@Component({
  selector: 'app-input-image',
  templateUrl: './input-image.component.html',
  styleUrls: ['./input-image.component.css']
})
export class InputImageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  change(event: any){
    if(event.target.files.length > 0){
      const imageFile: File = event.target.files[0];
      toBase64(imageFile).then((value: any) => this.imagetoBase64 = value);
      this.onImageSelected.emit(imageFile);
      this.URLCurrentImage = null;
    }
  }

  @Input()
  URLCurrentImage: string | any;

  @Output()
  onImageSelected: EventEmitter<File> = new EventEmitter<File>();

  imagetoBase64: string | any;

}

