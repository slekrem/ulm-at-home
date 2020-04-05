const _uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

export const uploadDataUrlAsync = ({
    child,
    fileName,
    dataUrl
}) => new Promise((resolve, reject) => {
    const storageRef = firebase.storage().ref(),
        ref = storageRef.child(`${child}/${_uuidv4()}-${fileName}`),
        uploadTask = ref.putString(dataUrl, 'data_url');
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (/*snapshot*/) => { },
        (error) => reject(error),
        () => uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => resolve(downloadURL))
    );
});

export const createFreizeitItem = (item) => new Promise((resolve, reject) => {
    const key = firebase.database().ref().child('freizeitItems/').push().key;
    firebase.database().ref(`freizeitItems/${key}`)
        .set(item)
        .then(resolve)
        .catch(reject);
});

export const createLieferdiensteItem = (item) => new Promise((resolve, reject) => {
    const key = firebase.database().ref().child('lieferdiensteItems/').push().key;
    firebase.database().ref(`lieferdiensteItems/${key}`)
        .set(item)
        .then(resolve)
        .catch(reject);
});