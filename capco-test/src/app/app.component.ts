import {
  Component,
  Input,
  EventEmitter,
  OnDestroy,
  HostListener
} from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import {
  trigger,
  style,
  transition,
  animate,
  keyframes,
  animateChild,
  query,
  stagger
} from '@angular/animations';

import PagerService from '../services/pager.service';
import RequisitionService, {
  Requisition
} from '../services/requisition.service';
import ModalService from './modal/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    // trigger('stagger', [
    //   transition(':enter', [
    //     query(':enter', stagger('.1s', [animateChild()]), { optional: true })
    //   ])
    // ]),
    trigger('fade', [
      transition(':leave', [
        style({ opacity: 1, height: '*' }),
        animate(300, style({ opacity: 0, height: 0 }))
      ]),
      transition(':enter', [
        style({ opacity: 0, height: 0 }),
        animate(300, style({ opacity: 1, height: '*' }))
      ])
    ])
  ]
})
export default class AppComponent implements OnInit {
  title = 'app';

  public requisitionsList: Requisition[] = [];
  public pagedRequisitionsList: Requisition[] = [];
  public requisitionSearchText = '';
  public active = 'myrequisitions';
  public loading = false;

  pager: any = {};

  constructor(
    private modalService: ModalService,
    private requisitionService: RequisitionService,
    private pagerService: PagerService
  ) {}

  ngOnInit() {
    this.loadMyRequisitions();
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  goto(
    page: number,
    criteria: any = { sortColumn: 'id', sortDirection: 'asc' }
  ) {
    console.log('---criteria---------', criteria);

    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    this.pager = this.pagerService.getPager(this.requisitionsList.length, page);

    this.pagedRequisitionsList = this.requisitionsList.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );

    this.pagedRequisitionsList = this.pagedRequisitionsList.sort((a, b) => {
      if (criteria.sortDirection === 'desc') {
        return a[criteria.sortColumn] < b[criteria.sortColumn] ? 1 : -1;
      } else {
        return a[criteria.sortColumn] > b[criteria.sortColumn] ? 1 : -1;
      }
    });
    console.log('---this.requisitionsList in 100---------', this.pagedRequisitionsList);
    // return this.pagedRequisitionsList;
  }


test(){
  this.openModal('show-requisitions');
}


test1(){
  this.closeModal('show-requisitions');
}
  onSorted($event) {
    this.goto(this.pager.currentPage, $event);
  }

  loadMyRequisitions(
    criteria: any = { sortColumn: 'id', sortDirection: 'asc' }
  ) {
    this.active = 'myrequisitions';
    this.loading = true;
    this.requisitionService.findAll().subscribe(requisitions => {
      console.log('---------this.requisitionService---------', requisitions);
      this.requisitionsList = requisitions
        // .filter(r => r.recruiter === 'Johnny Appleseed')
        .sort((a, b) => {
          if (criteria.sortDirection === 'desc') {
            return a[criteria.sortColumn] < b[criteria.sortColumn] ? 1 : -1;
          } else {
            return a[criteria.sortColumn] > b[criteria.sortColumn] ? 1 : -1;
          }
        });
      this.goto(1, criteria);
      this.loading = false;
    });
  }

}
