import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedVarService } from 'src/app/services/shared-var.service';


@Component({
  selector: 'app-odds-side-nav',
  templateUrl: './odds-side-nav.component.html',
  styleUrls: ['./odds-side-nav.component.css']
})
export class OddsSideNavComponent implements OnInit {

  @Output() onSelectCompType : EventEmitter<string>;
  compType: string = this.sharedVar.API_SOURCE_COMP_TYPE_EPL;

  constructor(public sharedVar: SharedVarService) { 
    this.onSelectCompType = new EventEmitter<string>();
  }

  ngOnInit(): void {
  }

  selectCompType(compType: string){
    this.compType = compType;
    this.onSelectCompType.emit(compType);
  }

}
