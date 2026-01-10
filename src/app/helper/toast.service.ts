import { Injectable, signal } from '@angular/core';

export interface AppToast {
  message: string;
  classname: string;
  delay?: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts = signal<AppToast[]>([]);

  show(message: string, classname = 'bg-success text-white', delay = 5000) {
    this.toasts.update((t) => [...t, { message, classname, delay }]);
  }

  remove(toast: AppToast) {
    this.toasts.update((t) => t.filter((x) => x !== toast));
  }
}
