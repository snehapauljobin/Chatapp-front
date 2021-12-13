import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntiqueComponent } from './antique.component';

describe('AntiqueComponent', () => {
  let component: AntiqueComponent;
  let fixture: ComponentFixture<AntiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AntiqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AntiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
