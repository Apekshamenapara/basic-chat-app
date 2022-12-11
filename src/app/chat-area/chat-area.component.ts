import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Database, getDatabase, ref, set, onValue  } from "firebase/database";
import { Chat } from 'src/chat/chat';
import { environment } from 'src/environments/environment';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.scss']
})
export class ChatAreaComponent {
  messages: any;
  message = '';
  name = localStorage.getItem('name');
  app: FirebaseApp;
  db: Database;
  chats: Chat[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.app = initializeApp(environment.firebase);
    this.db = getDatabase(this.app);
  }

  ngOnInit(): void {
    const chatsRef = ref(this.db, 'chats');
    onValue(chatsRef, (snapshot: any) => {
      const data = snapshot.val();
      for(let id in data) {
        if (!this.chats.map(chat => chat.id).includes(id)) {
          this.chats.push(data[id])
        }
      }
      this.scrollConversation()
    });
  }

  sendMessage() {
    const chat = {
      username: this.name,
      message: this.message,
      timestamp : new Date().toString(),
      id: uuidv4()
    }
    set(ref(this.db, `chats/${chat.id}`), chat);
    this.message = ""
    this.scrollConversation();
  }

  scrollConversation() {
    const box: any = document.getElementById("conversation");
    setTimeout(() => {
      box.scrollTop = box.scrollHeight;
    }, 100);
  }
}
