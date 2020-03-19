import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutDefaultHeaderComponent } from './header.component';

describe('LayoutDefaultHeaderComponent', () => {
  let component: LayoutDefaultHeaderComponent;
  let fixture: ComponentFixture<LayoutDefaultHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutDefaultHeaderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutDefaultHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
