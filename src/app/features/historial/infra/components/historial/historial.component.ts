import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AplzTableComponent } from '../table/src';
import { HistorialService } from '../../services/history.service';
import { Order, OrderFilter } from '../../../domain/entities/order';
import { map, Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AplazoInputComponent } from '../../../../shared/components/input/src';
@Component({
  standalone: true,
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss'],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    AplzTableComponent,
    DatePipe,
    AplazoInputComponent,
  ],
})
export class HistorialComponent implements OnInit {
  readonly #historyService = inject(HistorialService);

  orders$: Observable<Order[]>;
  total: number = 0;

  readonly first_date = new FormControl<string>('');
  readonly end_date = new FormControl<string>('');

  readonly filters = new FormGroup({
    first_date: this.first_date,
    end_date: this.end_date,
  });

  ngOnInit(): void {
    this.getOrders({
      page: 1,
      first_date: this.first_date.value ?? '',
      end_date: this.end_date.value ?? '',
    });

    this.filters.valueChanges.subscribe((val) => {
      this.getOrders({
        page: 1,
        first_date: this.filters.value.first_date ?? '',
        end_date: this.filters.value.end_date ?? '',
      });
    });
  }

  getOrders(filters: OrderFilter): void {
    this.orders$ = this.#historyService.getOrders(filters).pipe(
      map((res) => {
        this.total = res.data[0].total;
        return res.data[0].orders;
      })
    );
  }

  onPageChanged($event: any) {
    this.getOrders({
      page: $event.pageIndex + 1,
      first_date: this.first_date.value ?? '',
      end_date: this.end_date.value ?? '',
    });
  }

  sortChanged($event: any) {
    this.getOrders({
      page: 1,
      first_date: this.first_date.value ?? '',
      end_date: this.end_date.value ?? '',
      order_by: $event.active,
      direction: $event.direction === 'desc' ? 'desc' : 'asc',
    });
  }

  clearFilters(): void {
    this.filters.reset();
  }
}
