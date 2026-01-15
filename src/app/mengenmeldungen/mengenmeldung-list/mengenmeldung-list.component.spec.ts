import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MengenmeldungListComponent } from './mengenmeldung-list.component';
import { MengenmeldungService } from '../mengenmeldung.service';
import { of } from 'rxjs';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

describe('MengenmeldungListComponent', () => {
  let component: MengenmeldungListComponent;
  let fixture: ComponentFixture<MengenmeldungListComponent>;
  let service: jasmine.SpyObj<MengenmeldungService>;

  const MOCK_DATA = [
    {
      id: 1,
      zeitraum: '2025-03',
      menge: 10,
      einheit: 'KG',
      geraeteartnummer: 123,
      registrierungsnummer: 11111111,
      status: 'SENT',
    },
    {
      id: 2,
      zeitraum: '2025-02',
      menge: 5,
      einheit: 'STUECK',
      geraeteartnummer: 456,
      registrierungsnummer: 22222222,
      status: 'FAILED',
    },
  ];

  beforeEach(async () => {
    service = jasmine.createSpyObj('MengenmeldungService', ['getAllMengenMeldungen']);

    service.getAllMengenMeldungen.and.returnValue(of(MOCK_DATA));

    await TestBed.configureTestingModule({
      imports: [MengenmeldungListComponent],
      providers: [
        provideRouter([]),
        provideZonelessChangeDetection(),
        { provide: MengenmeldungService, useValue: service },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MengenmeldungListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load mengenmeldungen on init', () => {
    expect(service.getAllMengenMeldungen).toHaveBeenCalled();
    expect(component.mengenmeldungen().length).toBe(2);
  });

  it('should filter mengenmeldung by search term', () => {
    component.searchTerm.set('KG');

    const result = component.mengenmeldungen();

    expect(result.length).toBe(1);
    expect(result[0].einheit).toBe('KG');
  });

  it('should filter by status', () => {
    component.searchTerm.set('failed');

    const result = component.mengenmeldungen();

    expect(result.length).toBe(1);
    expect(result[0].status).toBe('FAILED');
  });

  // Test when searchTerm is empty
  it('should return all items when search term is empty', () => {
    component.searchTerm.set('');

    expect(component.mengenmeldungen().length).toBe(2);
  });

  // Test status class mapping
  it('should return correct button class for status', () => {
    expect(component.statusClass('NEW')).toBe('btn-outline-secondary');
    expect(component.statusClass('SENT')).toBe('btn-outline-success');
    expect(component.statusClass('FAILED')).toBe('btn-outline-danger');
  });
});
