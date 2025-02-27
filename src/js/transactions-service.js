import { mockup } from "../constants";

export default class TransactionsService {
  constructor() {
    this.page = 1;
    this.per_page = this._setPerPageBasedOnScreenWidth();
    this._setupResizeListener();
  }

  _setPerPageBasedOnScreenWidth() {
    if (window === undefined) return 6;

    if (window.innerWidth < 1024) {
      return 6;
    }

    if (window.innerWidth < 1440) {
      return 8;
    }

    return 10;
  }

  _setupResizeListener() {
    window.addEventListener("resize", () => {
      const newPerPage = this._setPerPageBasedOnScreenWidth();
      if (this.per_page !== newPerPage) {
        this.per_page = newPerPage;
        if (
          this.page >
          Math.ceil(mockup.home.transactions.data.length / this.per_page)
        ) {
          this.resetPage();
        }
      }
    });
  }

  async fetchTransactions(page = this.page) {
    // TODO request to backend
    // const url = "";
    const response = mockup.home.transactions.data.slice(
      (page - 1) * this.per_page,
      page * this.per_page
    );

    this.setPage(page);

    const returnedData = {
      total: mockup.home.transactions.data.length,
      page: this.page,
      data: response
    };

    return returnedData;
  }

  setPage(page) {
    this.page = page;
  }

  incrementPage() {
    const totalPages = Math.ceil(
      mockup.home.transactions.data.length / this.per_page
    );
    if (this.page < totalPages) {
      this.page += 1;
    }
  }

  decrementPage() {
    if (this.page > 1) {
      this.page -= 1;
    }
  }

  resetPage() {
    this.page = 1;
  }
}
