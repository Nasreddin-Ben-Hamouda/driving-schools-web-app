import {makeStyles} from "@material-ui/core/styles";
import { Avatar } from "@material-ui/core";

const AvatarUpload = () => {
    const useStyles = makeStyles((theme) => ({
        sizeAvatar: {
            height: theme.spacing(20),
            width: theme.spacing(20),
        },
    }));
    const classes = useStyles();
    return (
        <Avatar src="/path/to/image" alt="Avatar" className={classes.sizeAvatar} />

    );
};

export default AvatarUpload;
