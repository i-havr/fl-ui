import { mockup } from "../constants";

export default class TransactionsService {
  constructor() {
    this.page = 1;
    this.per_page = 6;
  }

  async fetchTransactions(page = this.page, per_page = this.per_page) {
    // const url = "";
    const response = mockup.home.transactions.data.slice(
      (page - 1) * per_page,
      page * per_page
    );

    this.setPage(page);
    this.setPerPage(per_page);

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

  setPerPage(per_page) {
    this.per_page = per_page;
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
