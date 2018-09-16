firestore.collection('techies').get()
    .then((all_techies) => {
        let template = document.querySelector('.techie.template').outerHTML;
        let output = '';
        all_techies.forEach((techie) => {
            output += Mustache.render(template, techie.data())
        })
        document.querySelector('.techies-container').innerHTML = output;
    })
