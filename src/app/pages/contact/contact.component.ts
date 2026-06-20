import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  isSubmitted = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['General Inquiry', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    const value = this.contactForm.value;
    
    // Simulate submission
    console.group('%c [Contact Form Message] ', 'background: #d97706; color: #fff; font-weight: bold; padding: 4px;');
    console.log('Sender Name:', value.name);
    console.log('Sender Email:', value.email);
    console.log('Subject:', value.subject);
    console.log('Message:', value.message);
    console.groupEnd();

    this.isSubmitted = true;
  }

  getEmailMailtoUrl(): string {
    const val = this.contactForm.value;
    const subject = encodeURIComponent(`${val.subject} - ${val.name}`);
    const body = encodeURIComponent(
      `Hello Amma,\n\nI have a message for you:\n\n` +
      `Subject: ${val.subject}\n` +
      `From: ${val.name} (${val.email})\n\n` +
      `Message:\n${val.message}\n`
    );

    return `mailto:jessiejane726@gmail.com?subject=${subject}&body=${body}`;
  }

  resetForm(): void {
    this.isSubmitted = false;
    this.contactForm.reset({
      subject: 'General Inquiry'
    });
  }
}
