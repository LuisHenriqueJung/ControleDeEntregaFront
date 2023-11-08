
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "../auth.service";




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [

  ]
})
export class LoginComponent implements OnInit{

  credentials = {
    email: '',
    password: ''
  };
  invalidForm = false
  showPassword = false;
  loading = false;
  loginForm!: FormGroup
  entrando = false

  constructor(
    private activatedRoute : ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    ) {

  }
  ngOnInit(): void {
    var tenant = this.activatedRoute.snapshot.params['tenant_id']
    localStorage.setItem('tenant',tenant)

    this.configurarFormulario()
  }

configurarFormulario(){
  this.loginForm = this.formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, Validators.required]
  })
}

login(){
  localStorage.removeItem('accessToken')
  this.entrando = true

  if(this.loginForm.invalid){
    this.invalidForm = true,
    this.entrando = false
  }else{
    this.credentials.email = this.loginForm.get('email')!.value
    this.credentials.password = this.loginForm.get('password')!.value
    this.authService.login(this.credentials.email, this.credentials.password).then(r=> {
      const url = localStorage.getItem('url')
      if(url && !url.includes('login'))
        this.router.navigate([url])
      else
        this.router.navigate(['/controle-entrega'])
      this.entrando = false
    }).catch(e=>{
      this.invalidForm = true
      this.entrando = false
      //this.showMessageService.falhaDeLogin()
    })
  }


}
  showHidePassword() {
    this.showPassword = !this.showPassword;
  }

  redirectRoute() {

  }

}
