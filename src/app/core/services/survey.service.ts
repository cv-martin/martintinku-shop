import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface SurveyResponse {
  spicePreference: string;
  wishlistProducts: string[];
  purchaseFrequency: string;
  email?: string;
  feedback?: string;
  timestamp?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  private readonly STORAGE_KEY = 'hamk_surveys';

  constructor() {}

  submitSurvey(response: SurveyResponse): Observable<boolean> {
    try {
      const entry: SurveyResponse = {
        ...response,
        timestamp: new Date().toISOString()
      };

      const existingStr = localStorage.getItem(this.STORAGE_KEY);
      const surveys: SurveyResponse[] = existingStr ? JSON.parse(existingStr) : [];
      
      surveys.push(entry);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(surveys));

      // Console log entry for verification
      console.group('%c [Flavor Survey Submitted] ', 'background: #e5383b; color: #fff; font-weight: bold; padding: 4px;');
      console.log('Spice Preference:', entry.spicePreference);
      console.log('Wishlist Products:', entry.wishlistProducts);
      console.log('Purchase Frequency:', entry.purchaseFrequency);
      console.log('Email:', entry.email || 'N/A');
      console.log('Feedback:', entry.feedback || 'N/A');
      console.log('Timestamp:', entry.timestamp);
      console.groupEnd();

      return of(true);
    } catch (error) {
      console.error('Failed to save survey to localStorage:', error);
      return of(false);
    }
  }

  getSurveys(): SurveyResponse[] {
    try {
      const existingStr = localStorage.getItem(this.STORAGE_KEY);
      return existingStr ? JSON.parse(existingStr) : [];
    } catch (error) {
      console.error('Failed to read surveys from localStorage:', error);
      return [];
    }
  }
}
