import Router from 'next/router'
import {Cookies} from 'react-cookie'

const cookies = new Cookies()

export async function authenticate(context) {
    let token = null
    if(context.req) {
        //server side
        token = context.req.headers.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    } else {
        //client side
        token = cookies.get('token')
    }

    if (!token) {
        //not signed in
        if(context.res) {
            //redirect to login if user is not at login or register route
            if((context.resolvedUrl !== '/login') && (context.resolvedUrl !== '/register')) {
                context.res.writeHead(302, {Location: '/login'})
                context.res.end()
            }
        } else {
            Router.push('/login')
        }
    } else {
        //redirect home if user is signed in and attempts to visit login or register
        if(context.res && ((context.resolvedUrl === '/login') || (context.resolvedUrl === '/register'))) {
            context.res.writeHead(302, {Location: '/home'})
            context.res.end()
        }
    }
}
