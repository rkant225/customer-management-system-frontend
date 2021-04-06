
const validateAddNewPlaceForm = (values) => {
    const errors = {}
    const requiredFields = ['name', 'mobileNo', 'address', 'item', 'description'];
  
    const field_label = {
        name: 'Name',
        mobileNo: 'Mobile Number',
        address : 'Address',
        item : 'Item Type',
        description : 'Description',
        // date : 'Date'
    }
  
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = `${field_label[field]} is required.`
      }
    })

    return errors
  };
  
  export default validateAddNewPlaceForm;