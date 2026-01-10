import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { RouterModule } from '@angular/router';
import { Toast } from '../../helper/toast/toast-component';

@Component({
  selector: 'app-layout',
  imports: [FooterComponent, HeaderComponent, RouterModule, Toast],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {}
