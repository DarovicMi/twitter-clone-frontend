import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordSaveComponent } from './password-save.component';

describe('PasswordSaveComponent', () => {
  let component: PasswordSaveComponent;
  let fixture: ComponentFixture<PasswordSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordSaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
