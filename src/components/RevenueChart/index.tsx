import ReactApexChart from 'react-apexcharts';
import { IRevenue } from '../../types';
import { useEffect, useState } from 'react';
import * as _ from 'lodash';
import moment from 'moment';
import { MONTHNAMES } from '../../constants';

interface IProps {
  data: IRevenue[];
}

const RevenueChart = ({ data }: IProps) => {
  const [series, setSeries] = useState<any>([]);

  const chartOptions = {
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: MONTHNAMES,
    },
    yaxis: {
      title: {
        text: '$ (thousands)',
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val: string) {
          return '$ ' + val + ' thousands';
        },
      },
    },
  };

  useEffect(() => {
    // group by type
    const grouped_type = _.chain(data)
      .groupBy('type')
      .map((value, key) => ({
        type: key,
        logs: value,
        // get sum of amounts
        total: Number(_.sumBy(value, (c) => Number(c.amount.split('$')[1])).toFixed(2)),
      }))
      .value();

    // group by month
    const grouped_month = grouped_type.map((a) => {
      return {
        type: a.type,
        logs: _.chain(a.logs)
          .groupBy((b) => moment(b.date).startOf('month').format('M'))
          .map((value, key) => ({
            month: {
              index: Number(key),
              full: MONTHNAMES[Number(key) - 1],
            },
            logs: value,
            // get sum of amounts
            total: Number(_.sumBy(value, (c) => Number(c.amount.split('$')[1])).toFixed(2)),
          }))
          .sortBy('month.index')
          .value(),
      };
    });

    const ss = _.map(grouped_month, (a) => ({ name: a.type, data: _.map(a.logs, (b) => b.total) }));

    setSeries(ss);
  }, [data]);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <ReactApexChart options={chartOptions} series={series} type="area" height={360} />;
};

export default RevenueChart;
