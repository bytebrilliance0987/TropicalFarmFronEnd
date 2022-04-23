import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormStockComponent } from './form-stock.component';

describe('FormStockComponent', () => {
  let component: FormStockComponent;
  let fixture: ComponentFixture<FormStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
