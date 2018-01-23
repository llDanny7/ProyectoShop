import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ProductService {

  constructor(private database: AngularFireDatabase) { }

  create(product){
      this.database.list('/products').push(product);      
  }

  getAll(){
      return this.database.list('/products');
  }

  get(productId){
      return this.database.object('/products/'+productId);
  }

  update(productId, product){
      return this.database.object('/products/'+productId).update(product);
  }

  delete(productId){
    return this.database.object('/products/'+productId).remove();
  }
}
