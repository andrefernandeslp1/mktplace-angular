import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { HeaderComponent } from "./components/header/header.component";
import { JWTTokenService } from './service/jwttoken.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mktplace';

  constructor() {

    // ADMIN
    // let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwidXNlcm5hbWUiOiJKb2huIERvZSIsImVtYWlsIjoiam9obkBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyfQ.VpHyZoAxWyORUg4NcWhSgC5KKME956kwwGcT4NIk6Ko"

    // SELLER
    // let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwidXNlcm5hbWUiOiJKb2huIERvZSIsImVtYWlsIjoiam9obkBnbWFpbC5jb20iLCJyb2xlIjoic2VsbGVyIiwic3ViIjoiMTIzNDU2Nzg5MCIsImlhdCI6MTUxNjIzOTAyMn0.51gA0v2bbZoqqk2ku8djkXixBVxs9y9IUtrE9BW4V-g"

    // CLIENT
    // let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwidXNlcm5hbWUiOiJKb2huIERvZSIsImVtYWlsIjoiam9obkBnbWFpbC5jb20iLCJyb2xlIjoiY2xpZW50Iiwic3ViIjoiMTIzNDU2Nzg5MCIsImlhdCI6MTUxNjIzOTAyMn0.0hRd9B7Qy9u3eNqGz-Dv8-XpQn1UhkPcRk5p2r6Ojiw"

    const token = localStorage.getItem("authToken");

    if (token) {
      let decodedToken = jwtDecode<JwtPayload & any>(token);

      console.log(decodedToken)
      // console.log(decodedToken.id)
      // console.log(decodedToken.username)
      console.log(decodedToken.email)
      // console.log(decodedToken.role)
      console.log('+'+inject(JWTTokenService).getEmail())
      // localStorage.setItem("email", decodedToken.email);
    }
      // document.cookie = "authToken="+ token;
      // localStorage.setItem("authToken", token);

  }
}
