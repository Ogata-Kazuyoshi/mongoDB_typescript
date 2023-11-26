// import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../features/hooks';
import { setChoosenVehicle } from '../../../features/Slice/SelectVehicleSlice';

const SettingHeader = () => {
  const vehicleList = useAppSelector(
    (state) => state.selectVehicle.vehicleList
  );
  const choosenVehicle = useAppSelector(
    (state) => state.selectVehicle.choosenVehicle
  );
  const dispatch = useAppDispatch();
  return (
    <div className="setting__header">
      <div className="setting__header--wrap">
        {vehicleList.map((elm) => {
          return (
            <div
              className="setting__header--vehicle"
              key={elm.vehiclename}
              onClick={() => {
                dispatch(setChoosenVehicle(elm.vehiclename));
              }}
              style={{
                border:
                  choosenVehicle === elm.vehiclename
                    ? '5px solid rgb(250, 0, 183)'
                    : '1px solid white',
              }}
            >
              <div className="setting__header--label">
                <div className="setting__header--labelwrap">
                  <label htmlFor="">{elm.vehiclename}</label>
                </div>
                <div className="setting__header--imagewarp">
                  <img
                    className="setting__header--img"
                    src={elm.imagepath}
                    alt="#"
                  />
                </div>
              </div>
              {/* <SettingChooseCar vehiclename={elm} /> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SettingHeader;
