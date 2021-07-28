import { Dialog, DialogContent, DialogTitle, DialogContentText } from '@material-ui/core';

const ErrorModal = ({ verifyAPI, setVerifyAPI }) => {
    const handleClose = () => {
        setVerifyAPI(false)
    }
    return (
        <Dialog
            open={verifyAPI}
            aria-labelledby="draggable-dialog-title"
            onClose={handleClose}
        >
            <DialogTitle id="draggable-dialog-title">Please verify your data</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please verify your data, make sure that:
                    <ul>
                        <li>Your maximum bounding box size is 0.25.</li>
                        <li>The area you selected does not contain many features.</li>
                    </ul>

                </DialogContentText>
            </DialogContent>
        </Dialog>
    )
}

export default ErrorModal