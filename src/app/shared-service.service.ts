import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private API_PATH = 'https://www.googleapis.com/books/v1/volumes';

  private currentPage: number;
  private numPages: number;
  private startIndex: number;
  private maxResults: number = 10;

  public lastResponseTime: number;

  public searchTerm = new Subject<string>(); 
  searchTerm$ = this.searchTerm.asObservable();

  public books = new Subject<any>();
  books$ = this.books.asObservable();

  public numberOfResults = new Subject<number>();
  numberOfResults$ = this.numberOfResults.asObservable();

  constructor(private http: HttpClient) { }

  updateSearchTerm(data: string) {
    this.searchTerm.next(data);
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
      this.books.next(res.items);

      this.numPages = Math.ceil(res.totalItems / this.maxResults);
    });
  }

  SearchBooks() {
    return this.http
      .get(`${this.API_PATH}?orderBy=newest&q=${this.searchTerm}&startIndex=${this.startIndex}&maxResults=${this.maxResults}`)
  }
}
