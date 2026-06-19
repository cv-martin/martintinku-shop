import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FAQItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent {
  faqs: FAQItem[] = [
    {
      question: 'Are these pickles and podis compliant for sale?',
      answer: 'We are currently validating availability and compliance by location. As a small-batch operation, we are strictly monitoring compliance with local Texas Cottage Food laws and only taking interest registries (preorders) for local distribution. No sales are active at this time.',
      isOpen: true // open first one by default
    },
    {
      question: 'Where do you source your ingredients?',
      answer: 'We source all raw materials, including organic fresh Gongura, green mangoes, and high-heat Guntur chillies, from local organic Indian grocery suppliers in Austin and trusted direct importers. All ingredients are personally inspected and sorted by Amma to maintain high standards.',
      isOpen: false
    },
    {
      question: 'Do you offer shipping outside of Austin, Texas?',
      answer: 'Currently, we are focusing strictly on the local Austin market for pickup. If you are located outside Austin, you can register your interest in the preorder form (select "Outside Austin" as location), and we will notify you once we establish compliant regional shipping pipelines.',
      isOpen: false
    },
    {
      question: 'What is the shelf life of the pickles and podis?',
      answer: 'Our pickles generally have a shelf life of 6 to 9 months when stored in a dry, cool place using clean, dry spoons. Our stone-ground podis maintain peak freshness for 3 to 4 months. Precise shelf life estimates and storage standards are printed on each jar\'s label.',
      isOpen: false
    },
    {
      question: 'Can I request a customized spice level or ingredients adjustment?',
      answer: 'Yes! Because we prepare in small batches under Amma\'s direct supervision, we can calibrate spice levels. If you prefer a milder burn or want extra garlic, simply leave a note in the Preorder Request form or message us directly on WhatsApp.',
      isOpen: false
    },
    {
      question: 'Is there a cost to join the preorder list?',
      answer: 'No. Joining the preorder registry is 100% free and requires no payment information. It is simply an expression of interest to help us gauge demand and schedule our kitchen batches.',
      isOpen: false
    }
  ];

  toggleFAQ(index: number): void {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }
}
