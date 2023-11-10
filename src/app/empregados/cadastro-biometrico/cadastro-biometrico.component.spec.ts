import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroBiometricoComponent } from './cadastro-biometrico.component';

describe('CadastroBiometricoComponent', () => {
  let component: CadastroBiometricoComponent;
  let fixture: ComponentFixture<CadastroBiometricoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastroBiometricoComponent]
    });
    fixture = TestBed.createComponent(CadastroBiometricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
