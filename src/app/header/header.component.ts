import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, AUTOCOMPLETE_OPTION_HEIGHT } from '@angular/material';
import { UserService } from '../services/user.service';
import { LogInComponent } from '../log-in/log-in.component';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-header',
  providers: [ UserService ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() refreshRequest = new EventEmitter<any>();

  constructor(private userService: UserService,
    public dialog: MatDialog) { }

  ngOnInit() {
  }

  openLogInDialog(): void {
    let dialogRef = this.dialog.open(LogInComponent, {
      panelClass: 'log-in-dialog'
    });

    dialogRef.afterClosed().subscribe(shouldRefresh => {
      if(shouldRefresh) {
        this.refreshRequest.emit(null);
      }
    })
  }
}
