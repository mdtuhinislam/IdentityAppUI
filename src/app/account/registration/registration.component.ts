import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../shared/models/register';
import { take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit{

registrationForm : FormGroup = new FormGroup({});
submitted : boolean = false;
errorMessages : string[]=[];
  constructor(private accountService : AccountService,
    private formBuilder : FormBuilder,
    private roter : Router,
    private toaster : ToastrService

  ){
    debugger
    this.accountService.user$.pipe(take(1)).subscribe({
      next: (user : User | null) =>{
        debugger
        if(user){
          console.log('User: ',user);
          debugger
          this.roter.navigateByUrl('');
        }
      },
      error : (error)=>{
        console.log('Register page error :', error);
      }
    })
  }
  ngOnInit(): void {
    this.initilizeForm();
  }
  initilizeForm(){
    this.registrationForm = this.formBuilder.group({
      firstName : ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      lastName : ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.pattern('^[\\w-\\.]+@[\\w-\\.]+\\.[a-z]{2,4}$')]],
      password : ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],

    })
  }
  register(){
    
    this.submitted = true;
    this.errorMessages = [];
    if(this.registrationForm.valid){
      this.accountService.register(this.registrationForm.value).subscribe({
        next : (response: any)=>{
          this.toaster.success(response,"Message");
        },
        error : (err:any)=>{
          debugger
          this.errorMessages = err.error.errors;
          console.log(err);
          this.toaster.warning(err);
        }
    });
      this.initilizeForm();
    }
    
  }

}
