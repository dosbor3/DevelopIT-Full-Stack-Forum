const User = require('./User');
const Topic = require('./Topic');
const Subtopic = require('./Subtopic');
const Post = require('./Post');
const Vote = require('./Vote');
const Tag = require('./Tag');

//associations
User.hasMany(Post, {
    foreignKey: 'user_id'
  });

  Post.belongsTo(User, {
    foreignKey: 'user_id'
  });

  Topic.hasMany(Subtopic, {
      foreignKey: 'topic_id'
  });
  
  Subtopic.belongsTo(Topic, {
    foreignKey: 'topic_id'
  });
  
  User.belongsToMany(Post, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id'
  });
  
  Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
  });

 Topic.belongsToMany(Subtopic, {
    through: Tag,
    as: 'tag',
    foreignKey: 'topic_id'
  });
  
  Subtopic.belongsToMany(Topic, {
    through: Tag,
    as: 'tag',
    foreignKey: 'subtopic_id'
  });
  
  Vote.belongsTo(User, {
    foreignKey: 'user_id'
  });
  
  Vote.belongsTo(Post, {
    foreignKey: 'post_id'
  });
  
  User.hasMany(Vote, {
    foreignKey: 'user_id'
  });
  
  Post.belongsTo(Topic, {
      foreignKey: 'topic_id'
  });

  Post.belongsTo(Subtopic, {
      foreignKey: 'subtopic_id'
  });
  Post.hasMany(Vote, {
    foreignKey: 'post_id'
  });

  Subtopic.belongsTo(Topic, {
    foreignKey: 'topic_id'
  });

  Tag.belongsTo(Topic, {
    foreignKey: 'user_id'
  });
  
  Tag.belongsTo(Subtopic, {
    foreignKey: 'post_id'
  });


  module.exports = { User, Topic, Subtopic, Post, Vote, Tag };