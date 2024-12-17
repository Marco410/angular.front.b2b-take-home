import { CommonModule, NgClass } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Order } from '../../../../domain/entities/order';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'aplz-table',
  templateUrl: './aplz-table.component.html',
  styleUrls: ['./aplz-table.component.scss'],
  imports: [
    ReactiveFormsModule,
    NgClass,
    CommonModule,
    NgClass,
    CommonModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
  ],
})
export class AplzTableComponent<T> implements OnInit {
  @Input() data: Observable<Order[]>;
  @Input() total: number;
  @Output() pageChange: EventEmitter<any> = new EventEmitter<any[]>();
  @Output() sortChange: EventEmitter<any> = new EventEmitter<any[]>();

  displayedColumns: string[] = [
    'loanId',
    'updatedAt',
    'status',
    'price',
    'action',
  ];
  dataSource: MatTableDataSource<Order> = new MatTableDataSource<Order>();
  page: number = 1;
  pageSize: number = 10;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.data?.subscribe((data: Order[]) => {
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
  }

  onPageChanged() {
    this.pageChange.emit({
      pageIndex: this.paginator.pageIndex,
    });
  }

  onSortChange($event: any): void {
    console.log('sort');
    console.log($event);
    this.sortChange.emit($event);
  }
}
