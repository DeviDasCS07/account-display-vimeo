import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountDetailsService } from '../services/account-details.service';
import { AccoutDetailsModel } from '../models/account-details.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-account-details-display',
  templateUrl: './account-details-display.component.html',
  styleUrls: ['./account-details-display.component.scss']
})
export class AccountDetailsDisplayComponent implements OnInit {
  public dataSource: MatTableDataSource<AccoutDetailsModel>;
  public displayedColumns: string[] = [
    'AccountNo',
    'Date',
    'TransactionDetails',
    'ValueDate',
    'WithdrawalAMT',
    'DepositAMT',
    'BalanceAMT'
  ];

  @ViewChild(MatSort, {static: false}) sort: MatSort;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private readonly accountDetailsService: AccountDetailsService) { }

  public ngOnInit(): void {
    this.accountDetailsService.getAccountDetails().subscribe((response: AccoutDetailsModel[]) => {
      const mappedResponse = this.mapResponse(response);
      this.dataSource =  new MatTableDataSource<AccoutDetailsModel>(mappedResponse);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private mapResponse(response: AccoutDetailsModel[]): AccoutDetailsModel[] {
    const mappedResponse: AccoutDetailsModel[] = [];
    const m = [];
    for (const r of response) {
      mappedResponse.push({
        AccountNo: r['Account No'],
        Date: r['Date'],
        TransactionDetails: r['Transaction Details'],
        ValueDate: r['Value Date'],
        WithdrawalAMT: r['Withdrawal AMT'],
        DepositAMT: r['Deposit AMT'],
        BalanceAMT: r['Balance AMT']
      });
    }
    return mappedResponse;
  }
}
