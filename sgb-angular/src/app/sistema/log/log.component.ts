import { Component, OnInit } from '@angular/core';
import { Log } from 'src/app/model/log';
import { Page } from 'src/app/model/pageable/page';
import { LogService } from 'src/app/service/log.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {

  logs: Log[] = [];
  logPageable: Page<Log> = new Page<Log>();

  constructor(private logService: LogService) { }

  ngOnInit(): void {
    this.getLogs();
  }

  getLogs(page: number = 0){
    this.logService
      .getProjetosPageable(page)
        .subscribe(
          page => {
            this.logs = page.content;
            this.logPageable = page;
          }
      );
  }

  next(){
    let nextPage = this.logPageable.last ? this.logPageable.pageable.pageNumber : this.logPageable.pageable.pageNumber + 1;
    this.getLogs(nextPage);
  }

  prev() {
    let prevPage = this.logPageable.first ? this.logPageable.pageable.pageNumber : this.logPageable.pageable.pageNumber - 1;
    this.getLogs(prevPage);
  }

  goPage(page){
    this.getLogs(page);
  }
}
