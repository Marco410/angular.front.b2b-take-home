import { Component, inject, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';
import { Totals } from '../../domain/entities/totals';
import { MultiselectComponent } from '../../../shared/components/multiselect/src';
import { Branch, BranchFilter } from '../../domain/entities/branch';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AplazoInputComponent } from '../../../shared/components/input/src';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [MultiselectComponent, ReactiveFormsModule, AplazoInputComponent],
})
export class HomeComponent implements OnInit {
  readonly #homeService = inject(HomeService);
  loading: boolean = true;
  loadingBranches: boolean = true;
  totals: Totals = { total_price: 0.0, total_records: 0, average_price: 0.0 };
  branches: Branch[] = [];

  readonly branchId = new FormControl<string[]>([]);
  readonly date = new FormControl<string>('');

  readonly filters = new FormGroup({
    branchId: this.branchId,
    date: this.date,
  });

  ngOnInit(): void {
    this.filters.valueChanges.subscribe((val) => {
      this.getTot({
        branches: this.filters.value.branchId?.join(',') ?? '',
        date: this.filters.value.date ?? '',
      });
    });

    this.getTot({
      branches: this.filters.value.branchId?.join(',') ?? '',
      date: this.filters.value.date ?? '',
    });

    this.getBranches();
  }

  getTot(filters: BranchFilter): void {
    this.#homeService.getTotals(filters).subscribe({
      next: (totalsData) => {
        this.totals = {
          total_price: totalsData.data[0].total_price,
          total_records: totalsData.data[0].total_records,
          average_price: totalsData.data[0].average_price,
        };
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
      },
    });
  }

  getBranches(): void {
    this.#homeService.getBranches().subscribe({
      next: (branchData) => {
        this.branches = branchData.data[0].branches;
        this.loadingBranches = false;
      },
      error: (err) => {
        this.loadingBranches = false;
      },
    });
  }
}
