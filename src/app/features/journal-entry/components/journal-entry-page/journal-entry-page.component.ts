import { Component } from '@angular/core';

@Component({
  selector: 'app-journal-entry-page',
  templateUrl: './journal-entry-page.component.html',
  styleUrls: ['./journal-entry-page.component.css']
})
export class JournalEntryPageComponent {
  products = [
    {
      id: '1011',
      code: '4920nnc2d',
      name: 'Green Earbuds',
      description: 'Product Description',
      image: 'green-earbuds.jpg',
      price: 89,
      category: 'Electronics',
      quantity: 23,
      inventoryStatus: 'INSTOCK',
      rating: 4
    },
    {
      id: '1012',
      code: '4810nnc2d',
      name: 'Yellow Earbuds',
      description: 'Product Description',
      image: 'yellow-earbuds.jpg',
      price: 89,
      category: 'Electronics',
      quantity: 23,
      inventoryStatus: 'INSTOCK',
      rating: 3
    },
    {
      id: '1013',
      code: '4810nnc2d',
      name: 'Red Earbuds',
      description: 'Product Description',
      image: 'red-earbuds.jpg',
      price: 89,
      category: 'Electronics',
      quantity: 23,
      inventoryStatus: 'INSTOCK',
      rating: 5
    },
    {
      id: '1014',
      code: '4810nnc2d',
      name: 'White Earbuds',
      description: 'Product Description',
      image: 'white-earbuds.jpg',
      price: 89,
      category: 'Electronics',
      quantity: 23,
      inventoryStatus: 'INSTOCK',
      rating: 4
    },
    {
      id: '1015',
      code: '4810nnc2d',
      name: 'Black Earbuds',
      description: 'Product Description',
      image: 'black-earbuds.jpg',
      price: 89,
      category: 'Electronics',
      quantity: 23,
      inventoryStatus: 'INSTOCK',
      rating: 3
    },
    {
      id: '1016',
      code: '4810nnc2d',
      name: 'Blue Earbuds',
      description: 'Product Description',
      image: 'blue-earbuds.jpg',
      price: 89,
      category: 'Electronics',
      quantity: 23,
      inventoryStatus: 'INSTOCK',
      rating: 5
    },
    {
      id: '1017',
      code: '4810nnc2d',
      name: 'Purple Earbuds',
      description: 'Product Description',
      image: 'purple-earbuds.jpg',
      price: 89,
      category: 'Electronics',
      quantity: 23,
      inventoryStatus: 'INSTOCK',
      rating: 4
    },
    {
      id: '1018',
    }


  ]
}
