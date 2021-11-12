import React from "react";
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { Fab } from "@material-ui/core";
import "../../../../styles/backOffices/Profile.css"
import userImg from "../../../../assets/backOffices/img/user.png"
const UserCard = (props) => {
    let img=null;
    if(props.image){
        img=URL.createObjectURL(props.image)
    }else if(props.avatar){
       img=process.env.REACT_APP_SUBSCRIPTION_SERVICE+"/storage/avatars/"+props.avatar;
    }else{
        img=userImg;
    }
    return (
        <>
            <div className="header" >
                <img className="img" src={img} />
            </div>
            <div className="fileAdd" >

                <label htmlFor="upload-photo"  >
                    <input
                        style={{ display: "none" }}
                        id="upload-photo"
                        name="upload-photo"
                        type="file"
                        accept="image/*"
                        onChange={(event)=>props.change(event)}
                    />

                    <Fab color="default" size="small" component="span" aria-label="add">
                        <CameraAltIcon/>
                    </Fab>
                </label>
            </div>

        </>
    );
};

export default UserCard;
