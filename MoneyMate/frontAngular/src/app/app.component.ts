import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontAngular';
  langChanged = new EventEmitter<string>();

  constructor(public translate: TranslateService) {
    translate.addLangs(['english', 'castellano', 'galego']);
    translate.setDefaultLang('english');
  }

  changeLang(lang:string){
    this.translate.use(lang);
    this.langChanged.emit(lang);
  }
}
