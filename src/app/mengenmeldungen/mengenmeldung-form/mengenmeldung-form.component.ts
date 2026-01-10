import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MengenmeldungService } from '../mengenmeldung.service';
import { ToastService } from '../../helper/toast.service';

@Component({
  selector: 'app-mengenmeldung-form',
  imports: [ReactiveFormsModule],
  templateUrl: './mengenmeldung-form.component.html',
  styleUrl: './mengenmeldung-form.component.css',
})
export class MengenmeldungFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private mengenmeldungService = inject(MengenmeldungService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  form!: FormGroup;

  ngOnInit() {
    this.form = this.fb.nonNullable.group({
      year: ['', Validators.required],
      month: ['', Validators.required],
      menge: [null, [Validators.required, Validators.min(0.0001)]],
      einheit: ['', Validators.required],
      geraeteartnummer: [null, [Validators.required, Validators.min(1)]],
      registrierungsnummer: [null, [Validators.required, Validators.pattern(/^\d{8}$/)]],
      confirmed: [false, Validators.requiredTrue],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const v = this.form.getRawValue();

    const payload = {
      registrierungsnummer: v.registrierungsnummer,
      geraeteartnummer: v.geraeteartnummer,
      menge: v.menge,
      einheit: v.einheit,
      zeitraum: `${v.year}-${String(v.month).padStart(2, '0')}`,
    };

    this.mengenmeldungService.createMengenmeldung(payload).subscribe({
      next: () => {
        this.toastService.show(
          'Mengenmeldung wurde erfolgreich übermittelt. Bitte prüfen Sie den Status in der Übersicht.'
        );
        this.router.navigate(['/mengenmeldungen']);
      },
      error: () => {
        this.toastService.show(
          'Fehler beim Übermitteln der Mengenmeldung.',
          'bg-danger text-white'
        );
      },
    });
  }
}
