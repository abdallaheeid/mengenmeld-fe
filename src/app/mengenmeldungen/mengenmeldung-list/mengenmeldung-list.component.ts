import { Component, input, InputOptionsWithTransform } from '@angular/core';
import { NgbHighlight, NgbPagination } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-mengenmeldung-list',
  imports: [NgbPagination],
  templateUrl: './mengenmeldung-list.component.html',
  styleUrl: './mengenmeldung-list.component.css',
})
export class MengenmeldungListComponent {
  mengenmeldungen$: any;
  service: any;
  total$: any;

  page = input.required<number>;
}
