import { GetServerSidePropsContext } from 'next';

export const checkAuth = (ctx: GetServerSidePropsContext) => {
    const token = ctx.req.cookies.token
    if(!token) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    return { props: {} };
}