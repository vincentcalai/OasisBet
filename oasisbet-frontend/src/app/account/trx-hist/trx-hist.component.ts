import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trx-hist',
  templateUrl: './trx-hist.component.html',
  styleUrls: ['./trx-hist.component.css']
})
export class TrxHistComponent implements OnInit {

  placeholderView = "Please select a view";
  items: string[] = ["test1", "test2"];
  
  constructor() { }

  ngOnInit(): void {
  }

}
