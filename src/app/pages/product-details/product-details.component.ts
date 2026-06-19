import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { PreorderService } from '../../core/services/preorder.service';
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
  hasVoted = false;
  showVoteSuccess = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private preorderService: PreorderService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      if (productId) {
        this.productService.getProductById(productId).subscribe(product => {
          if (product) {
            this.product = product;
            this.activeImagePath = product.imagePath;
            this.hasVoted = this.preorderService.hasVoted(product.id);
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
    const count = 
      spiceLevel === 'Mild' ? 1 : 
      spiceLevel === 'Medium' ? 2 : 
      spiceLevel === 'Hot' ? 3 : 
      spiceLevel === 'Extra Hot' ? 4 : 5; // 5 for Andhra Fire
    return Array(count).fill(0);
  }

  vote(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    if (!this.product) return;
    this.preorderService.submitVote(this.product.id).subscribe(success => {
      if (success) {
        this.hasVoted = true;
        this.showVoteSuccess = true;
        setTimeout(() => {
          this.showVoteSuccess = false;
        }, 3000);
      }
    });
  }
}
