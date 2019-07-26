import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from  '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BooksListComponent } from './books-list/books-list.component';
import { BookItemComponent } from './book-item/book-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BooksListComponent,
    BookItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
