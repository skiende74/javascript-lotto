import CONDITION from '../../constant/Condition.js';
import ERROR from '../../constant/Error.js';
import LottoNumberList from '../entity/LottoNumberList.js';

class PurchaseLottoService {
  #purchaseCount;
  #lottos;

  constructor(purchaseMoneyString) {
    this.#validate(purchaseMoneyString);
    this.#purchaseCount = this.#calcPurchaseCount(purchaseMoneyString);
    this.#makeLottos();
  }

  #validate(moneyString) {
    this.#validateNotNumber(moneyString);
    this.#validateMultiple(moneyString);
  }

  #validateNotNumber(moneyString) {
    if (isNaN(moneyString)) {
      throw new Error(ERROR.beNumber);
    }
  }

  #validateMultiple(moneyString) {
    if (Number(moneyString) % CONDITION.pricePerLotto !== 0) {
      throw new Error(ERROR.beMultiple);
    }
  }

  #calcPurchaseCount(moneyString) {
    return Number(moneyString) / CONDITION.pricePerLotto;
  }

  #makeLotto() {
    const randoms = new Set([]);
    const min = CONDITION.lottoNumberMin;
    const max = CONDITION.lottoNumberMax;

    while (randoms.size < CONDITION.countOfNumberInTicket) {
      randoms.add(this.#makeRandom(min, max));
    }
    return new LottoNumberList(randoms);
  }

  #makeLottos() {
    this.#lottos = new Array(this.#purchaseCount).map(() => this.#makeLotto());
  }

  getLottos() {
    return this.#lottos;
  }

  #makeRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  getPurchaseCount() {
    return this.#purchaseCount;
  }
}

export default PurchaseLottoService;
