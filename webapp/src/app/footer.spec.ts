/// <reference path="../../typings/index.d.ts"/>

import {FooterComponent} from './footer';
import {TestBed, async} from '@angular/core/testing';

describe('footer component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FooterComponent
      ]
    });
    TestBed.compileComponents();
  }));

  it('should render \'FusionHTML\'', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();
    const footer = fixture.nativeElement;
    expect(footer.textContent.trim()).toBe('FusionHTML');
  });
});
