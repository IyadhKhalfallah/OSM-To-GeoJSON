import React from 'react';

import ErrorModal from './ErrorModal'
import Grid from '@material-ui/core/Grid';

import Form from './Form'
import Map from './Map'
import DataTable from './DataTable'
import DetailsModal from './DetailsModal'


const GeoBox = () => {
    const initialFormData = Object.freeze({
        min_longitude: "",
        min_latitude: "",
        max_longitude: "",
        max_latitude: "",
    });

    // Defining states
    const [formData, updateFormData] = React.useState(initialFormData);
    const [mapFeatures, setMapFeatures] = React.useState({ "type": "FeatureCollection", "features": [], "bbox": [50, 20, 50.1, 20.1] });
    const [dialogOpen, setDialogOpen] = React.useState(false)
    const [verifyAPI, setVerifyAPI] = React.useState(false)
    const [errors, setErrors] = React.useState(initialFormData)
    const [properties, setProperties] = React.useState({ "name": "", "amenity": "", "popupContent": "" })
    const [isDisabled, setIsDisabled] = React.useState(true)


    return (
        <div>
            <h1 style={{ textAlign: "center" }}>GeoJSON Features Visualizer</h1>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Form formData={formData} updateFormData={updateFormData} errors={errors} setErrors={setErrors} setMapFeatures={setMapFeatures} isDisabled={isDisabled} setIsDisabled={setIsDisabled} setVerifyAPI={setVerifyAPI} />
                </Grid>
                <Grid item xs={6}>
                    <Map mapFeatures={mapFeatures} setMapFeatures={setMapFeatures} setVerifyAPI={setVerifyAPI} />
                </Grid>
                <Grid item xs={12}>
                    <DataTable mapFeatures={mapFeatures} setDialogOpen={setDialogOpen} setProperties={setProperties} />

                    <DetailsModal properties={properties} dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
                    <ErrorModal verifyAPI={verifyAPI} setVerifyAPI={setVerifyAPI} />
                </Grid>
            </Grid>
        </div>
    )
}

export default GeoBox;