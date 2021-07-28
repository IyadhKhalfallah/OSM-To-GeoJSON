import { Dialog, DialogContent, DialogTitle, DialogContentText } from '@material-ui/core';

const DetailsModal = ({ properties, dialogOpen, setDialogOpen }) => {
    const handleClose = () => {
        setDialogOpen(false)
    }
    return (
        <Dialog
            open={dialogOpen}
            aria-labelledby="draggable-dialog-title"
            onClose={handleClose}
        >
            <DialogTitle id="draggable-dialog-title">Feature Properties</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {/* Properties are shown only when they have a value */}
                    <ul>
                        {properties.name ? <li><b>Name: </b>{properties.name}</li> : null}
                        {properties.network ? <li><b>Network: </b>{properties.network}</li> : null}
                        {properties.operator ? <li><b>Operator: </b>{properties.operator}</li> : null}
                        {properties.route ? <li><b>Route: </b>{properties.route}</li> : null}
                        {properties.user ? <li><b>User: </b>{properties.user}</li> : null}
                        {properties.website ? <li><b>Website: </b>{properties.website}</li> : null}
                        {properties.distance ? <li><b>Distance: </b>{properties.distance}</li> : null}
                        {properties.ref ? <li><b>Ref: </b>{properties.ref}</li> : null}
                        {properties.wikidata ? <li><b>Wikidata: </b>{properties.wikidata}</li> : null}
                        {properties.wikipedia ? <li><b>Wikipedia: </b>{properties.wikipedia}</li> : null}
                    </ul>

                </DialogContentText>
            </DialogContent>
        </Dialog>
    )
}

export default DetailsModal