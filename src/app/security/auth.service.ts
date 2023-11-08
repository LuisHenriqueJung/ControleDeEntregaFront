import { TranslateService } from './../../../node_modules/@ngx-translate/core/lib/translate.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  jwtPayload:any
  oauthTokenUrl : string = `${environment.apiUrl}/auth/signin`
  refreshTokenUrl: string = `${environment.apiUrl}/auth/refreshToken`

  constructor(private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router
) {
  this.getToken()
 }

  ngOnInit(): void {
    this.carregarToken()
  }

  login(email: string, password: string): Promise<void>{
    let headers = new HttpHeaders()
    .append('Content-Type', 'application/json');

    let body = {
      "email": email,
      "password": password
    }
    return this.http.post(this.oauthTokenUrl,body,{headers}).toPromise().then((r: any)=>{
      this.armazenarToken(r.accessToken)
      let language = r.language
      //this.translateService.use(language);
      let user = r.user
      let refreshToken = r.refreshToken
      localStorage.setItem('language',language)
      localStorage.setItem('user',user)
      localStorage.setItem('refreshToken',refreshToken)
     return r
    }).catch((e:any)=>{
      if(e['status'] === 403){
        return Promise.reject('Usuário ou senha inválidos')
      }
      return Promise.reject(e)
    })
  }
  getNewAccessToken(): Promise<void> {
    const headers = new HttpHeaders()
      .append('Refresh-Token', `Bearer ${localStorage.getItem('refreshToken')}`);
    return this.http.get(this.refreshTokenUrl,
      { headers})
      .toPromise()
      .then(async (response: any) => {
       await  this.armazenarToken(response.accessToken);
        localStorage.setItem('refreshToken',response.refreshToken)
        console.log('Novo access token criado!');

        return Promise.resolve();
      })
      .catch(response => {
        console.error('Erro ao renovar token.', response);
        return Promise.resolve();
      });
  }

  private getToken(){
    this.jwtPayload = localStorage.getItem('accessToken')
  }


  private carregarToken(){
    const token = localStorage.getItem('accessToken')
    if(token)
      this.armazenarToken(token)
  }

  private armazenarToken(token: string){
    localStorage.setItem('accessToken',token)
  }

  isAccessTokenInvalido(){
    const token = localStorage.getItem('accessToken')
    return !token || this.jwtHelper.isTokenExpired(token)
  }

  logout(){
    localStorage.clear()
    this.router.navigate(['/login'])
  }



}
