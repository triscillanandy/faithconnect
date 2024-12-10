import express from 'express';
import Group from '../models/Group.js';
import GroupMember from '../models/GroupMember.js';



// List All Groups
export const listGroups = async (req, res) => {
    try {
      const groups = await Group.findAll();
  
      if (!groups || groups.length === 0) {
        return res.status(404).json({ success: false, message: 'No groups found.' });
      }
  
      res.status(200).json({ success: true, groups });
    } catch (error) {
      console.error('Error fetching groups:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
// Create Group
// router.post('/groups', async (req, res) => {


    export const creategroups = async (req, res) => {
        try {
          const { group_name, description, visibility } = req.body;
          const user_id = req.user.id; // Extracted from the token in middleware
      
          const group = await Group.create({group_name, description, visibility, created_by: user_id });
      
          // Add creator as admin
          await GroupMember.create({
            group_id: group.id,
            user_id,
            role: 'admin',
          });
      
          res.status(201).json({ success: true, group });
        } catch (error) {
          res.status(500).json({ success: false, message: error.message });
        }
      };
      
      export const joingroups = async (req, res) => {
        try {
          const { groupId } = req.params;
          const user_id = req.user.id; // Extracted from JWT middleware
      
          // Check if the group exists
          const group = await Group.findByPk(groupId);
          if (!group) {
            return res.status(404).json({ success: false, message: 'Group not found' });
          }
      
          // Prevent joining private groups directly
          if (group.visibility === 'private') {
            return res.status(403).json({ success: false, message: 'Cannot join a private group directly' });
          }
      
          // Check if the user is already a member
          const existingMember = await GroupMember.findOne({ where: { group_id: groupId, user_id } });
          if (existingMember) {
            return res.status(400).json({ success: false, message: 'Already a member' });
          }
      
          // Add the user to the group
          await GroupMember.create({ group_id: groupId, user_id });
      
          res.status(200).json({ success: true, message: 'Joined group successfully' });
        } catch (error) {
          console.error('Error joining group:', error);
          res.status(500).json({ success: false, message: error.message });
        }
      };
      

// Leave Group
// router.post('/groups/:groupId/leave', async (req, res) => {
export const leavegroups = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { user_id } = req.body;

    const member = await GroupMember.findOne({ where: { group_id: groupId, user_id } });
    if (!member) return res.status(404).json({ success: false, message: 'Not a member of this group' });

    if (member.role === 'admin') {
      return res.status(400).json({ success: false, message: 'Admins cannot leave the group directly' });
    }

    await member.destroy();

    res.status(200).json({ success: true, message: 'Left group successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


