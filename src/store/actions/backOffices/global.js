import * as actionTypes from "./actionTypes";

export const sidebarShow = (val) => {
    return {
        type: actionTypes.SET,
        sidebarShow:val
    };
};
