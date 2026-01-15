import { Mengenmeldung } from './../mengenmeldung.model';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MengenmeldungFormComponent } from './mengenmeldung-form.component';
import { MengenmeldungService } from '../mengenmeldung.service';
import { ToastService } from '../../helper/toast.service';
import { provideRouter, Router } from '@angular/router';
import { provideZonelessChangeDetection } from '@angular/core';
import { of, throwError } from 'rxjs';

const mockResponse: Mengenmeldung = {
  id: 1,
  zeitraum: '2025-03',
  menge: 10.5,
  einheit: 'KG',
  geraeteartnummer: 123,
  registrierungsnummer: 12345678,
  status: 'SENT',
};

describe('MengenmeldungFormComponent', () => {
  let component: MengenmeldungFormComponent;
  let fixture: ComponentFixture<MengenmeldungFormComponent>;
  let mengenmeldungService: jasmine.SpyObj<MengenmeldungService>;
  let toastService: jasmine.SpyObj<ToastService>;
  let router: Router;

  beforeEach(async () => {
    mengenmeldungService = jasmine.createSpyObj('MengenmeldungService', ['createMengenmeldung']);
    toastService = jasmine.createSpyObj('ToastService', ['show']);

    await TestBed.configureTestingModule({
      imports: [MengenmeldungFormComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        { provide: MengenmeldungService, useValue: mengenmeldungService },
        { provide: ToastService, useValue: toastService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MengenmeldungFormComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create and initialize form', () => {
    expect(component).toBeTruthy();
    expect(component.form).toBeDefined();
    expect(component.form.invalid).toBeTrue();
  });

  it('should mark form as touched when submitted invalid', () => {
    spyOn(component.form, 'markAllAsTouched');

    component.onSubmit();

    expect(component.form.markAllAsTouched).toHaveBeenCalled();
    expect(mengenmeldungService.createMengenmeldung).not.toHaveBeenCalled();
  });

  it('should submit valid form and navigate on success', () => {
    spyOn(router, 'navigate');

    mengenmeldungService.createMengenmeldung.and.returnValue(of(mockResponse));

    component.form.setValue({
      year: '2025',
      month: '3',
      menge: 10.5,
      einheit: 'KG',
      geraeteartnummer: 123,
      registrierungsnummer: 12345678,
      confirmed: true,
    });

    component.onSubmit();

    expect(mengenmeldungService.createMengenmeldung).toHaveBeenCalledWith({
      registrierungsnummer: 12345678,
      geraeteartnummer: 123,
      menge: 10.5,
      einheit: 'KG',
      zeitraum: '2025-03',
    });

    expect(toastService.show).toHaveBeenCalledWith(
      'Mengenmeldung wurde erfolgreich übermittelt. Bitte prüfen Sie den Status in der Übersicht.'
    );

    expect(router.navigate).toHaveBeenCalledWith(['/mengenmeldungen']);
  });

  it('should show error toast when service fails', () => {
    mengenmeldungService.createMengenmeldung.and.returnValue(throwError(() => new Error('fail')));

    component.form.setValue({
      year: '2025',
      month: '3',
      menge: 10.5,
      einheit: 'KG',
      geraeteartnummer: 123,
      registrierungsnummer: 12345678,
      confirmed: true,
    });

    component.onSubmit();

    expect(toastService.show).toHaveBeenCalledWith(
      'Fehler beim Übermitteln der Mengenmeldung.',
      'bg-danger text-white'
    );
  });
});
