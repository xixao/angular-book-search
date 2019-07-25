import { OnInit, Component } from '@angular/core';
import { SharedService } from '../shared-service.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.sass']
})
export class BooksListComponent implements OnInit {
  searchTerm: string;
  numResults: number;
  responseTime: number;
  books;

  constructor(private _sharedService : SharedService) { }

  ngOnInit() {
  	this._sharedService.searchTerm.subscribe(searchTerm => this.searchTerm = searchTerm);
  	this._sharedService.numberOfResults.subscribe(numResults => {
  		this.numResults = numResults;
  		this.responseTime = this._sharedService.lastResponseTime;
  	});
  	this._sharedService.books.subscribe(books => this.books = books);

  	console.log(this.books);
  }

}
