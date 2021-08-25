
const baseURL = `https://quiet-river-60928.herokuapp.com/api`

function getDepartments() {
    return fetch( `${baseURL}/departments`)
            .then( res  => res.json() )
}

function getProvinces(idDepartment) {
    return fetch( `${baseURL}/provinces?departament=${idDepartment}`)
            .then( res  => res.json() )
}

function getDistricts(nameProvince) {
    return fetch( `${baseURL}/districts?province=${nameProvince}`)
            .then( res  => res.json() )
}

function getResultsByDistrict(nameProvince) {
    return fetch( `${baseURL}/places-district?district=${nameProvince}`)
            .then( res  => res.json() )
}

function getResultsByGPS( latitud , longitud ) {
    return fetch( `${baseURL}/places?latitude=${latitud}&longitude=${longitud}&limit=6`)
            .then( res  => res.json() )
}

export default{
    getDepartments,
    getProvinces,
    getDistricts,
    getResultsByDistrict,
    getResultsByGPS
}