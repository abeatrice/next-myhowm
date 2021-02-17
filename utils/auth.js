import axios from 'axios'
import Router from 'next/router'
import {Cookies} from 'react-cookie'

const cookies = new Cookies()
const serverUrl = 'http://localhost:3000'

export async function authenticate(context) {
    let token = null
    if(context.req) {
        token = context.req.headers.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    } else {
        token = cookies.get('token')
    }

    try {
        await axios.get(serverUrl + 'users/me', { headers: { 'Authorization': 'Bearer ' + token } })
    } catch (error) {
        if(context.res) {
            context.res.writeHead(302, {Location: '/login'})
            context.res.end()
        } else {
            Router.push('/login')
        }
    }
}
