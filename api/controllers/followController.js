import Follower from '../models/Follower.js';
import User from '../models/User.js';
import { Op } from 'sequelize';


export const followUser = async (req, res) => {
  const { followId } = req.body; // The ID of the user to follow
  const userId = req.user.id; // The authenticated user's ID

  try {
    // Check if the user to follow exists
    const userToFollow = await User.findByPk(followId);
    // if (!userToFollow) {
    //   return res.status(404).json({ error: 'User to follow not found.' });
    // }

    // Check if already following
    const alreadyFollowing = await Follower.findOne({
      where: { followerId: userId, followingId: followId },
    });

    if (alreadyFollowing) {
      return res.status(400).json({ error: 'You are already following this user.' });
    }

    // Create a follow relationship
    await Follower.create({ followerId: userId, followingId: followId });

    res.json({ message: 'Followed successfully!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while following the user.' });
  }
};
export const unfollowUser = async (req, res) => {
  const { unfollowId } = req.body; // The ID of the user to unfollow
  const userId = req.user.id; // The authenticated user's ID

  try {
    // Check if the follow relationship exists
    const followRecord = await Follower.findOne({
      where: { followerId: userId, followingId: unfollowId },
    });

    // if (!followRecord) {
    //   return res.status(404).json({ error: 'Follow relationship not found.' });
    // }

    // Delete the follow relationship
    await followRecord.destroy();

    res.json({ message: 'Unfollowed successfully!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while unfollowing the user.' });
  }
};


// Get followers of a user
export const getFollowers = async (req, res) => {
  const { userId } = req.params;

  try {
    const followers = await Follower.findAll({
      where: { followingId: userId },
      include: [{ model: User, as: 'follower' }],
    });

    return res.status(200).json({ followers });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred.' });
  }
};


// Get following list of a user
export const getFollowing = async (req, res) => {
  const { userId } = req.params;

  try {
    const following = await Follower.findAll({
      where: { followerId: userId },
      include: [{ model: User, as: 'following' }],
    });

    return res.status(200).json({ following });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred.' });
  }
};

export const getSuggestedUsers = async (req, res) => {
  const userId = req.user.id; // The authenticated user's ID

  try {
    // Get a list of user IDs that the authenticated user is already following
    const followingIds = await Follower.findAll({
      where: { followerId: userId },
      attributes: ['followingId'],
    }).then((records) => records.map((record) => record.followingId));

    // Include the user's ID in the exclusion list
    followingIds.push(userId);

    // Fetch users not in the exclusion list
    const suggestedUsers = await User.findAll({
      where: {
        id: { [Op.notIn]: followingIds },
      },
      attributes: ['id', 'username', 'email','profile_image'], // Adjust attributes as needed
    });

    res.status(200).json({ suggestedUsers });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while fetching suggested users.' });
  }
};


export const getSuggestedFriends = async (req, res) => {
  const userId = req.user.id; // The authenticated user's ID

  try {
    // Fetch all users except the logged-in user
    const suggestedUsers = await User.findAll({
      where: {
        id: { [Op.not]: userId }, // Exclude the logged-in user
      },
      attributes: ['id', 'username', 'email', 'profileImage'], // Adjust attributes as needed
    });

    res.status(200).json({ suggestedUsers });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while fetching suggested users.' });
  }
};

