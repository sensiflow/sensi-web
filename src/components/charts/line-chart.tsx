import * as echarts from 'echarts';
import { ReactECharts } from './react-e-charts';
import type { CSSProperties } from "react";
import type { EChartsOption, SetOptionOpts } from "echarts";

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
            dataView: {readOnly: true},
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