import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseTotals } from '../../domain/entities/totals';
import { BaseService } from '../../../../core/dominio/services/base.service';
import { ROUTE_API_CONFIG } from '../../../../core/infra/config/routes.config';
import { BranchFilter, ResponseBranch } from '../../domain/entities/branch';
import format from '../../../shared/utils/format-helper';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  readonly #base = inject(BaseService);

  getTotals(filters: BranchFilter): Observable<ResponseTotals> {
    const params = format(filters);
    return this.#base.get(`${ROUTE_API_CONFIG.orders_home}${params}`);
  }

  getBranches(): Observable<ResponseBranch> {
    return this.#base.get(ROUTE_API_CONFIG.branches);
  }
}
