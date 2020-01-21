const Post = require('../../models/postShema');
const Profile = require('../../models/profileShema');

module.exports = {
    create : async (req, res) => {

        console.log(req.params);
        profile = req.params;
        id = profile.id;
        const { text, username} = req.body;
        const post = await Post.create({
            text,
            username,
            profile:id
        });
        await post.save();

        const profileById = await Profile.findById(id);

        profileById.posts.push(post);
        await profileById.save();

        return res.send(profileById);
    },
    userByPost : async (req,res)=>{
        const { id } = req.params;
        const profileByPost = await Post.findById(id).populate('profile');
        res.send(profileByPost);
    }
}

module.exports = PostController;