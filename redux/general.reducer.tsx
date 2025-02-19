import SharedReducer from "shared-reducer-hooks";

const initialState = {
  isMobileDevice: false,
  loadingGlobal: false,
};

const [mapState, dispatch] = SharedReducer(
  (state = initialState, action: any) => {
    switch (action.type) {
      case "handleIsMobileDevice":
        return Object.assign(state, {
          isMobileDevice: action.isMobileDevice,
        });

      case "handleLoadingGlobal":
        return Object.assign(state, {
          loadingGlobal: action.loadingGlobal,
        });

      default:
        return state;
    }
  }
);

const useHandleLoadingGlobal = mapState((state: any) => state.loadingGlobal);
const handleLoadingGlobal = (loadingGlobal) =>
  dispatch({ type: "handleLoadingGlobal", loadingGlobal } as any);

const useHandleIsMobileDevice = mapState((state: any) => state.isMobileDevice);
const handleIsMobileDevice = (isMobileDevice) =>
  dispatch({ type: "handleIsMobileDevice", isMobileDevice } as any);

export {
  useHandleLoadingGlobal,
  handleLoadingGlobal,
  useHandleIsMobileDevice,
  handleIsMobileDevice,
};
