import { Component } from '@angular/core';
import { VinylAdminList } from './vinyl-admin-list/vinyl-admin-list';

@Component({
  selector: 'app-admin-dashboard',
  imports: [VinylAdminList],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss',
})
export class AdminDashboard {

}
