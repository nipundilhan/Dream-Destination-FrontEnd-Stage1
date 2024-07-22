import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.css']
})
export class ConfirmationPopupComponent implements OnInit {

  action:string;
  local_data:any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any , private dialogRef: MatDialogRef<ConfirmationPopupComponent>) {

   }

  ngOnInit(): void {
  }

  doAction(){
    this.dialogRef.close({event:'yes'});
  }

  closeDialog(){
    this.dialogRef.close({event:'no'});
  }

}
