import { bigNumberify } from '@/utils/bignumbers';
import { RotkiApp } from '../rotki-app';

export class AccountBalancesPage {
  getSanitizedAmountString(amount: string) {
    // TODO: extract the `replace(/,/g, '')` as to use user settings (when implemented)
    return amount.replace(/,/g, '');
  }

  formatAmount(amount: string) {
    return bigNumberify(amount).toFormat(2);
  }

  visit(submenu: string) {
    RotkiApp.navigateTo('accounts-balances', submenu);
  }
}
