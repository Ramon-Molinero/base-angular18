import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';
setupZoneTestEnv();

// Mock completo de IntersectionObserver
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = '0px';
  readonly thresholds: ReadonlyArray<number> = [ 0 ];
  private callback: IntersectionObserverCallback | null = null;

  constructor( callback: IntersectionObserverCallback, options?: IntersectionObserverInit ) {
    this.callback = callback;
  }

  observe( target: Element ): void {
    // Simula que el elemento está en el viewport inmediatamente
    if ( this.callback ) {
      this.callback(
        [ {
          isIntersecting: true,
          target,
          intersectionRatio: 1,
          boundingClientRect: {} as DOMRectReadOnly,
          intersectionRect: {} as DOMRectReadOnly,
          rootBounds: null,
          time: 0
        } ] as IntersectionObserverEntry[],
        this
      );
    }
  }

  unobserve( target: Element ): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

// Mock de ResizeObserver
class MockResizeObserver implements ResizeObserver {
  constructor( public callback: ResizeObserverCallback ) {}
  observe( target: Element ): void {}
  unobserve( target: Element ): void {}
  disconnect(): void {}
}

// Mocks para requestIdleCallback y cancelIdleCallback
let idleCallbacks: Array<() => void> = [];

Object.defineProperty( window, 'requestIdleCallback', {
  writable: true,
  value: ( callback: IdleRequestCallback ) => {
    const id = idleCallbacks.push( () => callback( {
      didTimeout: false,
      timeRemaining: () => 50
    } ) ) - 1;
    setTimeout( () => idleCallbacks[id](), 0 );
    return id;
  }
} );

Object.defineProperty( window, 'cancelIdleCallback', {
  writable: true,
  value: ( id: number ) => {
    idleCallbacks[id] = () => {};
  }
} );

// Configuración global
Object.defineProperty( window, 'IntersectionObserver', {
  writable: true,
  value: MockIntersectionObserver
} );

Object.defineProperty( window, 'ResizeObserver', {
  writable: true,
  value: MockResizeObserver
} );