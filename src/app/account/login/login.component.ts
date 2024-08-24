import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { User } from '../../shared/models/register';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm : FormGroup = new FormGroup({});
  submitted : boolean = false;
  errorMessages : string[]=[];

  constructor(private accountService : AccountService,
    private formBuilder : FormBuilder,
    private toaster : ToastrService,
  private router : Router) {
      this.accountService.user$.pipe(take(1)).subscribe({
      next : (user : User | null)=>{
        if(user){
          this.router.navigateByUrl('')
        }
      }
      })
    }
  ngOnInit(): void {
    this.initilizeForm();
  }
  initilizeForm(){
    this.loginForm = this.formBuilder.group({
      userName : ['', [Validators.required, Validators.pattern('^[\\w-\\.]+@[\\w-\\.]+\\.[a-z]{2,4}$')]],
      password : ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],

    })
  }
  login(){
    this.submitted = true;
    this.errorMessages = [];
    if(this.loginForm.valid){
      this.accountService.login(this.loginForm.value).subscribe({
        next : (response: any)=>{
          this.submitted = false;
        },
        error : (err:any)=>{
          debugger
          this.errorMessages = err.error.errors;
          console.log(err);
          this.toaster.warning(err);
        }
    });
      this.submitted = false;
      this.initilizeForm();
      
    }
  }
}
