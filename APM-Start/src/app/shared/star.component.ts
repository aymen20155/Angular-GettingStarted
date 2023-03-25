import { Component, EventEmitter, Input, OnChanges, Output} from "@angular/core";

@Component({
    selector: 'pm-star',
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.css']
})
export class StarComponent implements OnChanges {
    @Input() rating: number = 4;
    cropWidth: number = 75;

    @Output()
    ratingClicked: EventEmitter<string> = new EventEmitter();

    ngOnChanges(): void {
        console.log('Inside Onchange:', this.cropWidth);
        this.cropWidth = this.rating * 75/5;
    }

    onClick(): void {
        console.log(`the rating ${this.rating} was clicked !`);
        this.ratingClicked.emit(`the rating ${this.rating} was clicked !`);
    }

}