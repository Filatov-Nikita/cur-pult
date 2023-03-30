import { Success, Cred } from 'src/types/user';
import ky from './index';

export function login(cred: Cred) {
  return ky.post('login', { json: cred }).json<Success>();
}
