import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface PreorderRequest {
  name: string;
  email: string;
  phone: string;
  location: string;
  products: string[]; // List of product IDs
  quantityEstimation: string;
  customMessage?: string;
  timestamp?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PreorderService {
  private readonly STORAGE_KEY = 'hamk_preorders';

  constructor() {}

  submitPreorder(request: PreorderRequest): Observable<boolean> {
    try {
      const entry: PreorderRequest = {
        ...request,
        timestamp: new Date().toISOString()
      };

      // Retrieve existing preorders
      const existingStr = localStorage.getItem(this.STORAGE_KEY);
      const preorders: PreorderRequest[] = existingStr ? JSON.parse(existingStr) : [];
      
      // Add new preorder
      preorders.push(entry);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(preorders));

      // Console log entry
      console.group('%c [Preorder Submitted] ', 'background: #8b261a; color: #fff; font-weight: bold; padding: 4px;');
      console.log('Name:', entry.name);
      console.log('Email:', entry.email);
      console.log('Phone/WhatsApp:', entry.phone);
      console.log('Location:', entry.location);
      console.log('Selected Products:', entry.products);
      console.log('Estimated Quantity:', entry.quantityEstimation);
      console.log('Custom Message:', entry.customMessage);
      console.log('Timestamp:', entry.timestamp);
      console.groupEnd();

      return of(true);
    } catch (error) {
      console.error('Failed to save preorder to localStorage:', error);
      return of(false);
    }
  }

  getPreorders(): PreorderRequest[] {
    try {
      const existingStr = localStorage.getItem(this.STORAGE_KEY);
      return existingStr ? JSON.parse(existingStr) : [];
    } catch (error) {
      console.error('Failed to read preorders from localStorage:', error);
      return [];
    }
  }

  submitVote(productId: string): Observable<boolean> {
    try {
      const existingStr = localStorage.getItem('hamk_votes');
      const votes: string[] = existingStr ? JSON.parse(existingStr) : [];
      if (!votes.includes(productId)) {
        votes.push(productId);
        localStorage.setItem('hamk_votes', JSON.stringify(votes));
      }
      return of(true);
    } catch (error) {
      console.error('Failed to save vote to localStorage:', error);
      return of(false);
    }
  }

  hasVoted(productId: string): boolean {
    try {
      const existingStr = localStorage.getItem('hamk_votes');
      const votes: string[] = existingStr ? JSON.parse(existingStr) : [];
      return votes.includes(productId);
    } catch {
      return false;
    }
  }
}
