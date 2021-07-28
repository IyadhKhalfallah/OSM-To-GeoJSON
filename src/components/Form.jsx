import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import React from 'react';


const osmtogeojson = require('osmtogeojson');
const parser = new DOMParser();

const Form = ({ formData, updateFormData, errors, setErrors, setMapFeatures, isDisabled, setIsDisabled, setVerifyAPI }) => {
    const handleChange = (e) => {
        // Checking if the values are between -180 and 180
        if (parseFloat(e.target.value.trim()) > 180 || parseFloat(e.target.value.trim()) < -180) {
            setErrors({ [e.target.name]: "Value should be between -180 and 180" })
            setIsDisabled(true)
        }
        else {
            setErrors({ [e.target.name]: "" })
            setIsDisabled(false)
        }
        // Updating the formData state on change, by the entered values
        updateFormData({
            ...formData,

            [e.target.name]: e.target.value.trim()
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        // Checking if the form has inputs without value
        if (formRef.current.reportValidity()) {
        // Calling the OSM API and setting the state to the GeoJSON output, generated from OSM format
            const res = await fetch(`https://www.openstreetmap.org/api/0.6/map?bbox=${formData["min_longitude"]},${formData["min_latitude"]},${formData["max_longitude"]},${formData["max_latitude"]}`)
                .then(response => {
                    if (!response.ok) {
                        setVerifyAPI(true)
                    }
                    return response.text()
                })

            const parsed = parser.parseFromString(res, "text/xml");
            const json_data = osmtogeojson(parsed)
            setMapFeatures(json_data)
        }
    };

    const formRef = React.useRef();
    return (

        <div style={{ marginLeft: "20vh", marginTop: "15vh" }}>
            <form ref={formRef}>
                <div>
                    <TextField id="standard-basic" label="Minimum Longitude" name="min_longitude" onChange={handleChange} error={Boolean(errors.min_longitude)} helperText={errors.min_longitude} required inputProps={{ "data-testid": "min_longitude" }} />
                    <TextField id="standard-basic" label="Minimum Latitude" name="min_latitude" onChange={handleChange} style={{ marginLeft: "2vh" }} error={Boolean(errors.min_latitude)} helperText={errors.min_latitude} required inputProps={{ "data-testid": "min_latitude" }} />
                </div>
                <div>
                    <TextField id="standard-basic" label="Maximum Longitude" name="max_longitude" onChange={handleChange} error={Boolean(errors.max_longitude)} helperText={errors.max_longitude} required inputProps={{ "data-testid": "max_longitude" }} />
                    <TextField id="standard-basic" label="Maximum Latitude" name="max_latitude" onChange={handleChange} style={{ marginLeft: "2vh" }} error={Boolean(errors.max_latitude)} helperText={errors.max_latitude} required inputProps={{ "data-testid": "max_latitude" }} />
                </div>
                <div style={{ marginLeft: "12vh", marginTop: "3vh" }}>
                    <Button variant="contained" color="primary" onClick={handleSubmit} disabled={isDisabled} data-testid="submit-form">Submit</Button>
                </div>
            </form>
            <p><small><i>NB: You can also select directly from the map using the rectangle</i></small></p>
        </div>
    )
}
export default Form