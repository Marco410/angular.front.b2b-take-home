import { Observable } from 'rxjs';
import { Credentials } from '../entities/credentials';

export abstract class LoginRepository {
  abstract authenticate(credentials: Credentials): Observable<boolean>;
}
