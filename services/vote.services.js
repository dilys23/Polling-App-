const db = require("../database/connection");

const createUser = async (user) => {
    const {
        username,
        role
    } = user;
    try {
        const [check] = await db.query(`select * from user where username = ?`, username);
        if (check.length === 0) {
            const [result] = await db.query(`insert into user (username, role) value (?, ?)`, [username, role]);
            console.log(result);
            return result[0];
        } else {
            console.log("user existing");
            return {
                error: "User existed"
            }
        }
    } catch (error) {
        console.log("Have an error : ", error);
        throw error;
    }
}

// CRUD POLL

const createPoll = async (user_id, {
    title,
    status,
    choose
}) => {
    // const u
    console.log(user_id, {
        title,
        status,
        choose
    });
    try {
        const result = await db.query("INSERT INTO Polls (user_id, title, status, choose) VALUES (?, ?, ?, ?)", [user_id, title, status, choose]);
        console.log(result);
        return result[0];

    } catch (error) {
        console.log("Have an error : ", error);
        throw error;
    }

}
const getAllPoll = async () => {
    try {

        const [result] = await db.query("select * from polls");
        console.log(result);
        return result;
    } catch (error) {
        console.error("Error querying the database:", error);
        throw error;
    }
}
const updatePoll = async (poll_id, {
    user_id,
    role,
    title,
    status,
    choose
}) => {
    console.log(poll_id, {
        user_id,
        role, 
        title,
        status,
        choose
    })
    try {
        const [existingPoll] = await db.query(`select * from polls where poll_id = ?`, [poll_id]);
        console.log(existingPoll);
        if (existingPoll.length === 0) {
            console.log(existingPoll)
            return {
                error: "Poll is not created"
            };
        }
        console.log("123");
        console.log(user_id);
        console.log(role);
        console.log(status);
        if (existingPoll[0].user_id !== user_id && status !== "editing") {

            return {
                error: "you don't have to permission to update this poll"
            }
        }

        // update poll
        const [result] = await db.query(`UPDATE polls SET  title = ?, status = ?, choose = ? WHERE poll_id = ?`, [title, status, choose, poll_id]);
        console.log(result);

        if (result.affectedRows === 0) {
            return {
                error: "Poll is not updated"
            };
        }
        const [updatePoll] = await db.query(`select * from polls where poll_id = ?`, [poll_id]);

        return updatePoll[0]

    } catch (error) {
        console.error("Error querying the database:", error);
        throw error;

    }

}
const deletePoll = async (poll_id, user_id) => {
    try {
        console.log(poll_id, user_id);
        const [check] = await db.query(`select * from polls where poll_id = ? and user_id = ? `, [poll_id, user_id]);
        console.log([check]);
        if (check.length === 0) {
            return {
                error: "You isn't person who created this poll"
            }
        }
        await db.query(`DELETE FROM options WHERE poll_id = ?`, [poll_id]);
        const [result] = await db.query(`DELETE FROM polls WHERE poll_id = ?`, [poll_id]);
        console.log(result);

        if (result.affectedRows === 0) {
            return {
                error: "Poll is not updated"
            };
        }
        return {
            message: "Poll successfully deleted"
        };
    } catch (error) {
        console.error("Error querying the dtb");
        throw error;

    }

}

// CRUD Option
const createOption = async (option) => {
    const {
        content,
        poll_id
    } = option;
    try {
        const [check] = await db.query(`select * from polls where poll_id = ? `, poll_id);
        if (check !== 0) {
            const result = await db.query("insert into options (content, poll_id) values (?, ?) ", [content, poll_id]);
            console.log(result);
            return result[0];
        } else {
            console.log("poll_id is not existed ");
        }

    } catch (error) {
        console.log("Have an error : ", error);
        throw error;

    }
}

const getAllOptionbyIdPoll = async (poll_id) => {
    console.log(poll_id)
    try {
        const [result] = await db.query(`SELECT * FROM options WHERE poll_id = ?`, [poll_id]);
        console.log(result);
        return result;
    } catch (error) {
        console.log("Have an error : ", error);
        throw error;

    }
}


const updateOption = async (option_id, {user_id, content, role}) => {
    try {
        const [existingOption] = await db.query(`select * from options where option_id = ?`, [option_id]);
        if (existingOption.length === 0)
        {
            return {
                status: 404,
                message: "Option is not existed"
            }
        }
        const poll_id = existingOption[0].poll_id;
        const [poll] = await db.query(`select * from polls where poll_id = ? `, poll_id);
        if (poll.length === 0)
        {
            return {
                status: 404,
                message: "Poll is not existed"};
        }

        if (poll[0].user_id !== user_id && role !== "admin")
        {
            return { 
                status: 403,
                message: "You are not allowed to update this option"
            }
        }

        if (poll[0].status !== "editing")
        {
            return { error: "Cannot update option. Poll is locked." };
        }

        const [result] = await db.query (`update options set content = ? where option_id = ?`, [content, option_id]);
        if (result.affectedRows === 0)
        {
            return {
                error : "Option is not updated"
            };
            
        }
        const [updateOption] = await db.query(`select * from options where option_id = ?`, [option_id]);

            return updateOption[0];
    } catch (error) {
        console.error("Error querying the database:", error);
        throw error;
        
    }
}

const deleteOption = async(option_id, user_id , role) =>
{
    try {
        const [existingOption] = await db.query(`select * from options where option_id = ?`, [option_id]);
        if (existingOption.length === 0)
        {
            return {
                status: 404,
                message: "Option is not existed"
            }
        }
        const poll_id = existingOption[0].poll_id;
        const [poll] = await db.query(`select * from polls where poll_id = ? `, poll_id);
        if (poll.length === 0)
        {
            return {
                status: 404,
                message: "Poll is not existed"};
        }

        if (poll[0].user_id !== user_id && role !== "admin")
        {
            return { 
                status: 403,
                message: "You are not allowed to update this option"
            }
        }

        if (poll[0].status !== "editing")
        {
            return { error: "Cannot update option. Poll is locked." };
        }

        const [result] = await db.query (`ELETE FROM options WHERE option_id = ?`, [option_id]);
        if (result.affectedRows === 0)
        {
            return {
                error : "Option is not deleted"
            };
            
        }
        return { message: "Option deleted successfully" };
    } catch (error) {
        console.error("Error querying the database:", error);
        throw error;
        
    }

}
const createSubmit = async (submition) => {
    const {
        user_id,
        option_id,
    } = submition;
    try {
        const [checkSubmit] = await db.query(`select * from submition where user_id = ? and option_id = ? `, [user_id, option_id]);
        const [checkUser] = await db.query(`select * from user where user_id = ?`, user_id);
        const [checkOption] = await db.query(`select * from options where option_id = ?`, option_id);
        if (checkUser.length === 0) {
            console.log("User is invalid");
            return {
                error: "user is invalid"
            }
        }
        if (checkOption.length === 0) {
            console.log("option is invalid");
            return {
                error: "option is invalid"
            }
        }
        if (checkSubmit.length === 0) {
            const [result] = await db.query(`insert into submition (user_id, option_id) values (?, ?)`, [user_id, option_id]);
            console.log(result);
            return result;

        } else {
            console.log("You have already voted for this option");
        }

    } catch (error) {
        console.log("Have an error : ", error);
        throw error;
    }
}



module.exports = {
    createPoll,
    createUser,
    createOption,
    getAllOptionbyIdPoll,
    createSubmit,
    getAllPoll,
    updatePoll,
    deletePoll,
    updateOption,
    deleteOption
}