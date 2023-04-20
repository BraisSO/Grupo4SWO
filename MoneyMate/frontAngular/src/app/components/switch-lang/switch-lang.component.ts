import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-switch-lang',
  templateUrl: './switch-lang.component.html',
  styleUrls: ['./switch-lang.component.css']
})
export class SwitchLangComponent implements OnInit {

  constructor(
    public translate: TranslateService){}


  ngOnInit(): void {
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }
}
