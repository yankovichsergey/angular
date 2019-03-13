export class EventModel {
    constructor(
        public type: string,
        public amount: number,
        public category: number,
        public description: string,
        public date: string,
        public id?: number,
        public catName?: string
    ) {
        this.type = type;
        this.amount = amount;
        this.category = category;
        this.description = description;
        this.date = date;
        this.id = id;
        this.catName = catName;
    }
}
