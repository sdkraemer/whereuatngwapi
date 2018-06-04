import { Component, OnInit } from "@angular/core";
import { FriendService } from "../friend/friend.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { LocationsService } from "../locations/locations.service";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { ILocation } from "../core/models/location";

@Component({
  selector: "friend-viewer",
  templateUrl: "./friend-viewer.component.html",
  styleUrls: ["./friend-viewer.component.css"]
})
export class FriendViewerComponent implements OnInit {
  private friend$;
  locations: ILocation[];
  locations$ = new BehaviorSubject<ILocation[]>(this.locations);

  moments: ILocation[];
  moments$ = new BehaviorSubject<ILocation[]>(this.moments);

  constructor(
    private route: ActivatedRoute,
    private friendService: FriendService,
    private locationService: LocationsService
  ) {}

  ngOnInit() {
    // this.friend$ = this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) => {
    //     this.friendService.getFriend(params.get("id"));
    //   })
    // );
    let id = this.route.snapshot.paramMap.get("id");
    this.friend$ = this.friendService.getFriend(id);

    this.locationService
      .getLocations(id)
      .subscribe((locations: ILocation[]) => {
        let tempLocations: ILocation[] = [];
        let tempMoments: ILocation[] = [];
        locations.forEach(function(location) {
          tempLocations.push(location);
          if (location.message || location.twitterUrl) {
            tempMoments.push(location);
          }
        });
        this.locations$.next(tempLocations);
        this.moments$.next(tempMoments);
      });
  }
}
