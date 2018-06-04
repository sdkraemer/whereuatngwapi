import { Component, OnInit, Input } from "@angular/core";
import { ILocation } from "../../core/models/location";

@Component({
  selector: "tweet-moment",
  templateUrl: "./tweet-moment.component.html",
  styleUrls: ["./tweet-moment.component.css"]
})
export class TweetMomentComponent implements OnInit {
  @Input("moment") moment;

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {}
}
