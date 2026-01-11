import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';
import { MengenmeldungService } from '../mengenmeldung.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mengenmeldung-list',
  imports: [NgbPagination, RouterLink, CommonModule],
  templateUrl: './mengenmeldung-list.component.html',
  styleUrl: './mengenmeldung-list.component.css',
})
export class MengenmeldungListComponent implements OnInit {
  private readonly mengenMeldungService = inject(MengenmeldungService);

  private readonly allMengenmeldungen = signal<any[]>([]);

  searchTerm = signal('');

  mengenmeldungen = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();

    if (!term) return this.allMengenmeldungen();

    return this.allMengenmeldungen().filter((m) =>
      [m.zeitraum, m.einheit, m.status, m.geraeteartnummer, m.registrierungsnummer, m.menge]
        .join(' ')
        .toLowerCase()
        .includes(term)
    );
  });

  ngOnInit() {
    this.mengenMeldungService.getAllMengenMeldungen().subscribe({
      next: (data) => this.allMengenmeldungen.set(data),
      error: (err) => console.error('Failed to load Mengenmeldungen', err),
    });
  }
}
