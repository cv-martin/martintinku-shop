import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;
  activeImagePath: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      if (productId) {
        this.productService.getProductById(productId).subscribe(product => {
          if (product) {
            this.product = product;
            this.activeImagePath = product.imagePath;
          } else {
            // Product not found, redirect to catalog
            this.router.navigate(['/products']);
          }
        });
      } else {
        this.router.navigate(['/products']);
      }
    });
  }

  setActiveImage(path: string): void {
    this.activeImagePath = path;
  }

  getChilliesArray(spiceLevel: string): number[] {
    const count = spiceLevel === 'Mild' ? 1 : spiceLevel === 'Medium' ? 2 : spiceLevel === 'Hot' ? 3 : 4;
    return Array(count).fill(0);
  }
}
