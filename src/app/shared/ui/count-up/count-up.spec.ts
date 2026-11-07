import { TestBed } from '@angular/core/testing';
import { CountUp } from './count-up';

describe('CountUp', () => {
  it('affiche la valeur finale formatée avant toute animation', async () => {
    const fixture = TestBed.createComponent(CountUp);
    fixture.componentRef.setInput('valeur', 12500);
    fixture.componentRef.setInput('suffixe', '+');
    fixture.detectChanges();
    const texte = (fixture.nativeElement as HTMLElement).textContent?.replace(/\s/g, '');
    expect(texte).toBe('12500+');
  });
});
