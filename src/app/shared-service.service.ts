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

  // Reset parameters and send search term to API call
  updateSearchTerm(data: string) {
    this.searchTerm = data;
    this.currentPage = 1;
    this.startIndex = 0;

    this.performSearch();
  }

  // Perform our search
  performSearch() {
    // Store start time in memory for response time calculation
  	let startTime = new Date().getTime();

  	this.SearchBooks().subscribe((res) => {
      // Compare current time to start time and calculate server response
  	  this.lastResponseTime = new Date().getTime() - startTime;

      // Determine number of results and pages
      this.numberOfResults.next(res.totalItems);
      this.numPages = Math.ceil(res.totalItems / this.maxResults);

      // Store results
      this.books.next(res.items);
    });
  }

  // API call
  SearchBooks() {
    return this.http
      .get(`${this.API_PATH}?orderBy=newest&q=${this.searchTerm}&startIndex=${this.startIndex}&maxResults=${this.maxResults}`)
  }

  // Fetch results based on page number (pagination)
  changePage(pageNum: number) {
  	this.currentPage = pageNum;
  	this.startIndex = (pageNum - 1) * this.maxResults;
  	this.performSearch();
  }
}
