const { Router }= require('express');
const router = Router();
const admin = require('firebase-admin');



var serviceAccount = require('../../node-firebase-example-e165f-firebase-adminsdk-m4zab-9f7c02c9f5.json');


//aca inicializo el admin (que son todos los servicios) y pongo las credenciales por default(eso antes, ahora lo certifico con serviceAccount) y la direccion de la base de datos
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:'https://node-firebase-example-e165f.firebaseio.com/'
});
const db = admin.database();//de todos los servicios que tengo en database


router.get('/', (req, res) => {
    db.ref('contactos').once('value',(snapshot) => {
        const data = snapshot.val();
        res.render('index', {contacts: data}); //para renderizar le paso a traves de la variable contacts los valores
    });//esta consultando la lista de contactos, con once significa que lo hace una vez
    
});

router.post('/new-contact', (req, res) => {
    const newContact={
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        phone:req.body.phone
    }
    db.ref('contactos').push(newContact);//ref seria el nombre de lo que guardaria y despues pusheo req.body
    res.send('received');
});

router.get('/delete-contact/:id', (req, res) => {
    db.ref('contactos/' + req.params.id).remove();
    res.redirect('/');
})

module.exports = router;