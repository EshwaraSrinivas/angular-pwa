import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'
import { Item } from '../api.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  items: Array<Item>;

  constructor(private apiService: ApiService) { }

  fetchData(){
    this.apiService.fetch().subscribe((data: Array<Item>) => {
      console.log(data);
      this.items = data;
    },(error) =>{
      console.log(error);
    });
  }
  ngOnInit(){
    this.fetchData();
  }

}
