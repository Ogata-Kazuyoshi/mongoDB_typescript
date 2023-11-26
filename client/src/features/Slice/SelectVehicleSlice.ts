import { PayloadAction, createSlice } from '@reduxjs/toolkit';
// import { RootState } from '../store';

interface VehicleList {
  vehiclename: string;
  imagepath: string;
}

export interface selectVehicleState {
  isDecide: boolean;
  vehicleList: VehicleList[];
  choosenVehicle: string;
}

const initialState: selectVehicleState = {
  isDecide: false,
  vehicleList: [
    { vehiclename: 'bmw', imagepath: '../assets/car/bmw/bmw.png' },
    { vehiclename: 'mclaren', imagepath: '../assets/car/mclaren/mclaren.png' },
    { vehiclename: 'porsche', imagepath: '../assets/car/porsche/porshce.png' },
  ],
  choosenVehicle: 'bmw',
};

export const selectVehicleSlice = createSlice({
  name: 'selectVehicle',
  initialState,
  reducers: {
    decided: (state) => {
      state.isDecide = true;
    },
    notDecided: (state) => {
      state.isDecide = false;
    },
    setChoosenVehicle: (state, action: PayloadAction<string>) => {
      state.choosenVehicle = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { decided, notDecided, setChoosenVehicle } =
  selectVehicleSlice.actions;

// export const selectCount = (state: RootState) => state.counter.value;

export default selectVehicleSlice.reducer;
