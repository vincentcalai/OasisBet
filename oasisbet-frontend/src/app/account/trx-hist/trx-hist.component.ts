import { Component, Input, OnInit } from '@angular/core';
import { AccountModel } from 'src/app/model/account.model';

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
