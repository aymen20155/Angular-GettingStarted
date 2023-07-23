import { Component, OnInit, OnDestroy } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";
import { Subscription } from "rxjs";

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  constructor (private productService: ProductService) {}

    pageTitle: string = 'Product List';
    imageWidh: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;

    errorMessage: string = '';
    sub!: Subscription;

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
        this.sub = this.productService.getProducts().subscribe({
          next: products => {
            this.products = products;
            this.filteredProducts = this.products;
          },
          error: err => this.errorMessage = err
        });
        // this.listFilter = 'cart';
      }

      ngOnDestroy(): void {
        this.sub.unsubscribe();
      }

      onRatingClicked(msg: string): void {
        console.log(msg);
        this.pageTitle = 'ProsuctList: ' + msg;
      }
}


