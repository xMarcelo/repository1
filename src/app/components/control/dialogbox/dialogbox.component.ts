import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.css']
})
export class DialogboxComponent implements OnInit {
  @Output() onCancel = new EventEmitter<void>();
  @Output() onSubmit = new EventEmitter<void>();
  
  constructor() { }

  ngOnInit() {
  }

}
