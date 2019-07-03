import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { TableDataSource } from './table-datasource';
import { FormControl } from '@angular/forms';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 999, name: 'test', weight: 1.0079, symbol: 'H' },
  { position: 0, name: '999', weight: 1.0079, symbol: 'H' },
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  positionFilter = new FormControl();
  nameFilter = new FormControl();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // filteredValues = { position:'', name:'',weight:'',  symbol:'', topFilter: false};
  filteredValues = { position:'', name:'',weight:'',  symbol:'', topFilter: ''};
ngOnInit() {

    this.positionFilter.valueChanges.subscribe((positionFilterValue)        => {
    this.filteredValues['position'] = positionFilterValue;
    this.dataSource.filter = JSON.stringify(this.filteredValues);
    // this.filteredValues['topFilter'] = false;
    });

    this.nameFilter.valueChanges.subscribe((nameFilterValue) => {
      this.filteredValues['name'] = nameFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
      // this.filteredValues['topFilter'] = false;
      
    });

  this.dataSource.filterPredicate = this.customFilterPredicate();
  this.dataSource.sort = this.sort;
  this.dataSource.paginator = this.paginator;

}

  applyFilter(filterValue: string) {
    let filter = {
      name: filterValue.trim().toLowerCase(),
      position: filterValue.trim().toLowerCase(),
      topFilter: true
    }
    this.dataSource.filter = JSON.stringify(filter)
  }

  // numFilter(filterValue: string) {
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  //   this.dataSource.filterPredicate = (data: any, fitlerString: string) => {

  //       return data.position == filterValue;
  //   };
  //   this.dataSource.filter = filterValue;
  // }

  customFilterPredicate() {
    const myFilterPredicate = function(data:PeriodicElement,        filter:string) :boolean {
      let searchString = JSON.parse(filter);
      let nameFound = data.name.toString().trim().toLowerCase().indexOf(searchString.name.toLowerCase()) !== -1
      let positionFound = data.position.toString().trim().indexOf      (searchString.position) !== -1
      if (searchString.topFilter) {
          return nameFound || positionFound 
      } else {
          return nameFound && positionFound 
      }
    }
    return myFilterPredicate;
  }
}

