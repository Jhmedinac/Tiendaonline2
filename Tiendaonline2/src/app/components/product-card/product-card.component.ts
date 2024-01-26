import { Component  , OnInit, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() title: string = '';
  @Input() image: string = '';
  @Input() short_desc: string = '';
  @Input() category: string = '';
  @Input() quantity: number = 0;
  @Input() price: string = '';
  @Input() id: number = 0;
  @Input() onAdd: any;

  constructor() {}

  ngOnInit(): void {}
}
