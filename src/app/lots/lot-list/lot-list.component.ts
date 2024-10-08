import { Component, OnInit } from '@angular/core';
import { LotService } from '../../services/lot.service';
import { Lot } from '../../models/lot.model';
import { Category } from '../../models/category.model';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-lot-list',
  templateUrl: './lot-list.component.html',
  styleUrls: ['./lot-list.component.css']
})
export class LotListComponent implements OnInit {
  lots: Lot[] = [];
  categories: Category[] = [];
  selectedCategoryId: number | null = null;

  constructor(private lotService: LotService,
    public authService: AuthService
  ) {}
  

  ngOnInit(): void {
    this.lotService.getLots().subscribe((data) => {
      this.lots = data;
    });
    
    this.lotService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  filterByCategory(): void {
    this.lotService.getLots().subscribe((data) => {
      if (this.selectedCategoryId) {
        this.lots = data.filter(lot => lot.categoryId === this.selectedCategoryId);
      } else {
        this.lots = data;
      }
    });
  }

  deleteLot(id: number): void {
    if (confirm('Are you sure you want to delete this lot?')) {
      this.lotService.deleteLot(id).subscribe(() => {
        this.lots = this.lots.filter(lot => lot.id !== id);
        alert('Lot deleted successfully!');
      });
    }
  }

  
}
