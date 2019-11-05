import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Requisition {
  name: string;
  phone: string;
  email: string;
  company: string;
  date_entry: string;
  org_num: string;
  address_1: string;
  city: string;
  zip: string;
  geo: string;
  pan: string;
  pin: string;
  id: number;
  status: string
  fee: string
  guid: string
  date_exit: string
  date_first: string
  date_recent: string
  url: string
}

@Injectable()
export default class RequisitionService {
  constructor(private http: HttpClient) {}

  findAll() {
    return this.http.get<Requisition[]>('/api/requisitions');
  }
}
