

export const propertyPrice = (price) => 
        Number(price).toLocaleString('es-ES', {
            style: 'currency',
            currency: 'EUR'
        })
    
