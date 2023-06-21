import {randomUUID} from 'node:crypto';    
import { Database } from './database.js';
import { buildRoutePath } from './utils/build-route-path.js';

const database = new Database();

export const routes = [
    {
        method: 'GET',
        path:buildRoutePath('/users'),
        handler: (req, res) => {
            console.log(req.query)
            const { search } = req.query;
            const users = database.select('users',search ? {
                name: search,
                email: search
            } : null);
            return res.end(JSON.stringify(users));
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/users'),
        handler: (req, res) => {
            const { name, email } = req.body
            const user = {
                id: randomUUID(),
                name,
                email,
            }
            database.insert('users', user);
            return res.writeHead(201).end('usuario criado com sucesso');
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/users/:id'),
        handler: (req,res) => {
            console.log(req.params);
            const id = req.params.id
            database.delete('users', id);
            return res.writeHead(204).end('usuario deletado com sucesso');
        },
    },
    {
        method: 'PUT',
        path: buildRoutePath('/users/:id'),
        handler: (req,res) => {
            console.log(req.params);
            const id = req.params.id
            const { name, email } = req.body
            database.update('users', id, {
                name,
                email
            });
            return res.writeHead(204).end('usuario deletado com sucesso');
        },
    },
]