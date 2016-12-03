import {Component, OnInit} from '@angular/core';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public articles : any[];

  constructor( private http : Http ){

  }

  ngOnInit(): void {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.get('http://articles.demo.com:10080/api/v1/articles/recent/50', { headers })
      .map(res => res.json())
      .toPromise()
      .then((result) => {
        this.articles = result;
      })
  };

  title = 'app works!';
}
