export const selectFieldsFromRawVisit = (useSelector, rawVisit) => {
  return useSelector(({ visitFields }) => {
    let keys = Object.keys(rawVisit)
    return visitFields.filter((field) => keys.includes(field.id))
  })
}

export default selectFieldsFromRawVisit
