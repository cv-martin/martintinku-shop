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
  comboBoxes: Product[] = [];
  comingSoonProducts: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      // Filter out Coming Soon first for the active catalogs
      const available = products.filter(p => p.availabilityStatus !== 'Coming Soon');
      
      // Filter pickles (Veg and Non-Veg)
      this.featuredPickles = available.filter(p => p.category === 'Pickles' || p.category === 'Non-Veg Pickles').slice(0, 3);
      
      // Filter podis
      this.featuredPodis = available.filter(p => p.category === 'Podis / Spice Powders').slice(0, 3);
      
      // Filter Combo Boxes
      this.comboBoxes = available.filter(p => p.category === 'Combo Boxes');
      
      // Filter Coming Soon
      this.comingSoonProducts = products.filter(p => p.availabilityStatus === 'Coming Soon');
    });
  }
}
