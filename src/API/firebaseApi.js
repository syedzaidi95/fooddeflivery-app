import firebase from '../config/firebae';

const db = firebase.database()

const auth = firebase.auth()

const AddCatogery = (catogery,uid) => {
    return new Promise((resolve, reject) =>{
        db.ref(`catogeries/${uid}`).once('value').then((e)=>{
            if(e.val() === null){
                    db.ref(`catogeries/${uid}`).push(catogery).then((e)=>{
                        resolve(e)
                    })
                }else{
                    var flag = true;
                    let catogeries = e.val()
                    for(var key in catogeries){
                        if(catogeries[key] === catogery){
                            flag = false
                        }
                    }
                    if(flag === true){
                        db.ref(`catogeries/${uid}`).push(catogery).then((e) =>{
                            resolve(e)
                        })
                    }else{
                        resolve(flag)
                    }
                }
        }).catch((e)=>{
            reject({messege: e})
        })
    } )
}

const checkResturantName = (resturantName) => {
    return new Promise((resolve, reject) => {
        db.ref('accounts/resturant').once('value').then((e) => {
            const rstname = e.val()
            var flag = true;
            // let resName = resturantName.toLowerCase()
            for (var key in rstname) {
                if (rstname[key].resturantName.toLowerCase() === resturantName.toLowerCase()) {
                    flag = false
                }
            }
            return flag
        }).then((flag) => {
            resolve(flag)
        })
            .catch(e => {
                reject({messeg : e})
            })
    })
}

const resturantReg = (obj, password) => {
    return new Promise((resolve, reject) => {
        auth.createUserWithEmailAndPassword(obj.email, password).then((e) => {
            obj.uid = e.user.uid
            db.ref('accounts/resturant/' + obj.uid).set(obj).then((e) => {
                resolve(true);
            })
        }).catch(e => {
            reject(e)
        })
    })
}

const userReg = (obj, password) => {
    return new Promise((resolve, reject) => {
        auth.createUserWithEmailAndPassword(obj.email, password).then((e) => {
            obj.uid = e.user.uid
            db.ref('accounts/users/' + obj.uid).set(obj).then((e) => {
                resolve(true);
            })
        }).catch(e => {
            reject(e)
        })
    })
}

const login = (email, password) => {
    return new Promise((resolve, reject) => {
        auth.signInWithEmailAndPassword(email, password).then((e) => {
            const uid = e.user.uid
            db.ref('accounts').once('value').then((e) => {
                let users = e.val()
                for (var key in users) {
                    for (var key2 in users[key]) {
                        if (key2 === uid) {
                            resolve(users[key][key2])
                        }
                    }
                }
            })
        }).catch(e => {
            reject({ messege: e })
        })
    })
}

export {
    resturantReg,
    userReg,
    login,
    checkResturantName,
    AddCatogery,
}