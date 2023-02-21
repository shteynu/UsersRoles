import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Profile} from "../models/auth-data";

@Injectable({
  providedIn: 'root'
})
export class DataExchangeServiceService {

  currentUser$ = new BehaviorSubject<Profile | null>(null);

  constructor() { }
}
