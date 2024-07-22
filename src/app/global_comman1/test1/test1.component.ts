import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.css']
})
export class Test1Component implements OnInit {

  id : any;
  type : any;


  constructor(private router: Router ,  private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {

    
    this.type = this.activatedRoute.snapshot.paramMap.get('type');
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    
    if(this.type === 'edit_order'){
      
      this.router.navigate(['/shop-owner-edit-order',{orderId: this.id}]);

    }else if(this.type === 'view_product'){

      this.router.navigate(['/view-product',{productId: this.id , time: 2} ]);

    }else if(this.type === 'view_products_reset'){

      this.router.navigate(['/view-products-non-log' ]);

    }
    
  }

}
