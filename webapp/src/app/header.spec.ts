/// <reference path="../../typings/index.d.ts"/>

import {HeaderComponent} from './header';
import {TestBed, async} from '@angular/core/testing';

describe('header component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent
      ]
    });
    TestBed.compileComponents();
  }));

  it('should render \'Fusion HTML\'', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    const header = fixture.nativeElement;
    expect(header.querySelector('p.header-title').textContent.trim()).toBe('Fusion HTML');
  });
});
