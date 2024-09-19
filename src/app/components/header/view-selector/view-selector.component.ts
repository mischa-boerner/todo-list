import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterLink} from "@angular/router";
import {NgClass} from "@angular/common";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-view-selector',
  standalone: true,
  imports: [
    RouterLink,
    NgClass,
    MatTooltip
  ],
  templateUrl: './view-selector.component.html',
  styleUrl: './view-selector.component.scss'
})
export class ViewSelectorComponent implements OnInit{
  currentView: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.currentView = this.router.url;

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentView = event.urlAfterRedirects;
      }
    });
  }

  setView(n: number) {
    if (n === 0) {
      this.router.navigate(['/list']).then(() => {
        this.currentView = '/list';
      });
    } else {
      this.router.navigate(['/card']).then(() => {
        this.currentView = '/card';
      });
    }
  }

  isViewActive(view: string): boolean {
    return this.currentView.includes(view);
  }
}
