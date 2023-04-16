import { Component, OnInit } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor (private productService: ProductService) {}

    pageTitle: string = 'Product List';
    imageWidh: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;

    private _listFilter: string = '';
    get listFilter(): string {
      return this._listFilter;
    }

    set listFilter(value: string) {
      this._listFilter = value;
      this.filteredProducts = this.performFilter(value);
      console.log('In setter:', value);
    }

    performFilter(filterBy: string): IProduct[] {
      filterBy = filterBy.toLocaleLowerCase();
      return this.products.filter(
                           (product: IProduct) => 
                                product.productName.toLocaleLowerCase().includes(filterBy)
                          );
    }

    filteredProducts: IProduct[] = [];

    products: IProduct[] = [];

      toogleImage(): void {
        this.showImage = !this.showImage;
      }

      ngOnInit(): void {
        console.log('In OnInit method ...');
        this.products = this.productService.getProducts();
        this.filteredProducts = this.products;
        // this.listFilter = 'cart';
      }

      onRatingClicked(msg: string): void {
        console.log(msg);
        this.pageTitle = 'ProsuctList: ' + msg;
      }
}


