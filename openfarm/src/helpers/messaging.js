import {Firebase} from './firebase'
const firebase = require('firebase')
export default async function SendMessage (user, message, friend, friendId, profilePicture,  mime='',  attachment='', postId='', post='', postPicture='',createdAt:'') {
  var data = {
    message: message,
    attachment: '',
    postId:postId,
    post:post,
    postPicture:postPicture,
    createdAt:createdAt,
    attachmentType: mime,
    userPicture: user.photoURL,
    sender: user.displayName,
    senderId: user.uid,
    receiver:friend,
    status:"Delivered",
    profilePicture:profilePicture,
    type:'directMessage',
    sentAt: firebase.database.ServerValue.TIMESTAMP
  }
  var messageKey = firebase.database().ref().child('messages').push(data).key
  firebase.database().ref().child('recent_chats').child(user.uid).child(friendId).setWithPriority(data, 0 - Date.now())
  firebase.database().ref().child('recent_chats').child(friendId).child(user.uid).setWithPriority(data, 0 - Date.now())
  if (attachment !== '') {
      const sessionId = new Date().getTime()
      var ref=firebase.storage().ref().child('attachments/').child(`${sessionId}`)
      await ref.putString(attachment, 'data_url').then(function(snapshot){
        firebase.database().ref().child('messages').child(messageKey).update({attachment: snapshot.downloadURL})
      })
  }
  var updates = {}
  updates['direct_messages/' + user.uid + '/' + friendId + '/' + messageKey] = messageKey
  updates['direct_messages/' + friendId + '/' + user.uid + '/' + messageKey] = messageKey
  firebase.database().ref().update(updates)
  firebase.database().ref().child('badges').child(friendId).child('messagesBadge').once('value', (badgeCount)=>{
    if (badgeCount.val()) badgeCount.ref.set(badgeCount.val()+1)
    else badgeCount.ref.set(1)
  })
}
