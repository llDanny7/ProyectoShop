import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'app/category.service';

@Component({
    selector: 'product-filter',
    templateUrl: './product-filter.component.html',
    styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
    @Input() categorySelected;
    categories$;
    constructor(private categoryService: CategoryService) { 
        this.categories$ = categoryService.getCategories();
    }

    ngOnInit() {
    }

}
