import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SurveyService } from '../../core/services/survey.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  surveyForm!: FormGroup;
  isSubmitted = false;
  isSubmissionSuccess = false;

  wishlistOptions = [
    { id: 'gongura', label: 'Gongura Pickle (Sorrel Leaves)' },
    { id: 'allam', label: 'Allam Pachadi (Ginger Pickle)' },
    { id: 'tomato', label: 'Tomato Nilava Pachadi (Sun-dried Tomato)' },
    { id: 'karam', label: 'Nalla Karam Podi (Black Sesame & Lentil)' },
    { id: 'kandi', label: 'Kandi Podi (Roasted Lentils & Ghee)' }
  ];

  constructor(
    private fb: FormBuilder,
    private surveyService: SurveyService
  ) {}

  ngOnInit(): void {
    const wishlistGroup = this.fb.group({});
    this.wishlistOptions.forEach(opt => {
      wishlistGroup.addControl(opt.id, this.fb.control(false));
    });

    this.surveyForm = this.fb.group({
      spicePreference: ['', Validators.required],
      wishlistProducts: wishlistGroup,
      purchaseFrequency: ['', Validators.required],
      email: ['', [Validators.email]],
      feedback: ['']
    });
  }

  get wishlistGroup(): FormGroup {
    return this.surveyForm.get('wishlistProducts') as FormGroup;
  }

  onSubmit(): void {
    if (this.surveyForm.invalid) {
      this.surveyForm.markAllAsTouched();
      return;
    }

    const formValue = this.surveyForm.value;
    const selectedWishlist: string[] = [];
    Object.keys(formValue.wishlistProducts).forEach(key => {
      if (formValue.wishlistProducts[key]) {
        selectedWishlist.push(key);
      }
    });

    const surveyResponse = {
      spicePreference: formValue.spicePreference,
      wishlistProducts: selectedWishlist,
      purchaseFrequency: formValue.purchaseFrequency,
      email: formValue.email || undefined,
      feedback: formValue.feedback || undefined
    };

    this.surveyService.submitSurvey(surveyResponse).subscribe(success => {
      this.isSubmitted = true;
      this.isSubmissionSuccess = success;
    });
  }

  resetForm(): void {
    this.isSubmitted = false;
    this.isSubmissionSuccess = false;
    this.surveyForm.reset({
      spicePreference: '',
      purchaseFrequency: '',
      email: '',
      feedback: ''
    });
    
    // Reset wishlist checkboxes
    const wishlistGroup = this.surveyForm.get('wishlistProducts') as FormGroup;
    if (wishlistGroup) {
      Object.keys(wishlistGroup.controls).forEach(key => {
        wishlistGroup.controls[key].setValue(false);
      });
    }
  }
}
