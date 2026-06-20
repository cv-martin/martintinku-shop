import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';
import { PreorderService } from '../../core/services/preorder.service';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-preorder',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './preorder.component.html',
  styleUrls: ['./preorder.component.scss']
})
export class PreorderComponent implements OnInit {
  preorderForm!: FormGroup;
  allProducts: Product[] = [];
  preselectedProductId: string | null = null;

  isSubmitted = false;
  isSubmissionSuccess = false;
  noProductsError = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService,
    private preorderService: PreorderService
  ) {}

  ngOnInit(): void {
    // Initialize standard structure
    this.preorderForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[+]?[0-9\s\-()]{7,20}$/)]],
      location: ['', Validators.required],
      productIds: this.fb.group({}),
      quantityEstimation: ['1-2 Jars', Validators.required],
      customMessage: ['']
    });

    // Fetch products
    this.productService.getProducts().subscribe(products => {
      this.allProducts = products;
      
      // Parse query parameters
      this.route.queryParams.subscribe(params => {
        this.preselectedProductId = params['productId'] || null;
        this.buildProductCheckboxes();
      });
    });
  }

  buildProductCheckboxes(): void {
    const checkboxGroup = this.fb.group({});
    this.allProducts.forEach(prod => {
      const isSelected = prod.id === this.preselectedProductId;
      checkboxGroup.addControl(prod.id, this.fb.control(isSelected));
    });
    this.preorderForm.setControl('productIds', checkboxGroup);
  }

  get productIdsGroup(): FormGroup {
    return this.preorderForm.get('productIds') as FormGroup;
  }

  onSubmit(): void {
    if (this.preorderForm.invalid) {
      this.preorderForm.markAllAsTouched();
      return;
    }

    const formValue = this.preorderForm.value;
    
    // Extract selected product IDs
    const selectedProductIds: string[] = [];
    Object.keys(formValue.productIds).forEach(id => {
      if (formValue.productIds[id]) {
        selectedProductIds.push(id);
      }
    });

    if (selectedProductIds.length === 0) {
      this.noProductsError = true;
      return;
    }
    this.noProductsError = false;

    const request = {
      name: formValue.name,
      email: formValue.email,
      phone: formValue.phone,
      location: formValue.location,
      products: selectedProductIds,
      quantityEstimation: formValue.quantityEstimation,
      customMessage: formValue.customMessage
    };

    this.preorderService.submitPreorder(request).subscribe(success => {
      this.isSubmitted = true;
      this.isSubmissionSuccess = success;
    });
  }

  getEmailMailtoUrl(): string {
    const val = this.preorderForm.value;
    const selectedProds = this.allProducts
      .filter(p => val.productIds[p.id])
      .map(p => p.name)
      .join(', ');

    const subject = encodeURIComponent(`Preorder Interest - ${val.name}`);
    const body = encodeURIComponent(
      `Hello Amma,\n\nI would like to register my preorder interest with the following details:\n\n` +
      `- Name: ${val.name}\n` +
      `- Email: ${val.email}\n` +
      `- Phone/WhatsApp: ${val.phone}\n` +
      `- Area: ${val.location}\n` +
      `- Products: ${selectedProds}\n` +
      `- Estimated Quantity: ${val.quantityEstimation}\n` +
      `- Special Requests: ${val.customMessage || 'None'}\n\n` +
      `Thank you!`
    );

    return `mailto:jessiejane726@gmail.com?subject=${subject}&body=${body}`;
  }

  resetForm(): void {
    this.isSubmitted = false;
    this.isSubmissionSuccess = false;
    this.preorderForm.reset({
      quantityEstimation: '1-2 Jars'
    });
    this.buildProductCheckboxes();
  }
}
