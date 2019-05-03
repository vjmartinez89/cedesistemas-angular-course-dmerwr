import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatSort, MatTableDataSource } from '@angular/material';
import { MatSnackBar, MatDialog } from '@angular/material';
import { TripModel } from './trip.model';
import { DialogComponent } from './dialog/dialog.component';
import { DateFormatterPipe } from './dateformatter.pipe';


const ELEMENT_DATA: TripModel[] = [];

@Component({
  selector: 'trips',
  styleUrls: ['trips.component.css'],
  templateUrl: 'trips.component.html',
})
export class TripsComponent implements OnInit {

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog, private dateFormatterPipe: DateFormatterPipe) {

  }

  //Validators
  from = new FormControl('', [Validators.required]);
  to = new FormControl('', [Validators.required]);
  startDate = new FormControl(new Date());
  endDate = new FormControl(new Date());
  peopeCount = 1;

  displayedColumns: string[] = ['from', 'to', 'startDate', 'endDate', 'peopleCount', 'delete'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("inputFrom") fromField: ElementRef;
  @ViewChild("inputTo") toField: ElementRef;
  @ViewChild("dpStartDate") startDateField: ElementRef;
  @ViewChild("dpEndDate") endDateField: ElementRef;

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.startDate.disable();
    this.endDate.disable();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addTrip() {
    if (this.from.value == '') {
      this.openSnackBar('Please fill From field.', 'OK');
      this.fromField.nativeElement.focus();
      return;
    }

    if (this.to.value == '') {
      this.openSnackBar('Please fill To field.', 'OK');
      this.toField.nativeElement.focus();
      return;
    }

    if (this.startDate.value == '') {
      this.openSnackBar('Please select the Start date.', 'OK');
      this.startDateField.nativeElement.focus();
      return;
    }

    if (this.endDate.value == '') {
      this.openSnackBar('Please select the End date.', 'OK');
      this.endDateField.nativeElement.focus();
      return;
    }

    if (this.peopeCount == 0) {
      this.openSnackBar('Please select the People count.', 'OK');
      return;
    }

    ELEMENT_DATA.push(
      {
        from: this.from.value,
        to: this.to.value,
        startDate: this.dateFormatterPipe.transform(this.startDate.value),
        endDate: this.dateFormatterPipe.transform(this.endDate.value),
        peopleCount: this.peopeCount,
        id: (new Date()).getMilliseconds()
      }
    );
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.openSnackBar('Trip saved successfully.', 'OK');
    this.clear();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, { duration: 2000 });
  }

  delete(element) {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: 'Confirmation',
        message: 'Are you sure you want to delete this item?'
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let idx: number = 0;
        ELEMENT_DATA.forEach(
          function (el) {
            if (el.id === element.id) {
              ELEMENT_DATA.splice(idx, 1);
            }
            idx++;
          }
        );
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        this.openSnackBar('Trip deleted successfully.', 'OK');
      }
    });
  }

  clear() {
    this.from.setValue('');
    this.to.setValue('');
    this.startDate.setValue(new Date());
    this.endDate.setValue(new Date());
    this.peopeCount = 1;
    this.fromField.nativeElement.focus();
  }

}
