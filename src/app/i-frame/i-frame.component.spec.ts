import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IFrameComponent } from './i-frame.component';

describe('IFrameComponent', () => {
  let component: IFrameComponent;
  let fixture: ComponentFixture<IFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IFrameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
