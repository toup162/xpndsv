import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrandTotalBalanceComponent } from './grand-total-balance.component';

describe('GrandTotalBalanceComponent', () => {
  let component: GrandTotalBalanceComponent;
  let fixture: ComponentFixture<GrandTotalBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrandTotalBalanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrandTotalBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
