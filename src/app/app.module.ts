import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SignupComponent } from './view/signup/signup.component';
import { HomeComponent } from './view/home/home.component';
import { LoginComponent } from './view/login/login.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { DashboardComponent } from './view/dashboard/dashboard.component';
import { ChatPreviewComponent } from './component/chat-preview/chat-preview.component';
import { MessageComponent } from './component/message/message.component';
import { MessageWriterComponent } from './component/message-writer/message-writer.component';
import { ChatRoomComponent } from './view/chat-room/chat-room.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    DashboardComponent,
    ChatPreviewComponent,
    MessageComponent,
    MessageWriterComponent,
    ChatRoomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
