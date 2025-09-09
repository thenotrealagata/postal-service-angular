import { CurryPipe } from './curry.pipe';

describe('CurryPipe', () => {
  it('create an instance', () => {
    const pipe = new CurryPipe();
    expect(pipe).toBeTruthy();
  });
});
