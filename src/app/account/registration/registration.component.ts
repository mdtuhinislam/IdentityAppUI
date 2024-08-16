import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private formBuilder : FormBuilder

  ){

  }
  ngOnInit(): void {
    this.initilizeForm();
  }
  initilizeForm(){
    this.registrationForm = this.formBuilder.group({
      firstName : ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      lastName : ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      email : ['', [Validators.required, Validators.pattern('^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$')]],
      password : ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],

    })
  }
  register(){
    debugger;
    console.log(this.registrationForm.value);
    this.submitted = true;
    this.errorMessages = [];
    this.accountService.register(this.registrationForm.value).subscribe({
      next : (response: any)=>{
        alert(response.status);
      },
      error : (err:any)=>{
        alert(err.error);
      }
  });
    console.log(this.registrationForm.value);
    this.initilizeForm();
  }

}
