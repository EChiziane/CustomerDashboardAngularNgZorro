import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PrintTEstComponent} from './print-test.component';

describe('PrintTEstComponent', () => {
  let component: PrintTEstComponent;
  let fixture: ComponentFixture<PrintTEstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrintTEstComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PrintTEstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
