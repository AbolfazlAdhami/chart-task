import React, { useEffect, useRef,   } from "react";
import * as d3 from "d3";

type DataPoint = [number, number | number[] | null];

interface ChartProps {
  title: string;
  data: DataPoint[];
}

export const Chart: React.FC<ChartProps> = ({ data, title }) => {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove(); // Clear previous chart

    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const g = svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const timestamps = data.map(([t]) => t);
    const values = data.map(([, v]) => v).flat();
    const isMultiSeries = Array.isArray(data[0][1]);

    const x = d3
      .scaleLinear()
      .domain(d3.extent(timestamps) as [number, number])
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([d3.min(values as number[]) ?? 0, d3.max(values as number[]) ?? 1])
      .nice()
      .range([height, 0]);

    g.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(x));
    g.append("g").call(d3.axisLeft(y));

    if (!isMultiSeries) {
      const filtered = data.filter(([, v]) => v !== null) as [number, number][];
      const line = d3
        .line<[number, number]>()
        .x(([t]) => x(t))
        .y(([, v]) => y(v));

      g.append("path").datum(filtered).attr("fill", "none").attr("stroke", "steelblue").attr("stroke-width", 1.5).attr("d", line);
    } else {
      const colors = ["blue", "green", "red"];

      [0, 1, 2].forEach((i) => {
        const series = data.map(([t, v]) => [t, (v as number[])[i]] as [number, number]).filter(([, v]) => v !== null);

        const line = d3
          .line<[number, number]>()
          .x(([t]) => x(t))
          .y(([, v]) => y(v));

        g.append("path").datum(series).attr("fill", "none").attr("stroke", colors[i]).attr("stroke-width", 1.5).attr("d", line);
      });
    }
  }, [data]);

  return (
    <div className="p-2">
      <h1 className="text-lg  font-bold">{title}</h1>
      <svg ref={ref}></svg>
    </div>
  );
};
