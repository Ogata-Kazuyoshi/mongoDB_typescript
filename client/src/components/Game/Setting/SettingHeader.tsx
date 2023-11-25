import React from 'react';
import { vehicleList } from '../../../controllers/vehicleController';
import { div } from 'three/examples/jsm/nodes/Nodes.js';

const SettingHeader = () => {
  return (
    <div className="setting__header">
      <div className="setting__header--wrap">
        {vehicleList.map((elm, i) => {
          return (
            <div className="setting__header--vehicle" key={i}>
              <label htmlFor="">{elm}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SettingHeader;
