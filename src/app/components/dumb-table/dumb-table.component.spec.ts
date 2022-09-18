import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DumbTableComponent } from './dumb-table.component';

describe('DumbTableComponent', () => {
    let component: DumbTableComponent;
    let fixture: ComponentFixture<DumbTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
        declarations: [ DumbTableComponent ]
        })
        .compileComponents();

        fixture = TestBed.createComponent(DumbTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
