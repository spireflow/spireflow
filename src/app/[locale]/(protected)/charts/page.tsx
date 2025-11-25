"use client";

import { PageWrapper } from "../../../../components/common/PageWrapper";
import { AreaChartComponent } from "../../../../components/views/charts/AreaChartComponent";
import { ScatterChartComponent } from "../../../../components/views/charts/ScatterChartComponent";
import { BarChartComponent } from "../../../../components/views/charts/BarChartComponent";
import { LineChartComponent } from "../../../../components/views/charts/LineChartComponent";

const ChartsPage = () => {
  return (
    <PageWrapper pageName="Charts" hidePaper>
      <div className="flex flex-col gap-7 w-full">
        <div className="flex flex-col lg:flex-row gap-5 w-full">
          <div className="w-full lg:w-1/2">
            <AreaChartComponent />
          </div>
          <div className="w-full lg:w-1/2">
            <ScatterChartComponent />
          </div>
        </div>
        <div className="w-full">
          <BarChartComponent />
        </div>
        <div className="w-full">
          <LineChartComponent />
        </div>
      </div>
    </PageWrapper>
  );
};

export default ChartsPage;
