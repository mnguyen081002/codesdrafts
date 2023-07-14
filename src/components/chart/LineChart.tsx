import dynamic from 'next/dynamic';

const LineChart = dynamic(() => import('react-apexcharts'), { ssr: false });

// ----------------------------------------------------------------------

type ChartProps = {
  name: string;
  data: number[];
};

const LineChartMonthly = ({ name, data }: ChartProps) => {
  return (
    <LineChart
      css={{}}
      width={100}
      height={35}
      type="area"
      series={[
        {
          name,
          data,
        },
      ]}
      options={{
        chart: {
          sparkline: {
            enabled: true,
          },
        },
        yaxis: {
          labels: {
            show: false,
          },
        },
        stroke: {
          width: 2,
          curve: 'smooth',
        },
        legend: {
          show: false,
        },
        grid: {
          show: false,
        },
        tooltip: {
          marker: {
            show: false,
          },
        },
        xaxis: {
          categories: [['Lượt mua'], ['Lượt xem'], ['Doanh thu']],
          labels: {
            style: {
              fontSize: '12px',
            },
          },
        },
        fill: { gradient: { opacityFrom: 0, opacityTo: 0 } },

        colors: ['rgba(93, 135, 255, 0.85)'],
      }}
    />
  );
};

export default LineChartMonthly;
