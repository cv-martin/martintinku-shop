import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;

  getChilliesArray(spiceLevel: string): number[] {
    const count = spiceLevel === 'Mild' ? 1 : spiceLevel === 'Medium' ? 2 : spiceLevel === 'Hot' ? 3 : 4;
    return Array(count).fill(0);
  }
}
