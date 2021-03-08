import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
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
    // this.inputEluser.nativeElement.focus();
  }

  alertSucess: boolean = false;

  @ViewChild('inputUser', { static: false })
  inputEluser!: ElementRef;
  @ViewChild('inputBook', { static: false })
  inputElbook!: ElementRef;
  @ViewChild('inputBtn', { static: false })
  inputElbtn!: ElementRef;

  uid: any;
  formNewBook: FormGroup = new FormGroup({
    userid: new FormControl('', Validators.required),
    bookid: new FormControl('', Validators.required)
  });

  keyuser() {
    this.validUser();
    // this.inputElbook.nativeElement.focus();
  }
  keybook() {
    // this.inputElbtn.nativeElement.focus();
    this.validOldBook();
  }

  validUser(): void {
    var _submitFlg: boolean = true;
    var _submitErrorMsg: string = "";

    if (this.formNewBook.get('userid')?.value.trim().length <= 0) {
      _submitFlg = false;
      Swal.fire({
        icon: 'question',
        title: 'Oops...',
        text: 'User ID cannot be Empty. Please scan your ID card first ..!',
        footer: 'try again'
      });
    }

    if (_submitFlg) {
      this.book.userid = this.formNewBook.get('userid')!.value;
      this.service.checkUser(this.book).subscribe(
        (response) => {
          if (response.length != 0 || Validators === null) {
            this.inputElbook.nativeElement.focus();
            // this.alertSucess = true;
          } else {
            Swal.fire({
              icon: 'question',
              title: 'Oops...',
              text: 'Cannot find user.. !',
              footer: 'try again'
            });
            // _submitErrorMsg = 'This User Not Register user..';
            this.formNewBook.get('userid')!.setValue('');
            // alert(_submitErrorMsg);
            _submitFlg = false;

          }
        }
      );
    } else if (!_submitFlg) {
      alert(_submitErrorMsg);
      _submitFlg = true;
      _submitErrorMsg = "";
    }
  }

  validOldBook(): void {
    var _submitFlg: boolean = true;
    var _submitErrorMsg: string = "";

    if (this.formNewBook.get('book')?.value.trim().length <= 0) {
      _submitFlg = false;
      Swal.fire({
        icon: 'question',
        title: 'Oops...',
        text: 'Book ID cannot be Empty. Please scan your ID card first ..!',
        footer: 'try again'
      })
      // _submitErrorMsg = 'Book ID cannot be Empty. Please scan your book first ..';
    }
    if (_submitFlg) {
      this.book.bookrefid = this.formNewBook.get('bookid')!.value;
      this.service.checkBook(this.book).subscribe(
        (response) => {
          if (response.length != 0 || Validators === null) {
            // this.inputElbtn.nativeElement.focus();
            this.savedata();
            // this.alertSucess = true;
          } else {
            Swal.fire({
              icon: 'question',
              title: 'Oops...',
              text: 'Please scan book again !',
              footer: 'try again'
            });
            // _submitErrorMsg = '';
            this.formNewBook.get('bookid')!.setValue('');
            // alert(_submitErrorMsg);
            _submitFlg = false;

          }
        }
      );
    } else if (!_submitFlg) {
      alert(_submitErrorMsg);
      _submitFlg = true;
      _submitErrorMsg = "";
    }
  }

  savedata(): void {

    this.book.userbookid = 0;
    this.book.txndate = "";
    this.book.retdate = "";
    this.book.mark = 1;
    this.book.rackmark = "";

    this.book.userid = this.formNewBook.get('userid')!.value;
    this.book.bookrefid = this.formNewBook.get('bookid')!.value;

    this.service.saveData(this.book).subscribe(
      (result) => {
        if (result || !Validators === null) {
          if (result === 1) {
            Swal.fire({
              icon: 'success',
              title: 'OK',
              text: 'you borrowing this book',
              footer: 'done'
            });
          } else if (result === 2) {
            Swal.fire({
              icon: 'warning',
              title: 'Remember',
              text: 'Expire book return Date',
              footer: 'sorry'
            });
          } else if (result === 3) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'you borrowing is limit for this month !',
              footer: 'sorry'
            });
          } else if (result === 4) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'this book cannot borrow, please meet admin !',
              footer: 'sorry'
            });
          } else if (result === 5) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'this book you borrowed !',
              footer: 'sorry'
            });
          } else if (result === 0) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Try Again !',
              footer: 'sorry'
            });
          }
          this.formNewBook.get('userid')!.setValue('');
          this.formNewBook.get('bookid')!.setValue('');
        }
      });
    this.inputEluser.nativeElement.focus();
  }
}
