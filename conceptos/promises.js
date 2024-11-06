const miPromesa = new Promise((resolve, reject) =>{

    setTimeout(() => {}, 3000);
    const calif = Math.ceil(Math.random() * 10);
if(calif >= 8)
    return resolve('Sí pasa')
else
return reject('No pasa')

});

miPromesa
.then(result => console.log(result));
.catch(error => console.log(error));


//Investigar que son las promesas en JS