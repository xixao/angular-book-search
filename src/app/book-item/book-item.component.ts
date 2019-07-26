import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from '../shared-service.service';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.sass']
})
export class BookItemComponent implements OnInit {
  @Input() book;

  expandDescription: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toggleDescription() {
    // Toggle expanded view of description
  	this.expandDescription = !this.expandDescription;
  }

}
