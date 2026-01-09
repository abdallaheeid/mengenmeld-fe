import { Component, input, InputOptionsWithTransform } from '@angular/core';
import { NgbHighlight, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mengenmeldung-list',
  imports: [NgbPagination, RouterLink],
  templateUrl: './mengenmeldung-list.component.html',
  styleUrl: './mengenmeldung-list.component.css',
})
export class MengenmeldungListComponent {
  mengenmeldungen$: any;
  service: any;
  total$: any;

  page = input.required<number>;
}
