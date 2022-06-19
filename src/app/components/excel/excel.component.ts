import { Component, OnInit } from '@angular/core';

import * as XLSX from 'xlsx';

type AOA = any[][];
@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.css'],
})
export class ExcelComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  data: AOA = [];
  jsonData: any;
  displayedColumns: any;
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';
  isTable: boolean = true;
  toggle(event) {
    this.isTable = !this.isTable;
    console.log(event);
  }
  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>evt.target;
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {
        type: 'binary',
        cellDates: true,
        dateNF: 'dd-mm-yyyy',
      });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      this.jsonData = XLSX.utils.sheet_to_json(ws, { raw: false });

      this.displayedColumns = Object.keys(this.jsonData[0]).map((k) => k);
    };
    reader.readAsBinaryString(target.files[0]);
  }

}