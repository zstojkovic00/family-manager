import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Family } from './family';
import { FamilyService } from './family.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public family123: Family[] = [];
  public editFamily: Family | undefined;
  public deleteFamily: Family | undefined;

  constructor(private familyService : FamilyService){}

  ngOnInit() {
    this.getFamily();
  }

  public getFamily(): void {
    this.familyService.getFamily().subscribe({
      next: (response: Family[]) => {
        this.family123 = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public onOpenModal(mode: string, family?: Family): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addFamilyModal');
    } else if (mode === 'delete') {
      this.deleteFamily = family;
      button.setAttribute('data-target', '#deleteFamilyModal');
    } else if (mode === 'edit') {
      this.editFamily = family;
      button.setAttribute('data-target', '#editFamilyModal');
    }

    container?.appendChild(button);
    button.click();
  }

  public onAddFamily(addForm: NgForm): void {
    document.getElementById('add-family-form')?.click();
    this.familyService.addFamily(addForm.value).subscribe({
      next: (response: Family) => {
        console.log(response);
        this.getFamily();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    })
  }

  public onUpdateFamily(family: Family): void {
    this.editFamily = family;
    this.familyService.updateFamily(family).subscribe({
      next: (response: Family) => {
        console.log(response);
        this.getFamily();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public onDeleteFamily(familyId: number): void {
    this.familyService.deleteFamily(familyId).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getFamily();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public searchFamily(key: string): void {
    const results: Family[] = [];
    for (const family of this.family123) {
      if (family.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || family.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || family.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || family.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(family);
      }
    }

    this.family123 = results;
    if (results.length === 0 || !key) {
      this.getFamily();
    }
  }

}