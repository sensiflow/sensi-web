//Ref: https://dev.to/manufac/using-apache-echarts-with-react-and-typescript-353k
import * as React from "react";
import { init, getInstanceByDom } from "echarts";
import type { CSSProperties } from "react";
import type { EChartsOption, ECharts, SetOptionOpts } from "echarts";
import { ISideBarData } from "../../events/sidebar-resize";
import * as echarts from 'echarts/core';
import { SVGRenderer, CanvasRenderer } from 'echarts/renderers';

export interface ReactEChartsProps {
  option: EChartsOption;
  style?: CSSProperties;
  settings?: SetOptionOpts;
  loading?: boolean;
  theme?: "light" | "app-theme-dark";
}

// You can use only the renderers you need

echarts.use([SVGRenderer, CanvasRenderer]);

export function ReactECharts({
  option,
  style,
  settings,
  loading,
  theme,
}: ReactEChartsProps): JSX.Element {
  const chartRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // Initialize chart
    let chart: ECharts | undefined;
    if (chartRef.current !== null) {
      chart = init(chartRef.current, theme, { renderer: 'svg' });
    }

    // Add chart resize listener
    // ResizeObserver is leading to a bit janky UX
    function resizeChart() {
      chart?.resize();
    }

    function resizeChartDelay(delay : number){
      const resizeChartDelay = setInterval(resizeChart, (delay/50) ); //every 6ms
      setTimeout(() => {
        //stop resizing after the delay time
        clearInterval(resizeChartDelay);
      }, delay);
      
    }


    window.addEventListener("resize", resizeChart);
    window.addEventListener("sidebar-resize", (e : CustomEvent<ISideBarData>) => {
      resizeChartDelay(e.detail.delay)
    });

    // Return cleanup function
    return () => {
      chart?.dispose();
      window.removeEventListener("resize", resizeChart);
      window.removeEventListener("sidebar-resize", resizeChart);
    };
  }, [theme]);

  React.useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);
      chart.setOption(option, settings);
    }
  }, [option, settings, theme]); // Whenever theme changes we need to add option and setting due to it being deleted in cleanup function

  React.useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      loading === true ? chart.showLoading() : chart.hideLoading();
    }
  }, [loading, theme]);

  return <div ref={chartRef} style={{ width: "100%", height: "100px", ...style }} />;
}