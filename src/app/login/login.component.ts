import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LoginService } from './login.service';
import { Usuario } from '../model/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  usuario: Usuario = new Usuario();
  errorMessage: string;
  constructor(private router: Router, private service: LoginService) { }

  ngOnInit() {
    sessionStorage.removeItem("token");
  }
  public redirectLogin() {
    this.router.navigate(['/mestructura/estructura/minicio']);
  }

  public login() {
    this.service.getToken(this.usuario).subscribe(
      usuario => {
        console.log("usuario", usuario);
        sessionStorage.setItem("token", usuario.token);
        this.redirectLogin();
      },
      error => {
        this.errorMessage = <any>error; console.log("error login", this.errorMessage);
        this.router.navigate(['/mlogin']);
      }
    );
  }

}
