import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TabsMenuService {
  private isMenuOpen$ = new BehaviorSubject<boolean>(false);
  private hasContentTcu$ = new BehaviorSubject<boolean>(false);

  get isMenuOpen(): Observable<boolean> {
    return this.isMenuOpen$.asObservable();
  }

  get hasContentTcu(): Observable<boolean> {
    return this.hasContentTcu$.asObservable();
  }

  registerContentTcu(): void {
    this.hasContentTcu$.next(true);
  }

  unregisterContentTcu(): void {
    this.hasContentTcu$.next(false);
    this.isMenuOpen$.next(false);
  }

  toggleMenu(): void {
    this.isMenuOpen$.next(!this.isMenuOpen$.value);
  }

  openMenu(): void {
    this.isMenuOpen$.next(true);
  }

  closeMenu(): void {
    this.isMenuOpen$.next(false);
  }

  getCurrentValue(): boolean {
    return this.isMenuOpen$.value;
  }

  getHasContentTcuValue(): boolean {
    return this.hasContentTcu$.value;
  }
}
