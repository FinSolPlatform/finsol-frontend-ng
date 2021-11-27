import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleAdmComponent } from './console-adm.component';

describe('ConsoleAdmComponent', () => {
  let component: ConsoleAdmComponent;
  let fixture: ComponentFixture<ConsoleAdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleAdmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsoleAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
