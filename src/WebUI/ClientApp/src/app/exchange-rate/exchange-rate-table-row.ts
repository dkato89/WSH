import { DateTime } from "luxon";
import { ExchangeRate } from "src/shared/service-proxies/service-proxies";

export class ExchangeRateTableRow extends ExchangeRate {
    date!: DateTime;
  }