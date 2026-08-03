import {describe, expect, it} from 'vitest';
import {onRequest} from '../functions/api/[[path]]';

describe('functions/api/[[path]]', () => {
  it('re-exports onRequest as a function', () => {
    expect(typeof onRequest).toBe('function');
  });
});
