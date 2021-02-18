import axios from 'axios'
import Router from 'next/router'
import {Cookies} from 'react-cookie'

const cookies = new Cookies()
const serverUrl = 'http://localhost:3000'

export async function authenticate(context) {
    let token = null
    if(context.req) {
        //backend context
        token = context.req.headers.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    } else {
        //frontend context
        token = cookies.get('token')
    }

    try {
        await axios.get(serverUrl + 'users/me', { headers: { 'Authorization': 'Bearer ' + token } })
        // user is signed in, do nothing
    } catch (error) {
        if(context.res) {
            if((context.resolvedUrl === '/login') || (context.resolvedUrl === '/register')) {
                //at login
            } else {
                context.res.writeHead(302, {Location: '/login'})
                context.res.end()
            }
        } else {
            Router.push('/login')
        }
    }
}
