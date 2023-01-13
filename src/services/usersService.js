const client = require('../client');

class UsersService{

    async getUserByName(name){

        const data = await client.query('SELECT password, id FROM users WHERE name = $1', [name]);

        console.log(data.rows, name);

        if(data.rowCount)
        {
            return data.rows[0];
        }
        
        return undefined;
    }

    async addUser(name, hash){

        const data = await client.query('INSERT INTO users (name, password) VALUES ($1, $2) RETURNING id,name', [name, hash]);

        if (data.rowCount){

            return data.rows[0];
        }

        return undefined;
    }
}

module.exports = UsersService;
