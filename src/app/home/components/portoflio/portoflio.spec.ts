import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Portoflio } from './portoflio';

describe('Portoflio', () => {
  let component: Portoflio;
  let fixture: ComponentFixture<Portoflio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Portoflio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Portoflio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
