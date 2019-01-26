import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Resource } from '../shared/models';

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'edit-resource-dialog.html',
})
export class EditResourceDialog {

  public data: Resource;

  public categories = ["Blogs", "General", "Links", "Tutorials"];
  public technologies = ["Infrastructure", "App Dev", "Data & AI"];

  constructor(
    public dialogRef: MatDialogRef<EditResourceDialog>,
    @Inject(MAT_DIALOG_DATA) resource: Resource
  ) {
    this.data = resource;
  }

  public cancelDialog(): void {
    this.dialogRef.close();
  }

  public get canSubmit() : boolean {
    const isValid = !this.isNullOrEmpty(this.data.title) && !this.isNullOrEmpty(this.data.url);
    //console.log(`The form valid is ${isValid}`);
    return isValid;
  }

  public onChangeSelection(target: string[], value: string) {

    let index = target.indexOf(value);
    if (index == -1) {
      target.push(value);
    } else {
      target.splice(index, 1);
    }

    //console.log(`Selection is ${target}`);
  }

  public isSelected(list: string[], value: string): boolean {
    var index = list.indexOf(value) >= 0;
    //console.log(`IsSelected is returning ${index}`);
    return index;
  }

  private isNullOrEmpty(value: string): boolean {
    return value == null || value === "";
  }
}