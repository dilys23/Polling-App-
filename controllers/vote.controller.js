const db = require("../database/connection");
const voteService = require("../services/vote.services")

const createUser = async(req, res) =>
{
    try {
        const user = await voteService.createUser(req.body);
        if (user.error)
            {
                res.status(400).json({ message: user.error })
            }
             res.status(201).json({
                message: "create vote successfully",
                user : user
             })
    } catch (error) {
        res.status(500).send('Error creating user');
    }
}


const createPoll = async(req, res)=>
{
    const {user_id} = req.user;
    const {title, status, choose} = req.body;

    try {
        const poll = await voteService.createPoll(user_id, {title, status, choose});
        if (poll.error)
        {
            res.status(400).json({ message: poll.error })
        }
        res.status(201).json(
            {
                message: "create Poll successfully",
                poll : req.body
            }
        )
    } catch (error) {
        res.status(500).send('Error creating poll');
    }
}

const getAllPolls = async(req, res) =>
{
    // const { poll_id } = req.params;
    try {
        const polls = await voteService.getAllPoll()
        if (polls.length === 0)
        {
            return res.status(404).json({ message: "No options found for this poll" });
        }
        res.status(201).json(
            {
                message: "get all options successfully",
                polls : polls
            })
    } catch (error) {
        res.status(500).send('Error getting options');
        
    }
}
const updatePoll = async(req, res)=>
{
    const {poll_id} = req.params;
    const {title, status, choose} = req.body;
    const { user_id } = req.user;
    try {
        const updatePoll = await voteService.updatePoll(poll_id, {user_id, title, status, choose});
        if (updatePoll.error)
        {
            res.status(400).json({ message : updatePoll.error});
        }
        else {
            res.status(200).json({ message: "update poll successfully", poll : updatePoll})
        }
        
    } catch (error) {
        res.status(500).send('Error updating poll');
        
    }
}


const deletePoll = async(req, res) =>
{
    const {poll_id} = req.params;
    const { user_id, role } = req.user
    try {
        const deleteResponse = await voteService.deletePoll(poll_id, user_id);
        if (deleteResponse.error) {
            return res.status(400).json({ message: deleteResponse.error });
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
}

// CRUD options
const createOption = async(req, res) =>
{
    try {
        const option = await voteService.createOption(req.body)
        if (option.error)
        {
            res.status(201).json({message : option.error});
        }
        res.status(201).json(
            {
                message: "create option successfully",
                option : req.body
            })
    } catch (error) {
        res.status(500).send('Error creating option');
        
    }
}

const getAllOptionbyIdPoll = async(req, res)=>
{
    const { poll_id } = req.params;
    try {
        const options = await voteService.getAllOptionbyIdPoll(poll_id)
        if (options.length === 0)
        {
            return res.status(404).json({ message: "No options found for this poll" });
        }
        res.status(201).json(
            {
                message: "get all options successfully",
                options : options
            })
    } catch (error) {
        res.status(500).send('Error getting options');
        
    }
}

const updateOption = async(req, res) =>
{
    const {option_id} = req.params;
    const {content} = req.body;
    const user_id = req.user_id;
    const role = req.user.role;

    try {
        const result = await voteService.updateOption(option_id, {user_id, content, role});
        console.log (result);
        if (result.error)
        {

            res.status(400).json({message : result.error});
        }else {
            res.status(200).json({ message: "update option successfully", option : result})
        }

    } catch (error) {
        res.status(500).send('Error updating option');
        
    }

}

const deleteOption = async(req, res) =>
{
    const {option_id} = req.params;
    const user_id = req.user_id;
    const role = req.user.role;
    try {
        const result = await voteService.deleteOption(option_id, user_id , role);
        console.log (result);
        if (result.error)
        {

            res.status(400).json({message : result.error});
        }else {
            res.status(200).json({ message: "delete option successfully"})
        }

    } catch (error) {
        res.status(500).send('Error delete option');
        
    }
}
const createSubmit = async(req, res) =>
    {
        try {
            const submition = await voteService.createSubmit(req.body)
            if (submition.error)
            {
                res.status(201).json({message : submition.error});
            }
            res.status(201).json(
                {
                    message: "create option successfully",
                    submition : req.body
                })
        } catch (error) {
            res.status(500).send('Error creating option');
            
        }
    }



module.exports = {
    createUser,
    createPoll,
    getAllPolls,
    updatePoll,
    deletePoll,
    createOption,
    getAllOptionbyIdPoll,
    updateOption,
    deleteOption,
    createSubmit,
}