import * as echarts from 'echarts';
import type { ReactEChartsProps } from './react-e-charts';
import { ReactECharts } from './react-e-charts';
import type { CSSProperties } from "react";
import type { EChartsOption, ECharts, SetOptionOpts } from "echarts";




let base = +new Date(1990, 9, 3);
let oneDay = 24 * 3600 * 1000;
let date = [];

let data = [Math.random() * 30];

for (let i = 1; i < 2000; i++) {
  var now = new Date((base += oneDay));
  date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
  data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
}

export interface MyEChartsProps {
    style?: CSSProperties;
    settings?: SetOptionOpts;
    loading?: boolean;
    theme?: "light" | "dark";
}

export interface EChartProps {
    xdata: string[];
    ydata: number[];
    chartName : string;
    dataName : string;
    EChartsProps?: MyEChartsProps;
} 

export function LineChart({xdata, ydata, chartName, dataName, EChartsProps } : EChartProps): JSX.Element {  
    
  const chartTheme : "light" | "app-theme-dark" = "light" ? "light" : "app-theme-dark";

  const option : EChartsOption = {
      tooltip: {
        trigger: 'axis',
        position: function (pt) {
          return [pt[0], '10%'];
        }
      },
      color : ['#09A065'],
      title: {
        left: 'center',
        text: chartName
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          restore: {},
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xdata
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%']
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 10
        },
        {
          start: 0,
          end: 10
        }
      ],
      series: [
        {
          name: dataName,
          type: 'line',
          symbol: 'none',
          colorBy: 'series',
          step: 'start',
          sampling: 'lttb',
          itemStyle: {
            color: 'rgb(255, 70, 131)'
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(255, 158, 68)'
              },
              {
                offset: 1,
                color: 'rgb(255, 70, 131)'
              }
            ])
          },
          data: ydata
        }
      ]
    };
    
  return ReactECharts( {
    option,
    theme: chartTheme,
    style: EChartsProps?.style,
    settings: EChartsProps?.settings, 
    loading: EChartsProps?.loading 
  })


}