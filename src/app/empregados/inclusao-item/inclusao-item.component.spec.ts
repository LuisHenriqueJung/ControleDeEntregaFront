import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InclusaoItemComponent } from './inclusao-item.component';

describe('InclusaoItemComponent', () => {
  let component: InclusaoItemComponent;
  let fixture: ComponentFixture<InclusaoItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InclusaoItemComponent]
    });
    fixture = TestBed.createComponent(InclusaoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
