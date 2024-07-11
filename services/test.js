const getAllVote = async()=>
    {
        try {
            const [result] = await db.query(`select * from user`);
            console.log (result);
            return result[0];
            
        } catch (error) {
            console.log("Have an error : ", error);
            throw error;
            
        }
    }
    const getPoll = async (poll_id) => {
    
    }
    const createTable = async () => {
        try {
            await db.query("CREATE TABLE IF NOT EXISTS votes (id INT AUTO_INCREMENT PRIMARY KEY , candidate text, vote_count int default 0)");
            console.log("thuc hien duoc create")
    
        } catch (error) {
            console.error("Error create table :", error);
            throw error;
        }
    }
    
    const createVote = async (vote) => {
        const {
            candidate,
            vote_count
        } = vote;
        try {
            const check = await db.query(`select * from votes where candidate = ?`, candidate);
            if (!check) {
                const result = await db.query(`insert into votes (candidate, vote_count) value (?, ?)`, [candidate, vote_count]);
                console.log(result);
                return result[0];
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    }
    const chooseVote = async (id) => {
        try {
            await db.query(`update votes set vote_count = vote_count + 1 where id = ?`, id);
        } catch (error) {
            throw error;
    
        }
    }
    const removeVote = async (id) => {
        try {
            await db.query(`update votes set vote_count = vote_count - 1 where id = ?`, id);
        } catch (error) {
            throw error;
    
        }
    }
    
    const getVotes = async () => {
        try {
            const [results] = await db.query("select * from votes");
            return results;
        } catch (error) {
            throw error;
    
        }
    }

    const getAllUser = async(req, res)=>
        {
            try {
                const users = await voteService.getAllUser();
                res.status(200).json(users);
                }
                catch(err){
                    res.status(500).send(err.message);
                }
            
        }
        
        const createVoteTable = async(req, res) =>
        {
            try {
                
                await voteService.createTable();
                res.status(200).json({ message: "Vote table created" })
            } catch (error) {
                res.status(500).send('Error creating votes tables');
            }
        }
        
        const createVote = async(req, res) =>
        {
            try {
                const vote = await voteService.createVote(req.body);
                if (vote.error)
                {
                    res.status(400).json({ message: vote.error })
                }
                 res.status(201).json({
                    message: "create vote successfully",
                    vote : vote
                 })
            } catch (error) {
                res.status(500).send('Error creating vote');
                
            }
        }
        const chooseVote = async(req, res) =>
        {
            try {
                let id = req.body.id;
                await voteService.chooseVote(id);
                res.send('Choose vote successfully');
            } catch (error) {
                res.status(500).send('Error casting vote');        
            }
        }
        
        const removeVote = async(req, res) =>
            {
                try {
                    let id = req.body.id;
                    await voteService.removeVote(id);
                    res.send('Remove vote successfully');
                } catch (error) {
                    res.status(500).send('Error casting vote');        
                }
            }
        
            
        const getVotes = async(req, res) =>
        {
            try {
                const results = await voteService.getVotes();
                res.status(200).json(results);
            } catch (error) {
                res.status(500).send('Error getting votes');
                
            }
        }