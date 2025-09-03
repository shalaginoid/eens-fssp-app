import type { UserSession } from '#auth-utils';

export default function () {
  return useState<UserSession[]>('visitors', () => []);
}
