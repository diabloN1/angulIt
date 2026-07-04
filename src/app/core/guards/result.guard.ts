import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CaptchaStateService } from '../services/captcha-state.service';

export const resultGuard: CanActivateFn = () => {
  const state = inject(CaptchaStateService);
  const router = inject(Router);
  if (!state.isCompleted()) {
    if (state.hasSession()) {
      return router.createUrlTree(['/captcha']);
    }
    return router.createUrlTree(['/']);
  }
  return true;
};
