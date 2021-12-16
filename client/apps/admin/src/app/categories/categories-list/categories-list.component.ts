import { Component, OnInit } from '@angular/core';
import { CategoriesService, Category } from '@client/products';

@Component({
    selector: 'client-categories-list',
    templateUrl: './categories-list.component.html',
    styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {
    categories: Category[] = [];

    constructor(private categoriesServices: CategoriesService) {}

    ngOnInit(): void {
        this.categoriesServices.getCategories().subscribe((categories) => {
            this.categories = categories;
        });
    }
}
