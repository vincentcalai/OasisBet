import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedVarService {

  public readonly COMP_HEADER_EPL = "English Premier League";
  public readonly COMP_HEADER_LALIGA = "La Liga";
  public readonly COMP_HEADER_BUNDESLIGA = "Bundesliga";
  public readonly COMP_HEADER_SERIE_A = "Serie A";
  public readonly COMP_HEADER_LIGUE_ONE = "Ligue One";

  constructor() { }
}
