import { TestBed, async, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import AppComponent from './app.component';
import ModalComponent from './modal/modal.directive';
import ModalService from './modal/modal.service';
import PagerService from '../services/pager.service';
import RequisitionService from '../services/requisition.service';
import { HttpClientModule } from '@angular/common/http';

export class MockNgbModalRef {
  result: Promise<any> = new Promise((resolve, reject) => resolve('x'));
}

describe('AppComponent', () => {
  let fixtureUnderTest: ComponentFixture<AppComponent>;
  let componentUnderTest: AppComponent;
  let modalService: ModalService;
  let mockModalRef: MockNgbModalRef = new MockNgbModalRef();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      declarations: [
        AppComponent,
        ModalComponent
      ],
      providers: [
        ModalService,
        RequisitionService,
        PagerService
      ]
    }).compileComponents();
    fixtureUnderTest = TestBed.createComponent(AppComponent);
    componentUnderTest = fixtureUnderTest.componentInstance;
    console.log('ytetctest com',componentUnderTest);
    modalService = TestBed.get(ModalService);
 
  }));
  it('should create the app', async(() => {

    expect(componentUnderTest).toBeDefined ();
  }));
  it(`should able to open modal '`, async(() => {
    spyOn(modalService, 'open').and.returnValue('');
    componentUnderTest.test();
    expect(modalService.open).toHaveBeenCalledWith('show-requisitions');
    const compiled = fixtureUnderTest.nativeElement;
    expect(compiled.querySelector('h3'));
    }));

  it(`should able to close modal '`, async(() => {
    spyOn(modalService, 'close').and.returnValue('');
    componentUnderTest.test1();
    expect(modalService.close).toHaveBeenCalledWith('show-requisitions');
    const compiled = fixtureUnderTest.nativeElement;
    expect(compiled.querySelector('h3'));
  }));

});
