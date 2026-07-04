import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CaptchaStateService } from '../services/captcha-state.service';

export const captchaGuard: CanActivateFn = () => {
  const state = inject(CaptchaStateService);
  const router = inject(Router);
  if (!state.hasSession()) {
    return router.createUrlTree(['/']);
  }
  return true;
};
