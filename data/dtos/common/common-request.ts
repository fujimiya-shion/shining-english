export class CommonRequest {
    constructor(
        public readonly page?: number,
        public readonly perPage?: number,
    ) { }

    toParameters() {
        return {
            'page': this.page,
            'per_page': this.perPage,
        };
    }
}
