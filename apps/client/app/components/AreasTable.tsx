import React from "react";
import ReactSlider from "react-slider";
import { predefinedAreas } from "../utils/predefinedAreas";

interface AreasTableProps {
  areas: Area[];
  onRatingChange: (id: string, rating: number) => void;
}

export const AreasTable: React.FC<AreasTableProps> = ({
  areas,
  onRatingChange,
}) => {
  return (
    <div className="space-y-4">
      {areas.map((area) => (
        <div key={area.id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">{area.name}</h3>
            <div className="w-64">
              <ReactSlider
                className="h-2 bg-gray-200 rounded-full"
                thumbClassName="w-6 h-6 -mt-2 bg-indigo-600 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 shadow"
                trackClassName="h-2 bg-indigo-200 rounded-full"
                min={0}
                max={5}
                step={1}
                value={area.rating}
                onChange={(value) => onRatingChange(area.id, value)}
                renderThumb={(props, state) => (
                  <div {...props} className={props.className}>
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-2 py-1 rounded text-xs">
                      {state.valueNow}
                    </span>
                  </div>
                )}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
