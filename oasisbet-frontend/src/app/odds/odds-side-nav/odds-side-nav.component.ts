import { Component, EventEmitter, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-odds-side-nav',
  templateUrl: './odds-side-nav.component.html',
  styleUrls: ['./odds-side-nav.component.css']
})
export class OddsSideNavComponent implements OnInit {

  @Output() onSelectCompType : EventEmitter<string>;

  constructor() { 
    this.onSelectCompType = new EventEmitter<string>();
  }

  ngOnInit(): void {
  }

  selectCompType(compType: string){
    this.onSelectCompType.emit(compType);
  }

}
