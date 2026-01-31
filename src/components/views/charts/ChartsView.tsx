"use client";

import { AreaChartComponent } from "./AreaChartComponent";
import { ScatterChartComponent } from "./ScatterChartComponent";
import { LineChartComponent } from "./LineChartComponent";
import { PieChartComponent } from "./PieChartComponent";
import { RadarChartComponent } from "./RadarChartComponent";
import { ComposedChartComponent } from "./ComposedChartComponent";
import { StackedBarChartComponent } from "./StackedBarChartComponent";
import { RadialBarChartComponent } from "./RadialBarChartComponent";
import { TwoAxisLineChartComponent } from "./TwoAxisLineChartComponent";
import { MixedLineChartComponent } from "./MixedLineChartComponent";
import { VerticalBarChartComponent } from "./VerticalBarChartComponent";
import { AreaFillByValueChartComponent } from "./AreaFillByValueChartComponent";
import { GradientPieChartComponent } from "./GradientPieChartComponent";

/**
 * Layout container for the charts demo page.
 * Displays all chart variants in a responsive grid layout.
 *
 * @component
 */
export const ChartsView = () => {
  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Row 1 */}
      <div className="flex flex-col lg:flex-row gap-5 w-full">
        <div className="w-full lg:w-1/2">
          <AreaChartComponent />
        </div>
        <div className="w-full lg:w-1/2">
          <ScatterChartComponent />
        </div>
      </div>

      {/* Row 2 */}
      <div className="flex flex-col lg:flex-row gap-5 w-full">
        <div className="w-full lg:w-1/2">
          <PieChartComponent />
        </div>
        <div className="w-full lg:w-1/2">
          <RadarChartComponent />
        </div>
      </div>

      {/* Row 3 */}
      <div className="flex flex-col lg:flex-row gap-5 w-full">
        <div className="w-full lg:w-1/2">
          <ComposedChartComponent />
        </div>
        <div className="w-full lg:w-1/2">
          <StackedBarChartComponent />
        </div>
      </div>

      {/* Row 4 */}
      <div className="flex flex-col lg:flex-row gap-5 w-full">
        <div className="w-full lg:w-1/2">
          <RadialBarChartComponent />
        </div>
        <div className="w-full lg:w-1/2">
          <TwoAxisLineChartComponent />
        </div>
      </div>

      {/* Row 5 */}
      <div className="flex flex-col lg:flex-row gap-5 w-full">
        <div className="w-full lg:w-1/2">
          <MixedLineChartComponent />
        </div>
        <div className="w-full lg:w-1/2">
          <VerticalBarChartComponent />
        </div>
      </div>

      {/* Row 6 */}
      <div className="flex flex-col lg:flex-row gap-5 w-full">
        <div className="w-full lg:w-1/2">
          <AreaFillByValueChartComponent />
        </div>
        <div className="w-full lg:w-1/2">
          <GradientPieChartComponent />
        </div>
      </div>

      {/* Game of Thrones Chart - full width */}
      <div className="w-full">
        <LineChartComponent />
      </div>
    </div>
  );
};
