
exports.getModelReadyToUpdate = (model,newModel) =>{
    const keys = Object.keys(model)
    keys.forEach(field=>{
        model[field] = newModel[field]
    })
    return model
}