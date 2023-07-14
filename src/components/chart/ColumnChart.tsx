import dynamic from 'next/dynamic';

const ColumnChart = dynamic(() => import('react-apexcharts'), { ssr: false });

// ----------------------------------------------------------------------

type ChartProps = {
  name: string;
  data: number[];
};

const ColumnChartMonthly = ({ name, data }: ChartProps) => {
  return (
    <ColumnChart
      width={424}
      height={234}
      type="bar"
      series={[
        {
          name,
          data,
        },
      ]}
      options={{
        plotOptions: {
          bar: {
            borderRadius: 5,
          },
        },
        chart: {
          type: 'bar',
        },
        colors: ['rgba(93, 135, 255, 0.85)'],
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },
        grid: {
          yaxis: {
            lines: {
              show: false,
            },
          },
        },
        xaxis: {
          categories: [
            ['T1'],
            ['T2'],
            ['T3'],
            ['T4'],
            ['T5'],
            ['T6'],
            ['T7'],
            ['T8'],
            ['T9'],
            ['T10'],
            ['T11'],
            ['T12'],
          ],
          labels: {
            style: {
              fontSize: '12px',
            },
          },
        },
      }}
    />
  );
};

export default ColumnChartMonthly;
