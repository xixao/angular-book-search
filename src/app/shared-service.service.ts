import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private API_PATH = 'https://www.googleapis.com/books/v1/volumes';

  private startIndex: number;
  
  public maxResults: number = 10;
  public currentPage: number;
  public numPages: number;
  public lastResponseTime: number;
  public searchTerm: string;

  public books = new Subject<any>();
  books$ = this.books.asObservable();

  public numberOfResults = new Subject<number>();
  numberOfResults$ = this.numberOfResults.asObservable();

  constructor(private http: HttpClient) { }

  updateSearchTerm(data: string) {
    this.searchTerm = data;
    this.currentPage = 1;
    this.startIndex = 0;

    this.performSearch();
  }

  performSearch() {
  	let startTime = new Date().getTime();

  	this.SearchBooks().subscribe((res) => {
  	  this.lastResponseTime = new Date().getTime() - startTime;
      console.log('Book subscriber', res);

      this.numberOfResults.next(res.totalItems);
      this.numPages = Math.ceil(res.totalItems / this.maxResults);

      this.books.next(res.items);
    });
  }

  SearchBooks() {
    return this.http
      .get(`${this.API_PATH}?orderBy=newest&q=${this.searchTerm}&startIndex=${this.startIndex}&maxResults=${this.maxResults}`)
  }

  changePage(pageNum: number) {
  	this.currentPage = pageNum;
  	this.startIndex = (pageNum - 1) * this.maxResults;
  	this.performSearch();
  }
}
