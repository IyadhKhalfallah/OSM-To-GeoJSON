import React from 'react';
import Form from '../Form';
import DataTable from '../DataTable'
import "@testing-library/jest-dom/extend-expect"
import { fireEvent, render } from "@testing-library/react"

const initialFormData = Object.freeze({
    min_longitude: "",
    min_latitude: "",
    max_longitude: "",
    max_latitude: "",
});
const mapFeatures = { "type": "FeatureCollection", "features": [], "bbox": [50, 20, 50.1, 20.1] }
describe("Form validation", () => {
    it("Submit button exists and enabled", () => {
        const { getByTestId } = render(<Form formData={initialFormData} updateFormData={jest.fn()} errors={initialFormData} setErrors={jest.fn()} setMapFeatures={jest.fn()} isDisabled={false} setIsDisabled={jest.fn()} setVerifyAPI={jest.fn()} />);
        const submit = getByTestId("submit-form");
        expect(submit).toHaveClass("MuiButton-contained");

    })
    it("Submit button should be disabled", () => {
        const { getByTestId } = render(<Form formData={initialFormData} updateFormData={jest.fn()} errors={initialFormData} setErrors={jest.fn()} setMapFeatures={jest.fn()} isDisabled={true} setIsDisabled={jest.fn()} setVerifyAPI={jest.fn()} />);
        const min_long = getByTestId("min_longitude");
        const min_lat = getByTestId("min_latitude");
        const max_long = getByTestId("max_longitude");
        const max_lat = getByTestId("max_latitude");
        const submit = getByTestId("submit-form");

        fireEvent.change(min_long, { target: { value: "191" } });
        fireEvent.change(min_lat, { target: { value: "1" } });
        fireEvent.change(max_long, { target: { value: "2" } });
        fireEvent.change(max_lat, { target: { value: "3" } });
        expect(submit).toHaveClass("Mui-disabled");

    })
})
describe("DataTable component", () => {
    it("Renders", () => {
        const { getByTestId } = render(<DataTable mapFeatures={mapFeatures} setDialogOpen={jest.fn()} setProperties={jest.fn()} />);
        const map = getByTestId("datatable");
        expect(map).toHaveClass("table");

    })
})