export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const errorsStyle={
    color:"#e55353",
    fontSize:"85%",
    marginLeft:"0.75rem",
    marginTop:"0.25rem"
}
export const inputBorderErrorsStyle={
    borderColor:"#e55353"
}
