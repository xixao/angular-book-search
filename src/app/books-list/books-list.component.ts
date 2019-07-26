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
  currentPage: number;
  numberOfPages: number;
  minNumResults: number;
  maxNumResults: number;
  resultsPerPage: number;
  books;

  constructor(private _sharedService : SharedService) { }

  ngOnInit() {
  	this._sharedService.numberOfResults.subscribe(numResults => {
  		this.numResults = numResults;
  		this.responseTime = this._sharedService.lastResponseTime;
  		this.searchTerm = this._sharedService.searchTerm;
  	});

  	this._sharedService.books.subscribe(books => {
  		this.books = books;
  		this.currentPage = this._sharedService.currentPage;
  		this.numberOfPages = this._sharedService.numPages;
  		this.resultsPerPage = this._sharedService.maxResults;

  		this.minNumResults = (this.currentPage - 1) * this.resultsPerPage;
  		this.maxNumResults = this.minNumResults + this.books.length;

  		if (this.minNumResults == 0) this.minNumResults = 1;
  	});

  	console.log(this.books);
  }

  firstPage() {
  	this._sharedService.changePage(1);
  }

  prevPage() {
  	this._sharedService.changePage(this.currentPage - 1);
  }

  nextPage() {
  	this._sharedService.changePage(this.currentPage + 1);
  }

  lastPage() {
  	this._sharedService.changePage(this.numberOfPages);
  }

}
