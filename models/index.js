const user = require('./user');
const post = require('./post');
const comment = require('./comment');


user.hasMany(post, {
    foreignKey: 'user_id'
})

user.hasMany(comment, {
    foreignKey: 'user_id'
})

post.belongsTo(user, {
    foreignKey: 'user_id'
})

post.hasMany(Comment, {
    foreignKey: 'post_id'
})

Comment.belongsTo(user, {
    foreignKey: 'user_id'
})

Comment.belongsTo(post, {
    foreignKey: 'post_id'
})


module.exports = {
    user,
    post,
    Comment
};