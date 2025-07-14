// src/app/components/chart/chart.component.ts
import { Component, OnInit } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { DataService, User } from '../../services/data.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  //styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [{ data: [] }]
  };
  public pieChartType: ChartType = 'pie';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getUsers().subscribe(users => {
      const departmentCount: { [dept: string]: number } = {};

      // Count users per department
      users.forEach(user => {
        departmentCount[user.department] = (departmentCount[user.department] || 0) + 1;
      });

      // Set chart labels and data
      this.pieChartData.labels = Object.keys(departmentCount);
      this.pieChartData.datasets[0].data = Object.values(departmentCount);
          console.log('Chart data:', this.pieChartData);
    });
  }
}
