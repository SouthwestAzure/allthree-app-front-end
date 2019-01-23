import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { MatDialog } from '@angular/material';
import { CreateNewResourceDialog, NewResource } from './create-new-resource-dialog/create-new-resource-dialog';
import { Resource } from './shared/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  title = 'Azure Resources';

  displayedColumns: string[] = ['id', 'title', 'technologies', 'categories'];

  public dataSource: Resource[] = [];

  constructor(
    private http: HttpClient,
    public dialog: MatDialog
  ) {

    // Load up the data from the back-end API
    this.getResources().subscribe(data => this.dataSource = data);
  }

  private getResources(): Observable<Resource[]> {

    const url = `${environment.resourceBackendUrl}/api/resources`;

    return this.http
      .get<Resource[]>(url)
      .pipe(
          catchError(this.handleError('getResources', []))
      );
  }

  public openDialog(): void {

    const dialogRef = this.dialog.open(CreateNewResourceDialog);

    dialogRef.afterClosed().subscribe((result: NewResource) => {

      // Check whether the dialog was saved (it has a result), or cancelled (null)
      if (result) {
        
        console.log(`The dialog was saved with title = '${result.title}'`);

        // TODO: Save the new item to the database now
        var newResource = result;
      }
      else {
        console.log('The dialog was cancelled');
      }
    });
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {

    return (error: any): Observable<T> => {

        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead

        // Let the app keep running by returning an empty result.
        return of(result as T);
    };
  }
}