import { Component } from '@angular/core';
import { SharedService } from '../shared-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {  
  searchTerm: string = '';

  constructor(private _sharedService: SharedService) { }

  doSearch() {
  	this._sharedService.updateSearchTerm(this.searchTerm);
  }

}
