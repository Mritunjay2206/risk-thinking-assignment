import React from "react";
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  ResponsiveContainer,
} from "recharts";

const CustomLineChart = ({
  data,
  dataKey,
  xAxisDataKey,
  tickMargin,
  xAxisHeight,
  title,
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis
          dataKey={xAxisDataKey}
          minTickGap={1}
          angle="270"
          interval={0}
          type="category"
          height={xAxisHeight || 100}
          tickSize={4}
          tickMargin={tickMargin || 40}
          padding={{ bottom: 200 }}
          name={title}
        />
        <YAxis width={100} />
        <Tooltip />
        <Line type="monotone" dataKey={dataKey} stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CustomLineChart;
