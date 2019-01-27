import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { MatDialog, MatTable } from '@angular/material';
import { EditResourceDialog } from './edit-resource-dialog/edit-resource-dialog';
import { Resource } from './shared/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  public title = 'Azure Resources';
  public displayedColumns: string[] = ['id', 'title', 'technologies', 'categories'];
  public dataSource: Resource[] = [];

  @ViewChild(MatTable) table: MatTable<any>;

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

  private saveResource(resource: Resource): Observable<Resource> {

    const url = `${environment.resourceBackendUrl}/api/resources`;

    return this.http
      .post<Resource>(url, resource)
      .pipe(
          catchError(this.handleError<Resource>('saveNewResource', resource))
      );
  }

  public openDialog(editResource?: Resource): void {

    // If we're creating a new resource, initialize it here. Otherwise use the one passed in
    var copy = editResource ? JSON.parse(JSON.stringify(editResource)) : new Resource();

    // editResource = editResource || new Resource();

    const dialogRef = this.dialog.open(EditResourceDialog, { data: copy });

    dialogRef.afterClosed().subscribe((result: Resource) => {

      // Check whether the dialog was saved (it has a result), or cancelled (null)
      if (result) {
        
        console.log(`The dialog was saved with title = '${result.title}'`);

        // Save the new item to the database now
        this.saveResource(result).subscribe(resource => {

          // if (!result.id) {
          //   this.dataSource.push(resource);
          // }
          
          var index = this.dataSource.indexOf(editResource);
          if (index !== -1) {
            this.dataSource[index] = resource;
          }
          else {
            this.dataSource.push(resource);
          }
          
          this.table.renderRows();
        });
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