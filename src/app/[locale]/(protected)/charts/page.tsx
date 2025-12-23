"use client";

import { PageWrapper } from "../../../../components/common/PageWrapper";
import { AreaChartComponent } from "../../../../components/views/charts/AreaChartComponent";
import { ScatterChartComponent } from "../../../../components/views/charts/ScatterChartComponent";
import { LineChartComponent } from "../../../../components/views/charts/LineChartComponent";
import { PieChartComponent } from "../../../../components/views/charts/PieChartComponent";
import { RadarChartComponent } from "../../../../components/views/charts/RadarChartComponent";
import { ComposedChartComponent } from "../../../../components/views/charts/ComposedChartComponent";
import { StackedBarChartComponent } from "../../../../components/views/charts/StackedBarChartComponent";
import { RadialBarChartComponent } from "../../../../components/views/charts/RadialBarChartComponent";
import { TwoAxisLineChartComponent } from "../../../../components/views/charts/TwoAxisLineChartComponent";
import { MixedLineChartComponent } from "../../../../components/views/charts/MixedLineChartComponent";
import { VerticalBarChartComponent } from "../../../../components/views/charts/VerticalBarChartComponent";

const ChartsPage = () => {
  return (
    <PageWrapper pageName="Charts" hidePaper>
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

        {/* Game of Thrones Chart - full width */}
        <div className="w-full">
          <LineChartComponent />
        </div>
      </div>
    </PageWrapper>
  );
};

export default ChartsPage;
