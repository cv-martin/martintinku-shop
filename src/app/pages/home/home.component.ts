import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  featuredPickles: Product[] = [];
  featuredPodis: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      const available = products.filter(p => p.availabilityStatus !== 'Coming Soon');

      // Featured pickles (Veg + Non-Veg), max 3
      this.featuredPickles = available
        .filter(p => p.category === 'Pickles' || p.category === 'Non-Veg Pickles')
        .slice(0, 3);

      // Featured podis, max 3
      this.featuredPodis = available
        .filter(p => p.category === 'Podis / Spice Powders')
        .slice(0, 3);
    });
  }
}
