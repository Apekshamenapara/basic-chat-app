import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Database, getDatabase, ref, set, onValue  } from "firebase/database";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  db: Database;

  constructor(private route: ActivatedRoute,private router: Router) {
    // this.db = getDatabase(this.app);
    // this.loginRef = ref(this.db, 'chats');
  }

  ngOnInit() {
    const user =localStorage.getItem('name');
    if(user){
      console.log('navigate')
      this.router.navigate(["chat"]);
    }
    this.loginForm = new FormGroup({
      email: new FormControl( "", [Validators.required]),
      name: new FormControl("", [Validators.required])
    });
  }


  doLogin() {
      const data = {
        email: this.loginForm.value.email.toLowerCase(),
        name: this.loginForm.value.name,
      };
      localStorage.setItem('name',data.name)
      this.router.navigate(["/", "chat"]);
  }
}


