import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Userbookdto } from '../dto/userbookdto';
import { Userbookservice } from '../service/userbookservice';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  constructor(private service: Userbookservice) { }
  book: Userbookdto = new Userbookdto();
  
  ngOnInit(): void {
  }

  @ViewChild('inputUser', { static: false })
  inputEluser!: ElementRef;
  @ViewChild('inputBook', { static: false })
  inputElbook!: ElementRef;
  @ViewChild('inputBtn', { static: false })
  inputElbtn!: ElementRef;


  keyuser() {
    this.inputElbook.nativeElement.focus();
  }
  keybook() {
    this.inputElbtn.nativeElement.focus();
  }

  formNewBook: FormGroup = new FormGroup({
    userid: new FormControl('', Validators.required),
    bookid: new FormControl('', Validators.required)
  });


  savedata(): void {
    this.book.userid = this.formNewBook.get('userid')!.value;
    this.book.bookid = this.formNewBook.get('bookid')!.value;   

    this.service.saveData(this.book).subscribe(
      (result) => {
        if (result || !Validators === null) {
          alert('New Book has been saved successfully !');
          this.formNewBook.get('tagid')!.setValue('');
          this.formNewBook.get('name')!.setValue('');
        } else {
          alert('Failed to save the book..');
        }
      }
    );
  }



}
