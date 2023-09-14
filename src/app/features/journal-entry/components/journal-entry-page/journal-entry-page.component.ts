import { Component} from '@angular/core';

@Component({
  selector: 'app-journal-entry-page',
  templateUrl: './journal-entry-page.component.html',
  styleUrls: ['./journal-entry-page.component.css']
})
export class JournalEntryPageComponent{  

  ngOnInit(): void {
    this.calculateLastYearTotal();
    this.calculateThisYearTotal();
  }
  dateValue!: Date;
  lastYearTotal: number = 0;
  thisYearTotal: number = 0;

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
  ]
    
    
  onEditInit(event: any) { console.log("onEditInit", event); }
  onEditCancel(event: any) { console.log("onEditCancel", event); }
  onEditComplete(event: any) { 
    console.log("onEditComplete", event); 
    this.calculateLastYearTotal();
    this.calculateThisYearTotal();
  }

  // Save the journal entry - service
  save(){
    console.log(this.products)
  }

  // Save the journal entry and add another - service
  saveAndNew(){
    this.save()
    console.log(this.products)
  }

  //Add a new row
  addRow(){
    this.products.push({
      id: '',
      code: '',
      name: '',
      description: '',
      image: '',
      price: 0,
      category: '',
      quantity: 0,
      inventoryStatus: '',
      rating: 0
    })
  }
  deleteRow(index: number){
    this.products.splice(index, 1)
  }
  calculateLastYearTotal() {
      let total = 0;
      for(let product of this.products){
          total += product.price;
      }

      this.lastYearTotal = total;
  }

  calculateThisYearTotal() {
      let total = 0;
      for(let product of this.products) {
          total += product.quantity;
      }

      this.thisYearTotal = total;
  }
}

