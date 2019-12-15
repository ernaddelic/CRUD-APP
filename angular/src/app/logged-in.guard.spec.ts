import { TestBed, async, inject } from '@angular/core/testing';

import { LoggedInGuard } from './logged-in.guard';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';

describe('LoggedInGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggedInGuard, AuthService],
      imports: [HttpClientModule]
    });
  });

  it('should ...', inject([LoggedInGuard], (guard: LoggedInGuard) => {
    expect(guard).toBeTruthy();
  }));
});
