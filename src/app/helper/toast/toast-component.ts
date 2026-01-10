import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-toast',
  imports: [CommonModule, NgbToast],
  templateUrl: './toast-component.html',
  styleUrl: './toast-component.css',
})
export class Toast {
  toastService = inject(ToastService);
}
