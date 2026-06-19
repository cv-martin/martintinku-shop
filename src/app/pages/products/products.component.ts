import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  
  categoryFilter: 'All' | 'Pickles' | 'Podis' | 'Combos' = 'All';
  sortBy: 'name' | 'spiceAsc' | 'spiceDesc' = 'name';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.allProducts = products;
      this.applyFilterAndSort();
    });
  }

  setCategoryFilter(category: 'All' | 'Pickles' | 'Podis' | 'Combos'): void {
    this.categoryFilter = category;
    this.applyFilterAndSort();
  }

  setSortOrder(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.sortBy = selectElement.value as 'name' | 'spiceAsc' | 'spiceDesc';
    this.applyFilterAndSort();
  }

  private applyFilterAndSort(): void {
    // 1. Apply category filter
    let result = [...this.allProducts];
    if (this.categoryFilter === 'Pickles') {
      result = result.filter(p => p.category === 'Pickles' || p.category === 'Non-Veg Pickles');
    } else if (this.categoryFilter === 'Podis') {
      result = result.filter(p => p.category === 'Podis / Spice Powders');
    } else if (this.categoryFilter === 'Combos') {
      result = result.filter(p => p.category === 'Combo Boxes');
    }

    // Helper to score spice level
    const getSpiceScore = (level: string): number => {
      switch (level) {
        case 'Mild': return 1;
        case 'Medium': return 2;
        case 'Hot': return 3;
        case 'Extra Hot': return 4;
        case 'Andhra Fire': return 5;
        default: return 0;
      }
    };

    // 2. Apply sorting
    if (this.sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.sortBy === 'spiceAsc') {
      result.sort((a, b) => getSpiceScore(a.spiceLevel) - getSpiceScore(b.spiceLevel));
    } else if (this.sortBy === 'spiceDesc') {
      result.sort((a, b) => getSpiceScore(b.spiceLevel) - getSpiceScore(a.spiceLevel));
    }

    this.filteredProducts = result;
  }
}
