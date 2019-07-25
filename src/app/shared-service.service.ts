import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private API_PATH = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) { }

  public searchTerm = new Subject<string>(); 
  searchTerm$ = this.searchTerm.asObservable();

  public books = new Subject<any>();
  books$ = this.books.asObservable();

  public numberOfResults = new Subject<number>();
  numberOfResults$ = this.numberOfResults.asObservable();

  updateSearchTerm(data: string) {
    this.searchTerm.next(data);

    this.SearchBooks().subscribe((res) => {
      console.log('Book subscriber', res);

      this.numberOfResults.next(res.totalItems);
      this.books.next(res.items);
    })
  }

  SearchBooks() {
    return this.http
      .get(`${this.API_PATH}?orderBy=newest&q=${this.searchTerm}`)
  }
}
