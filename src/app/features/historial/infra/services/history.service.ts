import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../../../../core/dominio/services/base.service';
import { ROUTE_API_CONFIG } from '../../../../core/infra/config/routes.config';
import format from '../../../shared/utils/format-helper';
import { ResponseOrder } from '../../domain/entities/order';

@Injectable({
  providedIn: 'root',
})
export class HistorialService {
  readonly #base = inject(BaseService);

  getOrders(filters: any): Observable<ResponseOrder> {
    const params = format(filters);
    return this.#base.get(`${ROUTE_API_CONFIG.history}${params}`);
  }
}
