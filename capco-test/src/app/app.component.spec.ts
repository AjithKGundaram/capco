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
    
console.log('test',componentUnderTest);
   // expect(modalService.open).toHaveBeenCalledWith('show-requisitions');
  
    // app.openModal('');
    // expect(modalService.open).toHaveBeenCalledWith('<xxxx>', { size: 'lg' });
    // const fixture = TestBed.createComponent(AppComponent);
    // const app = fixture.componentInstance;
    // console.log(app);
    // expect(app.title).toEqual('app');
    // const compiled = fixture.nativeElement;
    // const evnt = compiled.querySelector('#show-requisitions--btn')

    //evnt.click();
    //  modalService = fixture.injector.get(ModalService);
    //  console.log(modalService);
    //app.openModal('show-requisitions');
    //  const spyOpen= spyOn(modalService,'open');
    //  console.log(spyOpen);
    //  expect(spyOpen).toHaveBeenCalled();
    //   expect(compiled.querySelector('h1').
  }));

  it(`should able to close modal '`, async(() => {

  }));

  it(`should able load data by calling loadMyRequisitions function '`, async(() => {

  }));

  it(`should able move to next page using goto function '`, async(() => {

  }));

  it(`should able move to prev page using goto function '`, async(() => {

  }));
});
