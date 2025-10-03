import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HyperTextComponent } from './hyper-text.component';

describe('HyperTextComponent', () => {
  let component: HyperTextComponent;
  let fixture: ComponentFixture<HyperTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HyperTextComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HyperTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
