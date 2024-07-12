export class Pig {
    name: string;
    height: string;
    weight: string;
    personality: string;
    category: string;
    constructor() {
        this.name = (<HTMLInputElement>document.getElementById('name')).value;
        this.height = (<HTMLInputElement>document.getElementById('height')).value;
        this.weight = (<HTMLInputElement>document.getElementById('weight')).value;
        this.personality = (<HTMLInputElement>document.getElementById('select')).value;
        this.category = (<HTMLInputElement>document.getElementById('category')).value;
    }
}
