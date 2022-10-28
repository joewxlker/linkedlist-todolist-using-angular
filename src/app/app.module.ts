import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoInterfaceComponent } from './todo/todo-interface/todo-interface.component';
import { TodoComponent } from './todo/todo.component';
import { InputModalComponent } from './todo/input-modal/input-modal.component';
import { SearchComponent } from './todo/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TodoInterfaceComponent,
    InputModalComponent,
    SearchComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
