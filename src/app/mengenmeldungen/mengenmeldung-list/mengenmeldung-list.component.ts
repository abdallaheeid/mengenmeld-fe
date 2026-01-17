import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { NgbPopover, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MengenmeldungService } from '../mengenmeldung.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mengenmeldung-list',
  imports: [NgbPagination, RouterLink, CommonModule, NgbPopover],
  templateUrl: './mengenmeldung-list.component.html',
  styleUrl: './mengenmeldung-list.component.css',
})
export class MengenmeldungListComponent implements OnInit {
  private readonly mengenMeldungService = inject(MengenmeldungService);
  private readonly allMengenmeldungen = signal<any[]>([]);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  searchTerm = signal('');
  page = signal(1);
  pageSize = 5;
  totalElements = signal(0);

  // Sorting mechansim
  sortField = signal<string | null>(null);
  sortDirection = signal<'asc' | 'desc'>('asc');

  mengenmeldungen = computed(() => {
    let data = [...this.allMengenmeldungen()];
    const term = this.searchTerm().toLowerCase().trim();

    if (term) {
      data = data.filter((m) =>
        [m.zeitraum, m.einheit, m.status, m.geraeteartnummer, m.registrierungsnummer, m.menge]
          .join(' ')
          .toLowerCase()
          .includes(term),
      );
    }

    const field = this.sortField();
    if (!field) return data;

    const dir = this.sortDirection() === 'asc' ? 1 : -1;

    return data.sort((a, b) => {
      const v1 = a[field];
      const v2 = b[field];

      if (v1 == null) return -1 * dir;
      if (v2 == null) return 1 * dir;

      return v1 > v2 ? dir : v1 < v2 ? -dir : 0;
    });
  });

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      const page = Number(params.get('page')) || 1; // Fallback on one
      const size = Number(params.get('size')) || this.pageSize;

      this.page.set(page);
      this.pageSize = size;

      this.loadPage();
    });
  }

  private loadPage() {
    this.mengenMeldungService.getAllMengenMeldungen(this.page() - 1, this.pageSize).subscribe({
      next: (data) => {
        this.allMengenmeldungen.set(data.content);
        this.totalElements.set(data.totalElements);
      },
      error: (err) => console.error('Failed to load Mengenmeldungen', err),
    });
  }

  statusClass(status: string): string {
    switch (status) {
      case 'NEW':
        return 'btn-outline-secondary';
      case 'SENT':
        return 'btn-outline-success';
      case 'FAILED':
        return 'btn-outline-danger';
      default:
        return 'btn-outline-dark';
    }
  }

  onPageChange(p: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: p, size: this.pageSize },
      queryParamsHandling: 'merge',
    });

    this.page.set(p);
    this.loadPage();
  }

  sortBy(field: string) {
    if (this.sortField() === field) {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortField.set(field);
      this.sortDirection.set('asc');
    }
  }
}
