import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-messagetype1-dialog',
  templateUrl: './messagetype1-dialog.component.html',
  styleUrls: ['./messagetype1-dialog.component.css']
})
export class Messagetype1DialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any , private dialogRef: MatDialogRef<Messagetype1DialogComponent>) { }

  ngOnInit(): void {
  }

  closeDialog(){
    // Write your stuff here
    this.dialogRef.close(); // <- Close the mat dialog
  }

}
