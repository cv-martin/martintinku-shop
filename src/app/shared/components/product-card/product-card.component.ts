import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../../core/models/product.model';
import { PreorderService } from '../../../core/services/preorder.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input({ required: true }) product!: Product;
  hasVoted = false;
  showVoteSuccess = false;

  constructor(private preorderService: PreorderService) {}

  ngOnInit(): void {
    this.hasVoted = this.preorderService.hasVoted(this.product.id);
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
