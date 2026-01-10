import { Component, inject, input, InputOptionsWithTransform, OnInit, signal } from '@angular/core';
import { NgbHighlight, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
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
  mengenmeldungen = signal<any[]>([]);
  total$: any;

  page = input.required<number>;

  private mengenMeldungService = inject(MengenmeldungService);

  ngOnInit() {
    this.mengenMeldungService.getAllMengenMeldungen().subscribe({
      next: (data) => this.mengenmeldungen.set(data),
      error: (err) => console.error('Failed to load Mengenmeldungen', err),
    });
  }
}
