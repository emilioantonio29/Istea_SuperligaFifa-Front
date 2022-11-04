export const emailValidator = (data) =>{
    return data.replace(/^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/, '')
}

export const nameValidator = (data) =>{
    return data.replace(/[^a-zA-ZÀ-ÿ\u00f1\u00d1]/g, '') 
}

export const spaceValidator = (data) =>{
    return data.replace(/[^a-zA-ZÀ-ÿ\u00f1\u00d1_ ]/g, '') 
}