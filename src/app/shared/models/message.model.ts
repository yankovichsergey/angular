export class MessageModel {
    constructor(public type: string, public text: string) {
        this.type = type;
        this.text = text;
    }
}
